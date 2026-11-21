'use client';

import { create } from 'zustand';
import {
  Assessment,
  LearnerState,
  LearningArchive,
  SessionRecord,
  UserPreferences,
  UserProficiencyLevel,
  WordState,
  APPLE_EPOCH_UNIX_OFFSET_SECONDS,
} from '@/types/learning';
import { LearningEngine } from '../learning/engine';
import { DEFAULT_LANGUAGE_ID } from '../languages/registry';

const STORAGE_KEY = 'mural:learning_archive:v2';

export const DEFAULT_LANGUAGE_VOICES: Record<string, string> = {
  es: 'e55f35bf', // Spanish Explainer
  de: 'f7197020', // German Explainer
  en: '842eaaa0', // The Documentarian (English)
  pt: '341aa28c', // Portuguese Explainer
  fr: 'ml_french_explainer', // French Explainer
  it: 'ml_italian_explainer', // Italian Explainer
  ru: 'ml_russian_explainer', // Russian Explainer
  zh: 'a_ddf07814fe', // Chinese Explainer
  nb: 'alloy', // Norwegian Bokmål (Multilingual)
  nl: 'nova', // Dutch (Multilingual)
  el: 'echo', // Greek (Multilingual)
  sr: 'onyx', // Serbian (Multilingual)
  tl: 'fable', // Tagalog (Multilingual)
};

const DEFAULT_PREFERENCES: UserPreferences = {
  aiConsentVersion: 1,
  hasOnboarded: true,
  hiddenWords: [],
  interests: 'Everyday conversations, travel, culture, cuisine',
  learningLanguageID: DEFAULT_LANGUAGE_ID,
  meaningLanguage: 'Portuguese',
  meaningVisible: true,
  sessionMinutes: 15,
  languageVoices: DEFAULT_LANGUAGE_VOICES,
  languageLevels: {},
};

// Initial welcome session so the user has immediate context and vocabulary to inspect
const INITIAL_WELCOME_SESSION: SessionRecord = {
  id: '0b1f6e2a-5c3d-4e8f-9a7b-1c2d3e4f5a61',
  languageID: 'en',
  startedAt: 809967600,
  endedAt: 809968200,
  endReason: 'Completed naturally',
  fragments: [
    {
      id: 's1-a1',
      speaker: 'assistant',
      text: ' ¡Hola! ¿Qué hiciste el fin de semana?',
      startMS: 0,
      endMS: 2000,
      receivedAt: 809967601,
      meaningVisible: true,
      typed: false,
    },
    {
      id: 's1-u1',
      speaker: 'user',
      text: ' Visité a mi abuela y cocinamos sopa.',
      startMS: 2500,
      endMS: 6000,
      receivedAt: 809967604,
      meaningVisible: false,
      typed: false,
    },
    {
      id: 's1-a2',
      speaker: 'assistant',
      text: ' ¡Qué rico! ¿Qué sopa prepararon?',
      startMS: 6500,
      endMS: 9000,
      receivedAt: 809967608,
      meaningVisible: true,
      typed: false,
    },
  ],
  assessments: [
    {
      passageID: 's1-u1',
      revisionKey: 's1-u1:0',
      suggestedLevel: 2,
      createdAt: 809968220,
      context: 'weekend',
      outcome: 'success',
      capability: 'Describes past weekend activities',
      nextGoal: 'Add details about when and where it happened.',
      textAssemblyVersion: 1,
      words: [
        {
          confidence: 0.95,
          form: 'abuela',
          kind: 'independent',
          language: 'es',
          lemma: 'abuela',
          meaning: 'grandmother; the mother of your parent',
          quote: 'mi abuela',
          sourceIDs: ['s1-u1'],
        },
        {
          confidence: 0.92,
          form: 'cocinamos',
          kind: 'independent',
          language: 'es',
          lemma: 'cocinar',
          meaning: 'to cook; to prepare food with heat',
          quote: 'cocinamos sopa',
          sourceIDs: ['s1-u1'],
        },
        {
          confidence: 0.9,
          form: 'sopa',
          kind: 'independent',
          language: 'es',
          lemma: 'sopa',
          meaning: 'soup; liquid dish prepared by boiling',
          quote: 'sopa',
          sourceIDs: ['s1-u1'],
        },
      ],
    },
  ],
};

