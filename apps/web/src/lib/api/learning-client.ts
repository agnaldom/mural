/**
 * Learning API Client
 * Wrapper for learning API endpoints
 */

import { forwardToMuralAPI } from './api-client';

export interface LearningProfile {
  userId: string;
  languageId: string;
  createdAt: number;
  updatedAt: number;
  preferences: {
    correctionStyle: 'gentle' | 'balanced' | 'detailed';
    pace: 'slow' | 'normal' | 'fast';
    nativeLanguage: string;
    targetLanguage: string;
  };
  level: string; // CEFR-like level
  capabilities: string[];
  nextGoal: string;
}

export interface VocabularyItem {
  id: string; // language|lemma|meaning
  language: string;
  lemma: string;
  meaning: string;
  form: string;
  example: string;
  context: string; // source context
  createdAt: number;
  lastSeen: number;
  dueAt: number;
  confidence: number;
  recallCount: number;
  independentCount: number;
  understandingCount: number;
  level: 'new' | 'learning' | 'due' | 'relearning' | 'strong';
  tags?: string[];
  source?: string; // conversation, practice, etc.
}

export interface LearningSession {
  id: string;
  userId: string;
  languageId: string;
  startedAt: number;
  endedAt: number;
  endReason?: string;
  fragments: Array<{
    id: string;
    speaker: 'user' | 'assistant';
    text: string;
    startMS: number;
    endMS: number;
    meaning?: string;
  }>;
  capabilitiesTargeted?: string[];
}

export interface SessionAnalysis {
  sessionId: string;
  languageId: string;
  capability?: string;
  taskCompleted: boolean;
  evidence: Array<{
    skillId: string;
    result: 'developing' | 'confident' | 'mastered';
    confidence: number;
    evidenceType: 'conversation' | 'listening' | 'retrieval' | 'roleplay';
    evidenceReference: string;
  }>;
  vocabularyCandidates: Array<{
    type: 'word' | 'expression' | 'pattern';
    content: string;
    reason: string;
    priority: 'high' | 'medium' | 'low';
  }>;
  recommendedNextActivity?: string;
}

export interface FluencySkill {
  id: string;
  languageId: string;
  description: string;
  prerequisites: string[];
  state: 'not_assessed' | 'insufficient' | 'developing' | 'demonstrated' | 'strong';
  confidence: number;
  lastDemonstrated?: number;
  retention?: 'pending' | 'due' | 'overdue';
  nextRecommendation?: string;
}

export interface Recommendation {
  activityId: string;
  reason: string;
  targetSkill: string;
  expectedDuration: number; // minutes
  difficulty: number; // 1-5
  learningObjective: string;
  priority: number;
  prerequisites: string[];
  alternatives?: string[];
}

export interface LearningAPIClient {
  getProfile: (userId: string) => Promise<LearningProfile>;
  updateProfile: (userId: string, updates: Partial<LearningProfile>) => Promise<LearningProfile>;
  getSessions: (userId: string, params?: { limit?: number; offset?: number; languageId?: string }) => Promise<LearningSession[]>;
  getSession: (userId: string, sessionId: string) => Promise<LearningSession>;
  createSession: (userId: string, session: Partial<LearningSession>) => Promise<LearningSession>;
  postSessionAnalysis: (userId: string, sessionId: string, analysis: SessionAnalysis) => Promise<void>;
  getVocabulary: (userId: string, params?: { limit?: number; offset?: number; due?: boolean }) => Promise<VocabularyItem[]>;
  addVocabulary: (userId: string, item: Partial<VocabularyItem>) => Promise<VocabularyItem>;
  updateVocabulary: (userId: string, itemId: string, updates: Partial<VocabularyItem>) => Promise<VocabularyItem>;
  deleteVocabulary: (userId: string, itemId: string) => Promise<void>;
  getReviewsDue: (userId: string, limit?: number) => Promise<VocabularyItem[]>;
  getFluencyGraph: (userId: string, languageId: string) => Promise<FluencySkill[]>;
  getProgress: (userId: string, languageId: string) => Promise<{ level: string; capabilities: string[]; nextMilestone: string }>;
  getRecommendations: (userId: string, targetSkill?: string) => Promise<Recommendation[]>;
}

