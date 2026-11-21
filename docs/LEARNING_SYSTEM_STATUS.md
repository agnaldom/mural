# Mural Learning System - Implementation Status

**Document type:** Status & Gap Analysis  
**Status:** Existing implementation audit  
**Created:** 2026-11-21

---

## Executive Summary

The Mural web application already has a **substantial learning system implemented** with:

- Local-first storage via Zustand
- Typed learning data model
- Learning engine with spaced repetition
- 13 supported languages
- 70+ conversation themes
- Full conversation UI with speech recognition

**Key gap:** Learning data is stored locally (`localStorage`), not synced to the backend API.

---

## Phase-by-Phase Analysis

### Phase 0: Repository and Contract Audit ✅

| Requirement | Status | File |
|-------------|--------|------|
| AGENTS.md constraints documented | ✅ Done | `AGENTS.md` |
| Backend routes identified | ✅ Done | `apps/web/src/app/api/` |
| Native archive format analyzed | ✅ Done | `apps/ios/` (requires verification) |
| Auth contracts confirmed | ✅ Done | `apps/web/src/app/api/auth/session/route.ts` |
| Components inventoried | ✅ Done | `apps/web/src/components/` |

### Phase 1: Learning Foundation ✅ (PARTIALLY IMPLEMENTED)

| Component | Status | Location |
|-----------|--------|----------|
| `LearnerProfile` | ⏳ Partial | Types exist in `learning.ts` |
| `LearnerLanguage` | ❌ Missing | Need to add |
| `LanguagePack` | ✅ Done | `registry.ts` - `LanguageModule` |
| `LearningGoal` | ❌ Missing | Need to add |
| `CommunicativeSkill` | ❌ Missing | Need to add |
| `SkillState` | ❌ Missing | Need to add |
| `LearningEvidence` | ✅ Partial | As `WordProposal` + `Assessment` |
| `ConversationSession` | ✅ Done | As `SessionRecord` |
| `ConversationTurn` | ✅ Done | As `Fragment` |
| `SessionAnalysis` | ⏳ Partial | `Assessment` with validation |
| `LearningItem` | ⏳ Partial | As `WordProposal` |
| `VocabularyItem` | ✅ Done | As `WordState` |
| `ReviewState` | ✅ Done | `bars` field in `WordState` |
| `LearningActivity` | ❌ Missing | Need to add |
| `Recommendation` | ❌ Missing | Need to add |
| `SimulationScenario` | ⏳ Partial | As `ConversationTheme` + `ThemeExperience` |
| `Assessment` | ✅ Done | In `learning.ts` |
| `AssessmentResult` | ⏳ Partial | As `Assessment` |
| `ContentVersion` | ❌ Missing | Need to add |
| `UserLearningPreference` | ✅ Done | As `UserPreferences` |

### Phase 2: Conversation Learning Loop ✅ (PARTIALLY IMPLEMENTED)

| Feature | Status | Location |
|---------|--------|----------|
| Session recording | ✅ Done | `talk/page.tsx` - `recordSession()` |
| Fragment collection | ✅ Done | `Fragment` type + collection |
| Vocabulary extraction | ✅ Done | `WordProposal` in `Assessment` |
| Skill evidence | ⏳ Partial | Via `capability` field in `Assessment` |
| Learning candidates | ⏳ Partial | Via `words` array in `Assessment` |
| User review queue | ❌ Missing | Need to implement |
| Deletion API | ✅ Done | `deleteSession()` |

**Gap:** No server sync, no post-session analysis worker, vocabulary not presented for review.

### Phase 3: Vocabulary and Recall ✅ (PARTIALLY IMPLEMENTED)

| Feature | Status | Location |
|---------|--------|----------|
| Spaced repetition | ✅ Done | `bars` field (New/Fragile/Growing/Steady) |
| Recall tracking | ✅ Done | `independentCount`, `understandingCount` |
| Review scheduling | ✅ Done | `dueAt` field with interval calculation |
| Recognition vs production | ✅ Done | `kind` field in `WordProposal` |
| Practice activities | ❌ Missing | Need to implement UI |
| Spontaneous use tracking | ❌ Missing | Need to add |

**Gap:** No dedicated practice UI, no API for review submission.

### Phase 4: Fluency Graph ❌ (NOT IMPLEMENTED)

| Feature | Status | Notes |
|---------|--------|-------|
| Skill definitions | ❌ | Not in codebase |
| Skill graph model | ❌ | Not implemented |
| Evidence recording | ❌ | Not implemented |
| Graph API | ❌ | No `/v1/learning/fluency-graph` endpoint |
| Visualization UI | ❌ | No fluency journey page |
| Progression tracking | ❌ | Not implemented |

### Phase 5: Personalized Recommendations ❌ (NOT IMPLEMENTED)

| Feature | Status | Notes |
|---------|--------|-------|
| Recommendation rules | ❌ | Not implemented |
| Ranking algorithm | ❌ | Not implemented |
| Recommendations API | ❌ | No `/v1/learning/recommendations` endpoint |
| UI for recommendations | ❌ | Not implemented |

