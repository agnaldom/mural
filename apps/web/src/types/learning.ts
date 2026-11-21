/**
 * Canonical Learning and Assessment types for Mural.
 * Maintained with strict cross-platform compatibility with iOS and Android cores.
 */

export type Speaker = 'user' | 'assistant';
export type EvidenceKind = 'exposure' | 'understanding' | 'assisted' | 'independent' | 'lapse';
export type Outcome = 'success' | 'partial' | 'breakdown' | 'uncertain';

export interface Fragment {
  id: string;
  revision?: number;
  previousTexts?: string[];
  speaker: Speaker;
  text: string;
  startMS: number;
  endMS: number;
  receivedAt: number | Date;
  meaningVisible?: boolean;
  typed?: boolean;
}

export interface Passage {
  id: string;
  speaker: Speaker;
  fragments: Fragment[];
  text: string;
  revisionKey: string;
  startMS: number;
  endMS: number;
}

export interface WordProposal {
  lemma: string;
  meaning: string;
  form: string;
  kind: EvidenceKind;
  confidence: number;
  sourceIDs: string[];
  quote: string;
  language: string;
}

export interface Assessment {
  passageID: string;
  revisionKey: string;
  suggestedLevel: number;
  words: WordProposal[];
  nextGoal: string;
  capability: string;
  context: string;
  createdAt: number; // Seconds since reference date (or unix)
  outcome: Outcome;
  textAssemblyVersion?: number;
}

export interface WordState {
  id: string; // ${language}|${lemma}|${meaning}
  lemma: string;
  meaning: string;
  form: string;
  example: string;
  bars: number; // 0 (New), 1 (Fragile), 2 (Growing), 3 (Steady)
  understandingCount: number;
  independentCount: number;
  lastSeen: number; // Seconds since reference date
  dueAt: number; // Seconds since reference date
  label: 'New' | 'Fragile' | 'Growing' | 'Steady';
  explanation: string;
}

export interface LearnerState {
  challenge: number;
  observationCount: number;
  nextGoal: string;
  capabilities: string[];
  words: WordState[];
  levelLabel: string;
}

export interface SessionRecord {
  id: string;
  languageID: string;
  startedAt: number;
  endedAt: number;
  endReason?: string;
  fragments: Fragment[];
  assessments: Assessment[];
  passages?: Passage[];
}

export type UserProficiencyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface UserPreferences {
  aiConsentVersion: number;
  hasOnboarded: boolean;
  hiddenWords: string[];
  interests: string;
  learningLanguageID: string;
  meaningLanguage: string;
  meaningVisible: boolean;
  sessionMinutes: number;
  languageVoices?: Record<string, string>;
  languageLevels?: Record<string, UserProficiencyLevel>;
}

export interface LearningArchive {
  preferences: UserPreferences;
  schemaVersion: number;
  sessions: SessionRecord[];
}

/**
 * Seconds between Unix epoch (1970-01-01T00:00:00Z) and Apple reference date (2001-01-01T00:00:00Z).
 */
export const APPLE_EPOCH_UNIX_OFFSET_SECONDS = 978307200.0;
