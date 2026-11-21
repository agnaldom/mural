import { Fragment, Passage, Speaker } from '@/types/learning';

export class Transcript {
  /**
   * Group fragments into speaker turns/passages:
   * Adjacent fragments by the same speaker within 2200ms gap (and not typed) are grouped together.
   */
  static passages(fragments: Fragment[]): Passage[] {
    const result: { id: string; speaker: Speaker; fragments: Fragment[] }[] = [];

    // Sort by startMS, preserving original index for tie breaks
    const indexed = fragments
      .map((f, i) => ({ f, i }))
      .sort((a, b) => (a.f.startMS === b.f.startMS ? a.i - b.i : a.f.startMS - b.f.startMS));

    for (const { f } of indexed) {
      const lastIndex = result.map(p => p.speaker).lastIndexOf(f.speaker);
      if (lastIndex !== -1) {
        const candidate = result[lastIndex];
        const lastEnd = Math.max(...candidate.fragments.map(fr => fr.endMS));
        const lastTyped = candidate.fragments[candidate.fragments.length - 1]?.typed ?? false;

        if (f.startMS - lastEnd <= 2200 && !f.typed && !lastTyped) {
          candidate.fragments.push(f);
          continue;
        }
      }

      result.push({
        id: f.id,
        speaker: f.speaker,
        fragments: [f],
      });
    }

    return result
      .map(p => {
        const startMS = Math.min(...p.fragments.map(f => f.startMS));
        const endMS = Math.max(...p.fragments.map(f => f.endMS));
        const revisionKey = p.fragments.map(f => `${f.id}:${f.revision ?? 0}`).join(',');
        const text = PassageAssembly.join(p.fragments.map(f => f.text));

        return {
          id: p.id,
          speaker: p.speaker,
          fragments: p.fragments,
          text,
          revisionKey,
          startMS,
          endMS,
        };
      })
      .sort((a, b) => a.startMS - b.startMS);
  }
}

export class PassageAssembly {
  /**
   * Modern text assembly:
   * Deltas can end inside a word. Preserve them, repairing only a clear sentence break.
   */
  static join(parts: string[]): string {
    return parts.reduce((result, part) => {
      if (!result) return part;
      if (!part) return result;

      const lastChar = result[result.length - 1];
      const firstChar = part[0];

      if (!/\s/.test(lastChar) && !/\s/.test(firstChar) && /^\p{Lu}/u.test(firstChar)) {
        // Check if preceding word ends with sentence punctuation
        const trimmed = result.trimEnd();
        const ending = trimmed[trimmed.length - 1];
        const beforeEnding = trimmed.slice(0, -1);
        const match = beforeEnding.match(/\p{L}+$/u);
        const wordLength = match ? match[0].length : 0;

        if (ending === '!' || ending === '?' || ending === '…' || (ending === '.' && wordLength > 1)) {
          return result + ' ' + part;
        }
      }

      return result + part;
    }, '');
  }

  /**
   * Legacy join for older assessments
   */
  static legacyJoin(parts: string[]): string {
    return parts.reduce((result, part) => {
      if (!result) return part;
      if (!part) return result;

      const last = result[result.length - 1];
      const first = part[0];

      const needsSpace =
        !/\s/.test(last) &&
        !/\s/.test(first) &&
        !/^[\p{P}\p{S}]$/u.test(first) &&
        !PassageAssembly.isUnspacedBoundary(last, first);

      return needsSpace ? result + ' ' + part : result + part;
    }, '');
  }

  private static isUnspacedBoundary(last: string, first: string): boolean {
    const isHan = (c: string) => /[㐀-䶿一-鿿豈-﫿]/u.test(c);
    const isOpening = /^[(\[{«"']/u.test(last);
    const isCjkPunct = /[　-〿＀-￯]/u.test(last);
    return isOpening || (isHan(first) && (isHan(last) || isCjkPunct));
  }
}