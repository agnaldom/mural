# Universal Language Learning Intelligence - Development Checklist

**Based on:** MURAL_Universal_Language_Learning_Intelligence_SPEC.md  
**Status:** In Progress - Phase 1 Complete
**Created:** 2026-11-21  
**Current Branch:** feature/learning-api-integration

---

## ✅ ALREADY IMPLEMENTED

### Existing Learning Types (`apps/web/src/types/learning.ts`)
- [x] `Speaker` type ('user' | 'assistant')
- [x] `EvidenceKind` type ('exposure' | 'understanding' | 'assisted' | 'independent' | 'lapse')
- [x] `Outcome` type ('success' | 'partial' | 'breakdown' | 'uncertain')
- [x] `Fragment` interface - user/assistant speech fragments with timing
- [x] `Passage` interface - grouped fragments by speaker
- [x] `WordProposal` interface - vocabulary extraction from AI assessment
- [x] `Assessment` interface - session analysis with suggested level, words, capability
- [x] `WordState` interface - spaced repetition states (New/Fragile/Growing/Steady)
- [x] `LearnerState` interface - projected learner proficiency
- [x] `SessionRecord` interface - conversation session with fragments and assessments
- [x] `UserPreferences` interface - meaning language, voices, levels, meanings visibility
- [x] `LearningArchive` interface - persisted learning data structure
- [x] `APPLE_EPOCH_UNIX_OFFSET_SECONDS` constant for time calculations

### Existing Learning Engine (`apps/web/src/lib/learning/engine.ts`)
- [x] `wordKey()` - unique vocabulary identifier (language|lemma|meaning)
- [x] `validate()` - assessment validation against session speech
- [x] `project()` - learner state projection from historical sessions
- [x] `dayKey()` - date formatting for spaced repetition calculation

### Existing Transcript Processing (`apps/web/src/lib/learning/transcript.ts`)
- [x] `passages()` - group fragments into speaker turns
- [x] `join()` / `legacyJoin()` - text assembly with proper spacing

### Existing Archive Store (`apps/web/src/lib/storage/archive-store.ts`)
- [x] Zustand store for learning archive
- [x] Initial welcome session with sample data
- [x] `recordSession()` - persist conversation sessions
- [x] `recordRetrievalEvidence()` - track vocabulary recall
- [x] `getLearnerState()` - project proficiency
- [x] `loadArchive()` / `saveArchive()` - local storage persistence
- [x] `setLearningLanguage()` / `setLanguageVoice()` / `setLanguageLevel()`
- [x] `setMeaningLanguage()` / `setMeaningVisible()`
- [x] `updatePreferences()` - update user preferences
- [x] `deleteSession()` / `exportArchiveJSON()` / `importArchiveJSON()`
- [x] `DEFAULT_LANGUAGE_VOICES` - voice mappings for all languages

### Existing Language Registry (`apps/web/src/lib/languages/registry.ts`)
- [x] `LanguageModule` interface with id, name, nativeName, variety, locale, greeting, etc.
- [x] All language modules: nb, es, en, fr, de, it, pt, zh, sr, el, tl, nl, ru
- [x] `DEFAULT_LANGUAGE_ID = 'en'`
- [x] `MEANING_LANGUAGES` array (16 languages)
- [x] `LanguageRegistry` class with `get()`, `all`, `defaultID`, `defaultGreeting()`

### Existing Themes Infrastructure (`apps/web/src/lib/languages/themes.ts`)
- [x] `ConversationTheme` interface with id, title, subtitle, symbol, category, situation
- [x] `THEME_PACKS` - 5 packs: Work, Speak with Confidence, Travel, Deep Conversations, Everyday Life
- [x] `THEME_OVERRIDES` - language-specific title/subtitle/situation overrides
- [x] `SHARED_THEMES` - 70+ themes across all packs
- [x] `THEME_EXPERIENCES` - starter assistant/user/meaning texts per theme/lang/level
- [x] `THEME_VOCABULARY` - thematic word lists per theme/lang/level
- [x] `THEME_PRONUNCIATION` - pronunciation exercises with tips
- [x] `getThemesForLanguage()` / `getThemeExperience()` / `getThemeVocabulary()`