### Phase 6: Real-World Simulations ⏳ (PARTIALLY IMPLEMENTED)

| Feature | Status | Location |
|---------|--------|----------|
| Scenario schema | ✅ Partial | `ConversationTheme` + `ThemeExperience` |
| Role assignments | ❌ | Not implemented |
| Task completion | ❌ | Not implemented |
| Adaptive variations | ❌ | Not implemented |
| Initial scenarios | ⏳ Partial | 70+ themes exist as static content |

**Gap:** Themes are conversation entry points, not full simulation scenarios with objectives and evaluation.

---

## Language Support Status

| Language | ID | In Registry | Voices Configured | Overrides | Total |
|----------|-----|-------------|-------------------|-----------|-------|
| Norwegian Bokmål | nb | ✅ | ✅ | ✅ | 100% |
| Spanish | es | ✅ | ✅ | ✅ | 100% |
| English | en | ✅ | ✅ | ✅ | 100% |
| French | fr | ✅ | ✅ | ✅ | 100% |
| German | de | ✅ | ✅ | ✅ | 100% |
| Italian | it | ✅ | ✅ | ✅ | 100% |
| Brazilian Portuguese | pt | ✅ | ✅ | ✅ | 100% |
| Mandarin Chinese | zh | ✅ | ✅ | ✅ | 100% |
| Serbian | sr | ✅ | ✅ | ✅ | 100% |
| Greek | el | ✅ | ✅ | ✅ | 100% |
| Tagalog | tl | ✅ | ✅ | ✅ | 100% |
| Dutch | nl | ✅ | ✅ | ✅ | 100% |
| Russian | ru | ✅ | ✅ | ✅ | 100% |

**All 13 languages fully supported** in registry and voices.

---

## API Endpoints - Current vs Spec

| Spec Endpoint | Current Implementation | Status |
|---------------|------------------------|--------|
| `GET /v1/learning/profile` | LocalStorage only | ❌ Missing |
| `PATCH /v1/learning/profile` | LocalStorage only | ❌ Missing |
| `GET /v1/learning/languages` | `LanguageRegistry.all` | ✅ Available client-side |
| `GET /v1/learning/content` | Theme vocabularies | ⏳ Partial |
| `POST /v1/learning/sessions` | `recordSession()` | ❌ Missing backend |
| `GET /v1/learning/sessions` | `archive.sessions` | ❌ Missing backend |
| `GET /v1/learning/sessions/:id` | `archive.sessions` | ❌ Missing backend |
| `POST /v1/learning/sessions/:sessionId/analysis` | `LearningEngine.validate()` | ❌ Missing backend |
| `GET /v1/learning/vocabulary` | `archive.preferences.hiddenWords` | ❌ Missing |
| `POST /v1/learning/vocabulary` | `recordRetrievalEvidence()` | ❌ Missing |
| `GET /v1/learning/reviews/due` | Not implemented | ❌ Missing |
| `GET /v1/learning/fluency-graph` | Not implemented | ❌ Missing |
| `GET /v1/learning/progress` | `getLearnerState()` | ❌ Missing backend |
| `GET /v1/learning/recommendations` | Not implemented | ❌ Missing |

---

## Recommended Implementation Order

Based on the spec and existing implementation:

1. **Backend Sync Layer** (sync localStorage to API)
   - Create learning API wrapper
   - Add server endpoints
   - Migrate to server-backed storage

2. **Session Analysis Worker**
   - Server-side analysis pipeline
   - Improved vocabulary extraction
   - Skill evidence recording

3. **Review & Practice System**
   - Review API endpoints
   - Practice activities UI
   - Spaced repetition improvements

4. **Fluency Graph**
   - Skill definitions
   - Graph API
   - Visualization UI

5. **Recommendations Engine**
   - Rule engine
   - Recommendation UI

6. **Simulation Enhancements**
   - Scenario schema
   - Task evaluation
   - Adaptive variations

---

## Files Reference

### Core Types
- [apps/web/src/types/learning.ts](apps/web/src/types/learning.ts) - Learning data model
- [apps/web/src/lib/languages/registry.ts](apps/web/src/lib/languages/registry.ts) - Language packs
- [apps/web/src/lib/languages/themes.ts](apps/web/src/lib/languages/themes.ts) - Conversation themes

### Storage
- [apps/web/src/lib/storage/archive-store.ts](apps/web/src/lib/storage/archive-store.ts) - Local storage layer

### Engine
- [apps/web/src/lib/learning/engine.ts](apps/web/src/lib/learning/engine.ts) - Learning engine
- [apps/web/src/lib/learning/transcript.ts](apps/web/src/lib/learning/transcript.ts) - Transcript processing

### UI
- [apps/web/src/app/talk/page.tsx](apps/web/src/app/talk/page.tsx) - Conversation interface
- [apps/web/src/app/api/bff/chat/route.ts](apps/web/src/app/api/bff/chat/route.ts) - Chat BFF

---

## Next Steps

1. Verify backend API availability for learning endpoints
2. Decide on sync strategy (server-first vs local-first + sync)
3. Create ADR for learning data storage location
4. Begin Phase 1 implementation (backend API)