interface ArchiveStoreState {
  archive: LearningArchive;
  isLoaded: boolean;
  activeLanguageID: string;

  // Actions
  loadArchive: () => void;
  setLearningLanguage: (languageID: string) => void;
  setLanguageVoice: (languageID: string, voiceID: string) => void;
  setLanguageLevel: (languageID: string, level: UserProficiencyLevel) => void;
  setMeaningLanguage: (meaningLanguage: string) => void;
  setMeaningVisible: (visible: boolean) => void;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
  recordSession: (session: SessionRecord) => void;
  recordRetrievalEvidence: (
    wordId: string,
    success: boolean,
    kind?: 'independent' | 'lapse'
  ) => void;
  deleteSession: (sessionID: string) => void;
  exportArchiveJSON: () => string;
  importArchiveJSON: (jsonString: string) => boolean;
  getLearnerState: (languageID?: string) => LearnerState;
}

function safePersist(archive: LearningArchive) {
  if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(archive));
    } catch {}
  }
}

export const useArchiveStore = create<ArchiveStoreState>((set, get) => ({
  archive: {
    preferences: DEFAULT_PREFERENCES,
    schemaVersion: 2,
    sessions: [INITIAL_WELCOME_SESSION],
  },
  isLoaded: false,
  activeLanguageID: DEFAULT_LANGUAGE_ID,

  loadArchive: () => {
    if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
      set({ isLoaded: true });
      return;
    }
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: LearningArchive = JSON.parse(stored);
        if (parsed.schemaVersion && Array.isArray(parsed.sessions)) {
          const existingVoices = parsed.preferences?.languageVoices || {};
          const sanitizedVoices: Record<string, string> = { ...DEFAULT_LANGUAGE_VOICES };
          for (const [lang, vid] of Object.entries(existingVoices)) {
            // Retain user custom voices, but replace stale duplicate 842eaaa0 on non-English languages
            if (vid && (lang === 'en' || vid !== '842eaaa0')) {
              sanitizedVoices[lang] = vid;
            }
          }

          const mergedPreferences: UserPreferences = {
            ...DEFAULT_PREFERENCES,
            ...(parsed.preferences || {}),
            languageVoices: sanitizedVoices,
          };
          set({
            archive: {
              ...parsed,
              preferences: mergedPreferences,
            },
            activeLanguageID: parsed.preferences?.learningLanguageID || DEFAULT_LANGUAGE_ID,
            isLoaded: true,
          });
          return;
        }
      }
    } catch (e) {
      console.warn('Failed to parse stored archive, using default');
    }

    set({ isLoaded: true });
  },

  setLearningLanguage: (languageID: string) => {
    const { archive } = get();
    const updated: LearningArchive = {
      ...archive,
      preferences: {
        ...archive.preferences,
        learningLanguageID: languageID,
      },
    };
    safePersist(updated);
    set({ archive: updated, activeLanguageID: languageID });
  },

  setLanguageVoice: (languageID: string, voiceID: string) => {
    const { archive } = get();
    const updated: LearningArchive = {
      ...archive,
      preferences: {
        ...archive.preferences,
        languageVoices: {
          ...(archive.preferences.languageVoices || {}),
          [languageID]: voiceID,
        },
      },
    };
    safePersist(updated);
    set({ archive: updated });
  },

  setLanguageLevel: (languageID: string, level: UserProficiencyLevel) => {
    const { archive } = get();
    const langKey = languageID?.split('-')[0]?.toLowerCase() || 'en';
    const updatedLevels = {
      ...(archive.preferences.languageLevels || {}),
      [langKey]: level,
    };
    const updated: LearningArchive = {
      ...archive,
      preferences: {
        ...archive.preferences,
        languageLevels: updatedLevels,
      },
    };
    safePersist(updated);
    set({ archive: updated });
  },

  setMeaningLanguage: (meaningLanguage: string) => {
    const { archive } = get();
    const updated: LearningArchive = {
      ...archive,
      preferences: {
        ...archive.preferences,
        meaningLanguage,
      },
    };
    safePersist(updated);
    set({ archive: updated });
  },

  setMeaningVisible: (visible: boolean) => {
    const { archive } = get();
    const updated: LearningArchive = {
      ...archive,
      preferences: {
        ...archive.preferences,
        meaningVisible: visible,
      },
    };
    safePersist(updated);
    set({ archive: updated });
  },

  updatePreferences: (updates: Partial<UserPreferences>) => {
    const { archive } = get();
    const updated: LearningArchive = {
      ...archive,
      preferences: {
        ...archive.preferences,
        ...updates,
      },
    };
    safePersist(updated);
    set({ archive: updated });
  },

  recordSession: (session: SessionRecord) => {
    const { archive } = get();
    const updated: LearningArchive = {
      ...archive,
      sessions: [session, ...archive.sessions],
    };
    safePersist(updated);
    set({ archive: updated });
  },

  recordRetrievalEvidence: (
    wordId: string,
    success: boolean,
    kind = success ? 'independent' : 'lapse'
  ) => {
    const { archive, activeLanguageID } = get();
    const parts = wordId.split('|');
    if (parts.length < 3) return;
    const [lang, lemma, meaning] = parts;

    const nowSeconds = Date.now() / 1000 - APPLE_EPOCH_UNIX_OFFSET_SECONDS;
    const sessionID = `practice-${Date.now()}`;
    const passageID = `practice-p-${Date.now()}`;

    // Create validated practice session record
    const practiceSession: SessionRecord = {
      id: sessionID,
      languageID: lang || activeLanguageID,
      startedAt: nowSeconds - 10,
      endedAt: nowSeconds,
      endReason: 'Flashcard recall practice',
      fragments: [
        {
          id: passageID,
          speaker: 'user',
          text: lemma,
          startMS: 0,
          endMS: 1000,
          receivedAt: nowSeconds,
          typed: true,
        },
      ],
      assessments: [
        {
          passageID,
          revisionKey: `${passageID}:0`,
          suggestedLevel: success ? 2 : 1,
          createdAt: nowSeconds,
          context: 'flashcards',
          outcome: success ? 'success' : 'breakdown',
          capability: 'Active recall retrieval',
          nextGoal: 'Strengthen active memory across days.',
          textAssemblyVersion: 1,
          words: [
            {
              language: lang || activeLanguageID,
              lemma,
              meaning,
              form: lemma,
              quote: lemma,
              confidence: 0.95,
              kind: success ? 'independent' : 'lapse',
              sourceIDs: [passageID],
            },
          ],
        },
      ],
    };

    const updated: LearningArchive = {
      ...archive,
      sessions: [practiceSession, ...archive.sessions],
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
    set({ archive: updated });
  },

  deleteSession: (sessionID: string) => {
    const { archive } = get();
    const updated: LearningArchive = {
      ...archive,
      sessions: archive.sessions.filter(s => s.id !== sessionID),
    };
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
    set({ archive: updated });
  },

  exportArchiveJSON: (): string => {
    const { archive } = get();
    return JSON.stringify(archive, null, 2);
  },

  importArchiveJSON: (jsonString: string): boolean => {
    try {
      const parsed: LearningArchive = JSON.parse(jsonString);
      if (!parsed.preferences || !Array.isArray(parsed.sessions)) {
        return false;
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
      }
      set({
        archive: parsed,
        activeLanguageID: parsed.preferences.learningLanguageID || DEFAULT_LANGUAGE_ID,
      });
      return true;
    } catch {
      return false;
    }
  },

  getLearnerState: (languageID?: string): LearnerState => {
    const { archive, activeLanguageID } = get();
    const targetLang = languageID ?? activeLanguageID;
    return LearningEngine.project(
      archive.sessions,
      targetLang,
      archive.preferences.hiddenWords
    );
  },
}));