### Existing Talk Page (`apps/web/src/app/talk/page.tsx`)
- [x] Full conversation UI with Mural Orb
- [x] Speech recognition (Web Speech API + VoiceStudio Whisper fallback)
- [x] VoiceStudio TTS integration
- [x] Session recording and fragment collection
- [x] History payload preparation for AI
- [x] Turn processing with concurrency control
- [x] Transcript drawer/view
- [x] Word lookup modal
- [x] Tone cycling (casual/professional/formal/challenging)
- [x] Level selection (beginner/intermediate/advanced)
- [x] Meaning language selection
- [x] Input language toggle (native/target)

### Existing Chat BFF Route (`apps/web/src/app/api/bff/chat/route.ts`)
- [x] POST endpoint for conversation
- [x] Tone guidance for 4 tones
- [x] Level guidance for 3 levels
- [x] JSON response parsing
- [x] Fallback replies for API failures

---

## ⏳ NEEDS VERIFICATION

### Backend API Endpoints (from spec proposal)
Verify if these exist:
- [ ] `GET /v1/learning/profile` - learner profile (frontend currently uses localStorage)
- [ ] `GET /v1/learning/languages` - language packs list
- [ ] `GET /v1/learning/recommendations` - personalized recs
- [ ] `POST /v1/learning/sessions` - create session from live session
- [ ] `GET /v1/learning/sessions` - list user sessions
- [ ] `GET /v1/learning/sessions/:sessionId` - get session details
- [ ] `POST /v1/learning/sessions/:sessionId/analysis` - trigger analysis
- [ ] `GET /v1/learning/vocabulary` - list user vocabulary
- [ ] `POST /v1/learning/vocabulary` - add vocabulary
- [ ] `PATCH /v1/learning/vocabulary/:itemId` - update recall state
- [ ] `DELETE /v1/learning/vocabulary/:itemId` - remove item
- [ ] `GET /v1/learning/fluency-graph` - retrieve skill graph
- [ ] `GET /v1/learning/progress` - current stage/score

---

## 📋 PHASES TO IMPLEMENT

### Phase 0: Repository and Contract Audit (IN PROGRESS)
- [x] Read `AGENTS.md` and document key constraints
- [ ] Map existing backend routes (Node.js/TypeScript/PostgreSQL)
- [ ] Verify native learning archive formats match web
- [ ] Document authentication and session contracts
- [ ] List reusable existing components
- [ ] Create ADRs for pending architectural decisions

### Phase 1: Backend API Integration
Current state: Learning data is stored locally via Zustand in localStorage.
Need: Server-backed storage synced with native clients.

Tasks:
- [ ] Create BFF endpoints for learning API
- [ ] Sync `LearningArchive` with backend
- [ ] Create `LearnerProfile` table and service
- [ ] Create `VocabularyItem` table and service
- [ ] Create `ConversationSession` table and service
- [ ] Add user ownership enforcement
- [ ] Add pagination for history/vocabulary
- [ ] Add rate limiting

### Phase 2: Session Analysis Pipeline
Current state: Sessions are stored with fragments and empty assessments array.
Need: Post-session analysis that extracts:
- Vocabulary candidates
- Skill evidence
- Learning opportunities

Tasks:
- [ ] Create session analysis worker/service
- [ ] AI-based vocabulary extraction (improve on current validation)
- [ ] Skill evidence recording
- [ ] Learning candidate generation
- [ ] User review queue for new items

### Phase 3: Vocabulary and Spaced Repetition
Current state: Basic spaced repetition with 4 bars (New/Fragile/Growing/Steady)
Need: More sophisticated scheduling and tracking

Tasks:
- [ ] Enhanced spaced repetition algorithm
- [ ] Recognition vs production tracking
- [ ] Spontaneous use in conversation tracking
- [ ] Review scheduling API
- [ ] Practice activities (meaning recall, production, listening, etc.)

### Phase 4: Fluency Graph (SKILL GRAPH)
Current state: Not implemented. Spec defines 18 skill domains.
Need: Visual skill graph with evidence, confidence, prerequisites

