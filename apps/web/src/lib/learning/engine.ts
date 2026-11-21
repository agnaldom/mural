import {
  Assessment,
  LearnerState,
  SessionRecord,
  WordProposal,
  WordState,
  APPLE_EPOCH_UNIX_OFFSET_SECONDS,
} from '@/types/learning';
import { LANGUAGE_MODULES } from '@/lib/languages/registry';
import { PassageAssembly, Transcript } from './transcript';

export class LearningEngine {
  /**
   * Generates the unique storage/retrieval key for a vocabulary item: language|lemma|meaning
   */
  static wordKey(word: { language: string; lemma: string; meaning: string }): string {
    return `${word.language}|${word.lemma}|${word.meaning}`;
  }

  /**
   * Validates an assessment proposal against the actual session speech records.
   */
  static validate(proposal: Assessment, session: SessionRecord): Assessment | null {
    if (!LANGUAGE_MODULES[session.languageID]) return null;

    const passages = session.passages ?? Transcript.passages(session.fragments);
    const passage = passages.find(p => p.id === proposal.passageID && p.speaker === 'user');
    if (!passage) return null;

    if (passage.revisionKey !== proposal.revisionKey) return null;
    if (proposal.suggestedLevel < 0 || proposal.suggestedLevel > 5) return null;
    if (proposal.words.length > 12) return null;

    const allowed = new Set(passage.fragments.map(f => f.id));
    const join = proposal.textAssemblyVersion === undefined ? PassageAssembly.legacyJoin : PassageAssembly.join;
    const evidenceText = join(passage.fragments.map(f => f.text));

    const validatedWords: WordProposal[] = [];

    for (const word of proposal.words) {
      if (word.language !== session.languageID) continue;
      if (word.sourceIDs.length === 0) continue;
      if (!word.sourceIDs.every(id => allowed.has(id))) continue;
      if (!Number.isFinite(word.confidence) || word.confidence < 0.8 || word.confidence > 1.0) continue;
      if (!word.lemma || word.lemma.length >= 100) continue;
      if (!word.meaning || word.meaning.length >= 180) continue;
      if (!word.form || !word.quote) continue;

      if (!evidenceText.toLowerCase().includes(word.quote.toLowerCase())) continue;
      if (!word.quote.toLowerCase().includes(word.form.toLowerCase())) continue;

      const refs = join(passage.fragments.filter(f => word.sourceIDs.includes(f.id)).map(f => f.text));
      if (!refs.toLowerCase().includes(word.quote.toLowerCase())) continue;

      let result: WordProposal = { ...word };

      if (result.kind === 'independent') {
        const recentlyModeled = passages.some(p =>
          p.speaker === 'assistant' &&
          p.startMS <= passage.startMS &&
          passage.startMS - p.endMS < 90_000 &&
          join(p.fragments.map(f => f.text)).toLowerCase().includes(word.form.toLowerCase())
        );

        if (passage.fragments.some(f => f.meaningVisible || f.typed) || recentlyModeled) {
          result.kind = 'assisted';
        }
      }

      validatedWords.push(result);
    }

    return {
      ...proposal,
      nextGoal: proposal.nextGoal.slice(0, 300),
      capability: proposal.capability.slice(0, 160),
      words: validatedWords,
    };
  }