export const learningClient: LearningAPIClient = {
  async getProfile(userId) {
    const res = await forwardToMuralAPI(`/v1/learning/profile?userId=${userId}`, { requireAuth: true });
    if (res.status !== 200) throw new Error('Failed to get profile');
    return res.data;
  },

  async updateProfile(userId, updates) {
    const res = await forwardToMuralAPI(`/v1/learning/profile?userId=${userId}`, {
      method: 'PATCH',
      body: updates,
      requireAuth: true,
    });
    if (res.status !== 200) throw new Error('Failed to update profile');
    return res.data;
  },

  async getSessions(userId, params) {
    const query = new URLSearchParams({ userId, ...params }).toString();
    const res = await forwardToMuralAPI(`/v1/learning/sessions?${query}`, { requireAuth: true });
    if (res.status !== 200) throw new Error('Failed to get sessions');
    return res.data;
  },

  async getSession(userId, sessionId) {
    const res = await forwardToMuralAPI(`/v1/learning/sessions/${sessionId}?userId=${userId}`, { requireAuth: true });
    if (res.status !== 200) throw new Error('Failed to get session');
    return res.data;
  },

  async createSession(userId, session) {
    const res = await forwardToMuralAPI('/v1/learning/sessions', {
      method: 'POST',
      body: { userId, ...session },
      requireAuth: true,
    });
    if (res.status !== 201) throw new Error('Failed to create session');
    return res.data;
  },

  async postSessionAnalysis(userId, sessionId, analysis) {
    const res = await forwardToMuralAPI(`/v1/learning/sessions/${sessionId}/analysis`, {
      method: 'POST',
      body: { userId, ...analysis },
      requireAuth: true,
    });
    if (res.status !== 200) throw new Error('Failed to post analysis');
  },

  async getVocabulary(userId, params) {
    const query = new URLSearchParams({ userId, ...params }).toString();
    const res = await forwardToMuralAPI(`/v1/learning/vocabulary?${query}`, { requireAuth: true });
    if (res.status !== 200) throw new Error('Failed to get vocabulary');
    return res.data;
  },

  async addVocabulary(userId, item) {
    const res = await forwardToMuralAPI('/v1/learning/vocabulary', {
      method: 'POST',
      body: { userId, ...item },
      requireAuth: true,
    });
    if (res.status !== 201) throw new Error('Failed to add vocabulary');
    return res.data;
  },

  async updateVocabulary(userId, itemId, updates) {
    const res = await forwardToMuralAPI(`/v1/learning/vocabulary/${itemId}`, {
      method: 'PATCH',
      body: { userId, ...updates },
      requireAuth: true,
    });
    if (res.status !== 200) throw new Error('Failed to update vocabulary');
    return res.data;
  },

  async deleteVocabulary(userId, itemId) {
    const res = await forwardToMuralAPI(`/v1/learning/vocabulary/${itemId}?userId=${userId}`, {
      method: 'DELETE',
      requireAuth: true,
    });
    if (res.status !== 200) throw new Error('Failed to delete vocabulary');
  },

  async getReviewsDue(userId, limit = 20) {
    const res = await forwardToMuralAPI(`/v1/learning/reviews/due?userId=${userId}&limit=${limit}`, { requireAuth: true });
    if (res.status !== 200) throw new Error('Failed to get reviews');
    return res.data;
  },

  async getFluencyGraph(userId, languageId) {
    const res = await forwardToMuralAPI(`/v1/learning/fluency-graph?userId=${userId}&languageId=${languageId}`, { requireAuth: true });
    if (res.status !== 200) throw new Error('Failed to get fluency graph');
    return res.data;
  },

  async getProgress(userId, languageId) {
    const res = await forwardToMuralAPI(`/v1/learning/progress?userId=${userId}&languageId=${languageId}`, { requireAuth: true });
    if (res.status !== 200) throw new Error('Failed to get progress');
    return res.data;
  },

  async getRecommendations(userId, targetSkill) {
    const params = targetSkill ? `userId=${userId}&targetSkill=${targetSkill}` : `userId=${userId}`;
    const res = await forwardToMuralAPI(`/v1/learning/recommendations?${params}`, { requireAuth: true });
    if (res.status !== 200) throw new Error('Failed to get recommendations');
    return res.data;
  },
};