Tasks:
- [ ] `CommunicativeSkill` definitions per language
- [ ] `SkillState` model with evidence references
- [ ] Skill graph API (`GET /v1/learning/fluency-graph`)
- [ ] Progress API (`GET /v1/learning/progress`)
- [ ] UI for skill graph visualization

### Phase 5: Personalized Recommendations
Current state: Not implemented
Need: Rule-based recommendation engine

Tasks:
- [ ] Recommendation rules engine
- [ ] Priority ranking based on gaps, recent learning, goals
- [ ] `GET /v1/learning/recommendations` endpoint
- [ ] UI for recommendations with user controls

### Phase 6: Real-World Simulations
Current state: Themes exist but as conversation starters only
Need: Full roleplay simulation engine

Tasks:
- [ ] Scenario schema definition
- [ ] Role assignment mechanism
- [ ] Task completion evaluation
- [ ] Adaptive scenario variations
- [ ] Initial scenarios: standup, interview, presentation, negotiation, etc.

### Phase 7: Universal Language Expansion
Current state: 13 languages in registry
Need: Language pack validation and expansion process

Tasks:
- [ ] Language pack validation process
- [ ] Language-specific rubrics
- [ ] Cross-language adaptation testing
- [ ] Add new language release checklist

### Phase 8: Production Hardening
Tasks:
- [ ] Security review (auth, authorization, CSRF, rate limiting)
- [ ] Performance benchmarks
- [ ] AI quality evaluation
- [ ] Accessibility compliance (WCAG 2.2 AA)
- [ ] Cost optimization
- [ ] Production readiness approval

---

## Definition of Done - Feature Complete

A feature is done only when:

- [ ] Product behavior matches approved specification
- [ ] API contracts documented and validated
- [ ] User ownership enforced
- [ ] Errors and loading states implemented
- [ ] Accessibility requirements met
- [ ] Tests cover critical behavior
- [ ] Analytics are privacy-safe
- [ ] Feature flags configured where necessary
- [ ] Existing native clients remain compatible
- [ ] Documentation updated
- [ ] No unsupported learning claims introduced

---

## Implementation Order

1. Start feature branch from current `main`
2. Complete Phase 0 before any implementation
3. One phase at a time - don't skip
4. Run relevant tests before marking phase complete
5. Update this checklist after each completion
6. Verify against spec after each phase

---

## Related Files

### Web Application Structure
```
apps/web/
  app/
    home/
    talk/
    conversation/
    practice/
    library/
    fluency/
    history/
    settings/
  components/
    ui/
    conversation/
    learning/
    fluency/
    navigation/
  features/
    auth/
    conversation/
    learner-profile/
    learning-memory/
    vocabulary/
    review/
    recommendations/
    fluency-graph/
    simulations/
  domain/
    learner/
    language/
    skill/
    evidence/
    activity/
  lib/
    api/
    auth/
    validation/
    telemetry/
  types/
    learning.ts
```

### Data Models (`apps/web/src/types/learning.ts`)
Extend existing types with:
- `LearnerProfile`
- `CommunicativeSkill`
- `SkillState`
- `LearningEvidence`
- `VocabularyItem` (partially exists as `WordState`)
- `ReviewState`
- `SessionAnalysis`
- `Recommendation`

---

## Key Constraints (from AGENTS.md)

- [x] Ship UI and server changes together
- [ ] Verify production deployment wrapper before merging
- [ ] Preserve existing native client functionality
- [ ] Use stable IDs and versioned contracts
- [ ] Do not break iOS or Android clients
- [ ] Feature flags required for new functionality
- [ ] No CEFR certification claims
- [ ] No misleading fluency percentage

---

*Update this checklist as implementation progresses. Mark items complete as they are verified.*

## Phase 2: Conversation Learning Loop

### 2.1 Session Management
- [ ] `POST /v1/learning/sessions` - create session from live session
- [ ] `GET /v1/learning/sessions` - list user sessions
- [ ] `GET /v1/learning/sessions/:sessionId` - get session details