  /**
   * Projects the current learner state from all historical conversation sessions.
   * Matches the authoritative cross-platform calculation in iOS and Android.
   */
  static project(
    sessions: SessionRecord[],
    languageID = 'nb',
    hiddenWords: string[] = [],
    now: number = Date.now() / 1000 - APPLE_EPOCH_UNIX_OFFSET_SECONDS
  ): LearnerState {
    let level = 0;
    let count = 0;
    let successes = 0;
    let nextGoal = 'Start with a greeting and one small question. Adjust from what the learner actually says.';
    const capabilityEvidence = new Map<string, Set<string>>();
    const events = new Map<string, Array<{ word: WordProposal; createdAt: number; context: string }>>();

    // Process sessions matching target language sorted by startedAt
    const filteredSessions = sessions
      .filter(s => s.languageID === languageID)
      .sort((a, b) => a.startedAt - b.startedAt);

    for (const session of filteredSessions) {
      const passages = session.passages ?? Transcript.passages(session.fragments);
      const sessionWithPassages = { ...session, passages };

      const seenPassageIDs = new Set<string>();
      const sortedAssessments = [...session.assessments].sort((a, b) => a.createdAt - b.createdAt);

      for (const raw of sortedAssessments) {
        if (seenPassageIDs.has(raw.passageID)) continue;

        const a = LearningEngine.validate(raw, sessionWithPassages);
        if (!a) continue;

        seenPassageIDs.add(raw.passageID);
        count++;

        if (a.outcome === 'breakdown') {
          level = Math.max(0, level - 1);
          successes = 0;
        } else if (a.outcome === 'success') {
          successes++;
          if (successes >= 2) {
            level = Math.min(5, Math.max(level, Math.min(level + 1, a.suggestedLevel)));
            successes = 0;
          }
        } else {
          successes = 0;
        }

        if (a.nextGoal.length > 0) {
          nextGoal = a.nextGoal;
        }

        if (a.outcome === 'success' && a.capability.length > 0) {
          const day = this.dayKey(a.createdAt);
          if (!capabilityEvidence.has(a.capability)) {
            capabilityEvidence.set(a.capability, new Set());
          }
          capabilityEvidence.get(a.capability)!.add(`${day}|${a.context}`);
        }

        const seenWords = new Set<string>();
        for (const word of a.words) {
          const key = this.wordKey(word);
          if (!hiddenWords.includes(key) && !seenWords.has(key)) {
            seenWords.add(key);
            if (!events.has(key)) {
              events.set(key, []);
            }
            events.get(key)!.push({
              word,
              createdAt: a.createdAt,
              context: a.context,
            });
          }
        }
      }
    }

    const words: WordState[] = [];

    for (const [key, observations] of events.entries()) {
      const lastObs = observations[observations.length - 1];
      if (!lastObs) continue;

      const independent = observations.filter(o => o.word.kind === 'independent');
      const days = new Set(independent.map(o => this.dayKey(o.createdAt))).size;
      const contexts = new Set(independent.map(o => o.context)).size;
      const lastRecall = independent.length > 0 ? independent[independent.length - 1].createdAt : null;

      let bars = independent.length === 0 ? 0 : 1;
      if (days >= 2) bars = 2;
      if (
        days >= 3 &&
        contexts >= 2 &&
        independent[independent.length - 1].createdAt - independent[0].createdAt >= 7 * 86400
      ) {
        bars = 3;
      }

      const intervals = [1.0, 1.0, 4.0, 14.0];
      const interval = intervals[bars] * 86400;
      const due = (lastRecall ?? lastObs.createdAt) + interval;

      if (now > due && bars > 1) {
        bars -= 1;
      }

      const lapses = observations.filter(o => o.word.kind === 'lapse');
      const lastLapse = lapses[lapses.length - 1];
      if (lastLapse && lastLapse.createdAt > (lastRecall ?? -Infinity)) {
        bars = Math.min(bars, 1);
      }

      const understandingCount = observations.filter(o => o.word.kind === 'understanding').length;
      const independentCount = independent.length;

      const labels: Array<'New' | 'Fragile' | 'Growing' | 'Steady'> = ['New', 'Fragile', 'Growing', 'Steady'];
      const label = labels[Math.min(3, Math.max(0, bars))];

      let explanation = '';
      if (independentCount === 0) {
        explanation = 'Heard or used with support. Try using it in your own words.';
      } else if (bars === 1) {
        explanation = 'Used independently. We'll bring it back soon.';
      } else if (bars === 2) {
        explanation = 'Recalled on different days. Still worth revisiting.';
      } else {
        explanation = 'Recalled across days and contexts. Strength can fade with time.';
      }

      words.push({
        id: key,
        lemma: lastObs.word.lemma,
        meaning: lastObs.word.meaning,
        form: lastObs.word.form,
        example: lastObs.word.quote,
        bars,
        understandingCount,
        independentCount,
        lastSeen: lastObs.createdAt,
        dueAt: due,
        label,
        explanation,
      });
    }

    words.sort((a, b) => b.lastSeen - a.lastSeen);

    const capabilities = Array.from(capabilityEvidence.entries())
      .filter(([_, set]) => set.size >= 3)
      .map(([cap]) => cap)
      .sort();

    return {
      challenge: level,
      observationCount: count,
      nextGoal,
      capabilities,
      words,
      levelLabel: count < 4 ? 'Getting to know you' : 'Finding your pace',
    };
  }

  private static dayKey(seconds: number): string {
    const unixMs = (seconds + APPLE_EPOCH_UNIX_OFFSET_SECONDS) * 1000;
    const date = new Date(unixMs);
    // Format YYYY-MM-DD
    const y = date.getUTCFullYear();
    const m = String(date.getUTCMonth() + 1).padStart(2, '0');
    const d = String(date.getUTCDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
}