### 2.2 Session Analysis Pipeline
- [ ] `POST /v1/learning/sessions/:sessionId/analysis` - trigger analysis
- [ ] Analysis worker processes session
- [ ] Extracts vocabulary candidates
- [ ] Extracts expression candidates
- [ ] Records skill evidence

### 2.3 Vocabulary Extraction
- [ ] Vocabulary candidate validator
- [ ] Expression pattern extractor
- [ ] User review queue for new items
- [ ] Deletion API for incorrect items

### 2.4 Session Summary
- [ ] Auto-generate session summary
- [ ] Learning candidates visible to user
- [ ] Skill evidence linked to session

### 2.5 API Endpoints
- [ ] `GET /v1/learning/vocabulary` - list user vocabulary
- [ ] `POST /v1/learning/vocabulary` - add vocabulary
- [ ] `PATCH /v1/learning/vocabulary/:itemId` - update recall state
- [ ] `DELETE /v1/learning/vocabulary/:itemId` - remove item
- [ ] `POST /v1/learning/reviews` - start review process
- [ ] `GET /v1/learning/reviews/due` - get review queue

### 2.6 UI Components
- [ ] Session summary view
- [ ] Learning candidates review sheet
- [ ] Vocabulary management screen
- [ ] Deletion confirmation flow

### Exit Criteria
- [ ] Completed conversations produce reviewable learning artifacts
- [ ] Users can accept/reject learning items
- [ ] Evidence is properly attributed

---

## Phase 3: Vocabulary and Recall

### 3.1 Vocabulary System
- [ ] Spaced repetition scheduler
- [ ] Recall state tracking (New → Learning → Due → Strong)
- [ ] Recognition vs production tracking
- [ ] Review scheduling algorithm

### 3.2 Practice Activities
- [ ] Meaning recall exercise
- [ ] Target-language production exercise
- [ ] Listening recognition exercise
- [ ] Sentence completion exercise
- [ ] Contextual response exercise
- [ ] Speak using expression exercise

### 3.3 Review Engine
- [ ] `GET /v1/learning/reviews/due` - paginated review queue
- [ ] Review submission API
- [ ] Spacing algorithm (configurable)
- [ ] Difficulty adjustment based on recall

### 3.4 Tracking
- [ ] Recognition recall history
- [ ] Production recall history
- [ ] Spontaneous use in conversation
- [ ] Review success/failure rates

### Exit Criteria
- [ ] Users can learn, review, and demonstrate recall
- [ ] Spaced repetition works correctly
- [ ] Recognition/production tracked separately

---

## Phase 4: Fluency Graph

### 4.1 Skill Graph Definition
Initial skill domains:
- [ ] `introduce_self` - self-introduction
- [ ] `ask_answer_questions` - Q&A
- [ ] `describe_routines` - daily routines
- [ ] `describe_people_places` - people/places
- [ ] `narrate_past_experiences` - storytelling past
- [ ] `explain_plans` - future plans
- [ ] `express_preferences` - likes/dislikes
- [ ] `express_opinions` - opinions
- [ ] `explain_reasons` - explanations
- [ ] `clarify_misunderstandings` - repair strategies
- [ ] `ask_for_help` - requesting assistance
- [ ] `handle_unexpected_questions` - adaptability
- [ ] `participate_meetings` - meeting participation
- [ ] `present_idea` - presentations
- [ ] `negotiate` - negotiation
- [ ] `summarize_information` - summarization
- [ ] `explain_technical_concepts` - technical language
- [ ] `understand_natural_speech` - comprehension

### 4.2 Skill Record Model
Each skill record:
- [ ] Stable skill ID
- [ ] Target language
- [ ] Description
- [ ] Prerequisite skills
- [ ] Estimated state
- [ ] Confidence
- [ ] Evidence references
- [ ] Last demonstrated timestamp
- [ ] Retention status
- [ ] Assessment version

### 4.3 Evidence Recording
- [ ] Conversation performance evidence
- [ ] Listening task evidence
- [ ] Retrieval exercise evidence
- [ ] Roleplay completion evidence
- [ ] User self-assessment evidence

### 4.4 Fluency Graph API
- [ ] `GET /v1/learning/fluency-graph` - retrieve skill graph
- [ ] `GET /v1/learning/progress` - current stage/score

### 4.5 UI Components
- [ ] Skill graph visualization
- [ ] Strength/gap indicators
- [ ] Checkpoint markers
- [ ] Evidence history view

### Exit Criteria
- [ ] Progress reflects demonstrated abilities
- [ ] Uncertainty is visible to user
- [ ] Skills are properly linked with prerequisites

---

## Phase 5: Personalized Recommendations

### 5.1 Recommendation Rules
- [ ] Address skill gaps
- [ ] Reinforce recent learning
- [ ] Support user-selected goals
- [ ] Provide evidence for uncertain skills
- [ ] Support retention
- [ ] Avoid repetitive practice

### 5.2 Recommendation Engine
- [ ] Rule-based ranking system
- [ ] Goal-based filtering
- [ ] Time availability consideration
- [ ] Difficulty matching

### 5.3 Recommendation API
- [ ] `GET /v1/learning/recommendations` - ranked activities

### 5.4 Recommendation Output
Each recommendation includes:
- [ ] Activity ID
- [ ] Reason string
- [ ] Target skill
- [ ] Expected duration
- [ ] Difficulty level
- [ ] Learning objective
- [ ] Priority
- [ ] Prerequisites

### 5.5 UI Components
- [ ] Recommendation card/row
- [ ] Reason explanation
- [ ] Difficulty indicator
- [ ] User controls (accept/skip/choose another)

### Exit Criteria
- [ ] Recommendations are traceable to goals and evidence
- [ ] Users can control recommendations
- [ ] Evaluation metrics capture relevance

---

## Phase 6: Real-World Simulations

### 6.1 Scenario Schema
Each scenario:
- [ ] Scenario ID and title
- [ ] Role assignments
- [ ] User objective
- [ ] AI objective
- [ ] Context description
- [ ] Difficulty level
- [ ] Required communicative functions
- [ ] Optional constraints
- [ ] Evaluation rubric
- [ ] Completion condition

### 6.2 Initial Scenarios
- [ ] Daily standup
- [ ] Team introduction
- [ ] Job interview
- [ ] Project presentation
- [ ] Client call
- [ ] Asking for directions
- [ ] Hotel check-in
- [ ] Restaurant ordering
- [ ] Networking
- [ ] Negotiation
- [ ] Difficult conversation
- [ ] Conference Q&A
- [ ] Technical explanation
- [ ] Unexpected problem

### 6.3 Adaptive Scenario Engine
- [ ] Follow-up question variation
- [ ] Context detail variation
- [ ] Time pressure variation
- [ ] Vocabulary complexity variation
- [ ] Ambiguity handling

### 6.4 Assessment Integration
- [ ] Task completion check
- [ ] Skill evaluation
- [ ] Evidence recording

### Exit Criteria
- [ ] Simulations provide repeatible practice
- [ ] Measurable outcomes via rubrics
- [ ] Variations remain fair

---

## Phase 7: Universal Language Expansion

### 7.1 Language Pack Validation
Process:
- [ ] Create language pack structure
- [ ] Map communicative capabilities
- [ ] Define language-specific objectives
- [ ] Add content/examples
- [ ] Validate speech provider compatibility
- [ ] Run quality checks
- [ ] Release behind feature flag

### 7.2 Language Pack Contract
Each pack contains:
- [ ] `language_id`
- [ ] `display_name`
- [ ] `native_name`
- [ ] `script`
- [ ] `locale`
- [ ] `supported_levels`
- [ ] `pronunciation_profile`
- [ ] `grammar_topics`
- [ ] `communicative_functions`
- [ ] `vocabulary_domains`
- [ ] `register_profiles`
- [ ] `regional_variants`
- [ ] `assessment_rubrics`
- [ ] `content_version`
- [ ] `review_status`

### 7.3 Supported Languages (verify against current system)
- [ ] `nb` — Norwegian Bokmål
- [ ] `es` — Spanish
- [ ] `en` — English
- [ ] `fr` — French
- [ ] `de` — German
- [ ] `it` — Italian
- [ ] `pt-BR` — Brazilian Portuguese
- [ ] `zh-CN` — Simplified Chinese
- [ ] `sr-Latn-RS` — Serbian, Latin script
- [ ] `el` — Greek
- [ ] `tl-PH` — Filipino

### 7.4 Cross-Language Adaptation
- [ ] Language-independent engine
- [ ] Language-specific rubrics
- [ ] Validation tests per language

### Exit Criteria
- [ ] New language can be added without engine changes
- [ ] All supported languages validated

---

## Phase 8: Production Hardening

### 8.1 Security Review
- [ ] Authentication enforcement on all endpoints
- [ ] Authorization checks on resources
- [ ] CSRF protection for cookie auth
- [ ] Rate limiting implementation
- [ ] Input validation/sanitization
- [ ] Secrets management (no API keys in client)

### 8.2 Performance Testing
- [ ] API latency benchmarks
- [ ] Database query optimization
- [ ] Analysis pipeline performance
- [ ] Recommendation generation speed
- [ ] Voice session connection times

### 8.3 AI Evaluation
- [ ] Correction accuracy evaluation
- [ ] Naturalness assessment
- [ ] Level appropriateness evaluation
- [ ] Language-specific correctness
- [ ] Bias and safety testing
- [ ] Structured output reliability
- [ ] Assessment consistency

### 8.4 Accessibility Audit
- [ ] WCAG 2.2 AA compliance
- [ ] Keyboard navigation
- [ ] Screen reader labels
- [ ] Visible focus states
- [ ] Color contrast
- [ ] Reduced motion support
- [ ] Audio control accessibility

### 8.5 Cost Optimization
- [ ] Provider cost analysis
- [ ] Caching strategy
- [ ] Analysis pipeline efficiency
- [ ] Feature flag gating

### Exit Criteria
- [ ] Security review passed
- [ ] Performance benchmarks met
- [ ] AI quality validated
- [ ] Accessibility compliance confirmed
- [ ] Production readiness approved

---

## Definition of Done - Feature Complete

A feature is done only when:

- [ ] Product behavior matches approved specification
- [ ] API contracts documented and validated
- [ ] User ownership enforced
- [ ] Errors and loading states implemented
- [ ] Accessibility requirements met
- [ ] Tests cover critical behavior
- [ ] Analytics are privacy-safe
- [ ] Feature flags configured where necessary
- [ ] Existing native clients remain compatible
- [ ] Documentation updated
- [ ] No unsupported learning claims introduced

---

## Implementation Order

1. Start feature branch from current `main`
2. Complete Phase 0 before any implementation
3. One phase at a time - don't skip
4. Run relevant tests before marking phase complete
5. Update this checklist after each completion
6. Verify against spec after each phase

---

## Related Files

### Web Application Structure
```
apps/web/
  app/
    home/
    talk/
    conversation/
    practice/
    library/
    fluency/
    history/
    settings/
  components/
    ui/
    conversation/
    learning/
    fluency/
    navigation/
  features/
    auth/
    conversation/
    learner-profile/
    learning-memory/
    vocabulary/
    review/
    recommendations/
    fluency-graph/
    simulations/
  domain/
    learner/
    language/
    skill/
    evidence/
    activity/
  lib/
    api/
    auth/
    validation/
    telemetry/
  types/
    learning.ts
```

### Data Models (`apps/web/src/types/learning.ts`)
Extend existing types with:
- LearnerProfile
- CommunicativeSkill
- SkillState
- LearningEvidence
- VocabularyItem
- ReviewState
- SessionAnalysis
- Recommendation

---

## Key Constraints (from AGENTS.md)

- [ ] Ship UI and server changes together
- [ ] Verify production deployment wrapper before merging
- [ ] Preserve existing native client functionality
- [ ] Use stable IDs and versioned contracts
- [ ] Do not break iOS or Android clients
- [ ] Feature flags required for new functionality
- [ ] No CEFR certification claims
- [ ] No misleading fluency percentage

---

*Update this checklist as implementation progresses. Mark items complete as they are verified.*