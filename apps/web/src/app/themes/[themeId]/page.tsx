'use client';

import React, { useState, useEffect, useRef, use, Suspense, useMemo } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  Coffee,
  Sun,
  Trees,
  Utensils,
  Hand,
  ShoppingBag,
  Compass,
  Home,
  Users,
  Briefcase,
  CloudRain,
  Mountain,
  Music,
  Film,
  Book,
  Wine,
  Volume2,
  Mic,
  MicOff,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  RotateCw,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ArrowRight,
  Send,
  MessageSquare,
  BookOpen,
  Layers,
  Check,
  Target,
  Smile,
  Award,
  CalendarCheck,
  UserCheck,
  Rocket,
  Scale,
  Phone,
  Laptop,
  Shuffle,
  Presentation,
  Lightbulb,
  Plane,
  Key,
  Building,
  Activity,
  MapPin,
  Palette,
  Heart,
  Moon,
  Timer,
  ShieldAlert,
  Globe,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useArchiveStore } from '@/lib/storage/archive-store';
import { UserProficiencyLevel } from '@/types/learning';
import { LevelAssessmentModal } from '@/components/themes/level-assessment-modal';
import { LANGUAGE_MODULES } from '@/lib/languages/registry';
import {
  SHARED_THEMES,
  ConversationTheme,
  getThemesForLanguage,
  getThemeVocabulary,
  getThemeExperience,
  getThemePronunciationExercises,
  getThemeWritingExercises,
  ThematicWord,
  ThematicPronunciationExercise,
  ThematicWritingExercise,
  LANGUAGE_ACCENTS,
  CONVERSATION_TONES,
  getConversationTones,
  ConversationTone,
  THEME_PORTUGUESE_CATEGORIES,
  THEME_PORTUGUESE_SITUATIONS,
} from '@/lib/languages/themes';

const THEME_ICONS: Record<string, React.ElementType> = {
  coffee: Coffee,
  sun: Sun,
  tree: Trees,
  utensils: Utensils,
  hand: Hand,
  'shopping-bag': ShoppingBag,
  navigation: Compass,
  home: Home,
  users: Users,
  briefcase: Briefcase,
  'cloud-rain': CloudRain,
  mountain: Mountain,
  music: Music,
  film: Film,
  book: Book,
  wine: Wine,
  sparkles: Sparkles,
  mic: Mic,
  'calendar-check': CalendarCheck,
  'user-check': UserCheck,
  rocket: Rocket,
  compass: Compass,
  'message-square': MessageSquare,
  'shield-alert': ShieldAlert,
  scale: Scale,
  phone: Phone,
  laptop: Laptop,
  shuffle: Shuffle,
  award: Award,
  target: Target,
  'help-circle': HelpCircle,
  timer: Timer,
  presentation: Presentation,
  lightbulb: Lightbulb,
  plane: Plane,
  key: Key,
  building: Building,
  activity: Activity,
  'alert-circle': AlertCircle,
  'map-pin': MapPin,
  smile: Smile,
  palette: Palette,
  heart: Heart,
  moon: Moon,
};

const PANEL_COLORS = [
  'bg-[#FFEFE5] border-[#FCD8C1] text-[#A0451A]', // 0: Peach
  'bg-[#F2EFFF] border-[#DFDAFA] text-[#593EA4]', // 1: Lilac
  'bg-[#EFF7ED] border-[#D6EBD4] text-[#2F6F38]', // 2: Sage
  'bg-[#FFF6DC] border-[#FAE8B2] text-[#8C6D15]', // 3: Butter
];

type ThemeTab = 'pronunciation' | 'writing' | 'vocabulary' | 'flashcards' | 'conversation';

interface PageProps {
  params: Promise<{ themeId: string }>;
}

function ThemeDetailContent({ themeId }: { themeId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as ThemeTab) || 'pronunciation';
  const initialTone = (searchParams.get('tone') as ConversationTone) || 'casual';

  const { activeLanguageID, setLearningLanguage, setLanguageLevel, recordRetrievalEvidence, loadArchive, archive } = useArchiveStore();

  useEffect(() => {
    loadArchive();
  }, [loadArchive]);

  const meaningLanguage = archive.preferences?.meaningLanguage || 'Portuguese';
  const isPt = meaningLanguage === 'Portuguese';

  const langKey = activeLanguageID?.split('-')[0]?.toLowerCase() || 'en';
  const savedLevel: UserProficiencyLevel = archive.preferences?.languageLevels?.[langKey] || 'beginner';
  const [userLevel, setUserLevel] = useState<UserProficiencyLevel>(savedLevel);
  const [assessmentOpen, setAssessmentOpen] = useState(false);

  useEffect(() => {
    if (archive.preferences?.languageLevels?.[langKey]) {
      setUserLevel(archive.preferences.languageLevels[langKey]);
    }
  }, [archive.preferences?.languageLevels, langKey]);

  const activeModule = LANGUAGE_MODULES[activeLanguageID] || LANGUAGE_MODULES['en'];
  const themes = useMemo(() => getThemesForLanguage(activeLanguageID, meaningLanguage), [activeLanguageID, meaningLanguage]);
  const rawTheme = themes.find(t => t.id === themeId) || SHARED_THEMES.find(t => t.id === themeId);
  const theme = useMemo(() => {
    if (!rawTheme) return undefined;
    if (isPt) {
      return {
        ...rawTheme,
        category: THEME_PORTUGUESE_CATEGORIES[rawTheme.category] || rawTheme.category,
        situation: THEME_PORTUGUESE_SITUATIONS[rawTheme.id] || rawTheme.situation,
      };
    }
    return rawTheme;
  }, [rawTheme, isPt]);

  const conversationTones = getConversationTones(meaningLanguage);

  const [activeTab, setActiveTab] = useState<ThemeTab>(initialTab);
  const [selectedTone, setSelectedTone] = useState<ConversationTone>(initialTone);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const handleLevelChange = (lvl: UserProficiencyLevel) => {
    setUserLevel(lvl);
    setLanguageLevel(activeLanguageID, lvl);
    setPronIdx(0);
    setWritingIdx(0);
    setFlashcardIdx(0);
    setSpokenTranscript(null);
    setPronScore(null);
    setWordResults([]);
  };

  // Audio Playback
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);

  const fallbackSpeech = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = activeModule.locale || 'en-US';
      utterance.onend = () => setPlayingAudio(null);
      utterance.onerror = () => setPlayingAudio(null);
      window.speechSynthesis.speak(utterance);
    } else {
      setPlayingAudio(null);
    }
  };

  const playTextAudio = async (text: string) => {
    setPlayingAudio(text);
    try {
      const res = await fetch('/api/bff/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          language: activeLanguageID,
        }),
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audio.onended = () => setPlayingAudio(null);
        audio.onerror = () => {
          setPlayingAudio(null);
          fallbackSpeech(text);
        };
        await audio.play();
        return;
      }
    } catch (err) {
      console.warn('TTS fetch failed:', err);
    }
    fallbackSpeech(text);
  };

  // -------------------------------------------------------------
  // Pronunciation Practice State & Logic
  // -------------------------------------------------------------
  const pronunciationExercises = useMemo(() => {
    return getThemePronunciationExercises(themeId, activeLanguageID, meaningLanguage, userLevel, selectedTone);
  }, [themeId, activeLanguageID, meaningLanguage, userLevel, selectedTone]);
  const [pronIdx, setPronIdx] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [spokenTranscript, setSpokenTranscript] = useState<string | null>(null);
  const [pronScore, setPronScore] = useState<number | null>(null);
  const [wordResults, setWordResults] = useState<{ word: string; matched: boolean }[]>([]);
  const [pronCompleted, setPronCompleted] = useState<Record<number, number>>({});
  const recognitionRef = useRef<any>(null);

  const currentPron = pronunciationExercises[pronIdx] || pronunciationExercises[0];

  const normalizeForComparison = (str: string) => {
    return str
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'¡¿]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const evaluatePronunciation = (userSpoken: string, targetPhrase: string) => {
    const cleanUser = normalizeForComparison(userSpoken);
    const cleanTarget = normalizeForComparison(targetPhrase);

    const targetWords = cleanTarget.split(' ').filter(Boolean);
    const userWords = cleanUser.split(' ').filter(Boolean);

    let matchCount = 0;
    const results = targetWords.map(targetWord => {
      const found = userWords.some(userWord => {
        if (userWord === targetWord) return true;
        if (Math.abs(userWord.length - targetWord.length) <= 1) {
          let diffs = 0;
          for (let i = 0; i < Math.min(userWord.length, targetWord.length); i++) {
            if (userWord[i] !== targetWord[i]) diffs++;
          }
          return diffs <= 1;
        }
        return false;
      });
      if (found) matchCount++;
      return { word: targetWord, matched: found };
    });

    const calculatedScore = targetWords.length > 0
      ? Math.round((matchCount / targetWords.length) * 100)
      : 100;

    setWordResults(results);
    setPronScore(calculatedScore);
    setPronCompleted(prev => ({ ...prev, [pronIdx]: Math.max(prev[pronIdx] || 0, calculatedScore) }));
  };

  const startPronunciationRecording = () => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not natively supported in this browser. Please use Chrome, Safari or Edge.');
      return;
    }

    try {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }

      const rec = new SpeechRecognition();
      rec.lang = activeModule.locale || 'en-US';
      rec.continuous = false;
      rec.interimResults = false;

      rec.onstart = () => {
        setIsRecording(true);
        setSpokenTranscript(null);
        setPronScore(null);
        setWordResults([]);
      };

      rec.onresult = (event: any) => {
        const transcript = event.results[0]?.[0]?.transcript || '';
        setSpokenTranscript(transcript);
        evaluatePronunciation(transcript, currentPron.phrase);
      };

      rec.onerror = (event: any) => {
        console.warn('Recognition error in pronunciation practice:', event.error);
        setIsRecording(false);
      };

      rec.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = rec;
      rec.start();
    } catch (e) {
      console.warn('Failed to start speech recognition:', e);
      setIsRecording(false);
    }
  };

  const stopPronunciationRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
      setIsRecording(false);
    }
  };

  // -------------------------------------------------------------
  // Writing Practice State & Logic
  // -------------------------------------------------------------
  const writingExercises = useMemo(() => {
    return getThemeWritingExercises(themeId, activeLanguageID, meaningLanguage, userLevel, selectedTone);
  }, [themeId, activeLanguageID, meaningLanguage, userLevel, selectedTone]);
  const [writingIdx, setWritingIdx] = useState(0);
  const [userWritingInput, setUserWritingInput] = useState('');
  const [writingFeedback, setWritingFeedback] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [writingScores, setWritingScores] = useState<Record<number, boolean>>({});
  const [showWritingHint, setShowWritingHint] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const currentWriting = writingExercises[writingIdx] || writingExercises[0];
  const languageAccents = LANGUAGE_ACCENTS[activeLanguageID?.split('-')[0]] || LANGUAGE_ACCENTS['es'] || [];

  const handleCheckWriting = () => {
    if (!userWritingInput.trim()) return;

    const cleanInput = normalizeForComparison(userWritingInput);
    const isCorrect = currentWriting.acceptedAnswers.some(ans => {
      const cleanAns = normalizeForComparison(ans);
      return cleanInput === cleanAns;
    });

    if (isCorrect) {
      setWritingFeedback('correct');
      setWritingScores(prev => ({ ...prev, [writingIdx]: true }));
    } else {
      setWritingFeedback('incorrect');
      setWritingScores(prev => ({ ...prev, [writingIdx]: false }));
    }
  };

  const insertAccent = (char: string) => {
    setUserWritingInput(prev => prev + char);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const nextWritingExercise = () => {
    if (writingIdx < writingExercises.length - 1) {
      setWritingIdx(prev => prev + 1);
      setUserWritingInput('');
      setWritingFeedback('idle');
      setShowWritingHint(false);
    }
  };

  // -------------------------------------------------------------
  // Flashcards State & Logic
  // -------------------------------------------------------------
  const vocabWords = useMemo(() => {
    return getThemeVocabulary(themeId, activeLanguageID, meaningLanguage, userLevel, selectedTone);
  }, [themeId, activeLanguageID, meaningLanguage, userLevel, selectedTone]);
  const [flashcardIdx, setFlashcardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardScores, setCardScores] = useState<Record<string, boolean>>({});

  const currentCard = vocabWords[flashcardIdx] || vocabWords[0];

  const handleScoreCard = (known: boolean) => {
    if (!currentCard) return;
    setCardScores(prev => ({ ...prev, [currentCard.id]: known }));
    recordRetrievalEvidence(currentCard.id, known, known ? 'independent' : 'lapse');
    setIsFlipped(false);
    if (flashcardIdx < vocabWords.length - 1) {
      setFlashcardIdx(prev => prev + 1);
    }
  };

  // -------------------------------------------------------------
  // Conversation Experience Data
  // -------------------------------------------------------------
  const experience = useMemo(() => {
    return getThemeExperience(themeId, activeLanguageID, meaningLanguage, userLevel, selectedTone);
  }, [themeId, activeLanguageID, meaningLanguage, userLevel, selectedTone]);

  if (!theme) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#362A22]">Theme not found</h2>
        <p className="text-sm text-[#735A4A]">We couldn't locate this conversation theme.</p>
        <Link href="/themes">
          <Button className="rounded-full bg-[#FF8A4D] hover:bg-[#F27835] text-white">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Themes
          </Button>
        </Link>
      </div>
    );
  }

  const IconComponent = THEME_ICONS[theme.symbol] || Sparkles;
  const panelColor = PANEL_COLORS[theme.colorIndex % PANEL_COLORS.length];

  return (
    <div className="min-h-screen bg-[#FFFDF9] pb-24 text-[#362A22]">
      {/* Top Header */}
      <div className="border-b border-[#F0EBE1] bg-[#FCFBF7]/80 backdrop-blur sticky top-0 z-30">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link
            href="/themes"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#735A4A] hover:text-[#362A22] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{isPt ? 'Todos os Temas' : 'All Themes'}</span>
          </Link>

          <div className="flex items-center gap-2">
            {/* Direct Learning Language Switcher */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center space-x-1.5 rounded-full border border-[#E8DFD1] bg-[#F7F2E9] hover:bg-white px-3 py-1.5 text-xs font-bold text-[#362A22] transition-all shadow-2xs"
                title={isPt ? "Trocar idioma de estudo" : "Change learning language"}
              >
                <Globe className="h-3.5 w-3.5 text-[#FF8A4D]" />
                <span>{isPt ? `Estudando: ${activeModule.name}` : `Learning: ${activeModule.name}`}</span>
                <ChevronDown className="h-3 w-3 text-[#9E8679]" />
              </button>

              {langMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setLangMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 z-50 w-56 rounded-2xl border border-[#EEDFD2] bg-[#FFFBF7] p-2 shadow-xl max-h-80 overflow-y-auto">
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#9E8679] border-b border-[#EEDFD2]/60">
                      {isPt ? 'Idioma de Estudo' : 'Learning Language'}
                    </div>
                    {Object.values(LANGUAGE_MODULES).map(mod => (
                      <button
                        key={mod.id}
                        type="button"
                        onClick={() => {
                          setLearningLanguage(mod.id);
                          setLangMenuOpen(false);
                        }}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors mt-1",
                          mod.id === activeLanguageID
                            ? "bg-[#FFEFE5] text-[#C85724] font-bold"
                            : "text-[#362A22] hover:bg-black/5"
                        )}
                      >
                        <span>{mod.name}</span>
                        {mod.id === activeLanguageID && <Check className="h-3.5 w-3.5 text-[#FF8A4D]" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <Link href={`/talk?theme=${encodeURIComponent(theme.id)}&tone=${selectedTone}&level=${userLevel}&lang=${activeLanguageID}`}>
              <Button size="sm" className="rounded-full bg-[#FF8A4D] hover:bg-[#F27835] text-white text-xs px-3.5 shadow-sm">
                <MessageSquare className="mr-1.5 h-3.5 w-3.5" /> {isPt ? 'Iniciar Conversa' : 'Start Conversation'}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 pt-6 space-y-6">
        {/* Theme Hero Banner */}
        <div className={cn("rounded-3xl border p-6 md:p-8 relative overflow-hidden transition-all shadow-sm", panelColor)}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-white/80 backdrop-blur p-4 shadow-sm border border-black/5 flex-shrink-0">
                <IconComponent className="h-8 w-8 text-[#FF8A4D]" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-black/60">
                    {theme.category}
                  </span>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-white/70 text-black/70">
                    Mural Active Theme
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#2B1F16]">
                  {theme.title}
                </h1>
                <p className="text-sm md:text-base font-medium text-black/75">
                  {theme.subtitle}
                </p>
                <p className="text-xs md:text-sm text-black/65 max-w-xl pt-1 leading-relaxed">
                  {theme.situation}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 self-start md:self-center flex-shrink-0">
              <Link href={`/talk?theme=${encodeURIComponent(theme.id)}&tone=${selectedTone}&level=${userLevel}&lang=${activeLanguageID}`}>
                <Button className="w-full sm:w-auto rounded-full bg-[#FF8A4D] hover:bg-[#F27835] text-white px-5 shadow-sm font-semibold text-xs">
                  <MessageSquare className="mr-1.5 h-4 w-4" /> {isPt ? 'Conversar por Voz (5 min)' : 'Talk with Voice (5 min)'}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* User Proficiency Level & Assessment Diagnostic */}
        <div className="rounded-3xl border border-[#EDE8DE] bg-white p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#9E8679] block">
                {isPt ? 'Nível de Proficiência & Nivelamento' : 'Proficiency Level & Placement'}
              </span>
              <p className="text-xs text-[#735A4A]">
                {isPt
                  ? 'Modifica a simulação de 5 minutos, pronúncia, escrita, vocabulário e flashcards.'
                  : 'Modulates 5-minute conversation steps, pronunciation, writing, vocabulary, and flashcards.'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAssessmentOpen(true)}
                className="rounded-full border-[#FF8A4D]/40 bg-[#FFF8F3] hover:bg-[#FFEFE5] text-[#C85724] text-xs font-bold shadow-2xs py-1 px-3.5"
              >
                <Sparkles className="mr-1.5 h-3.5 w-3.5 text-[#FF8A4D]" />
                {isPt ? 'Testar meu Nível (2 min)' : 'Test my Level (2 min)'}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              {
                id: 'beginner' as const,
                label: isPt ? 'Iniciante' : 'Beginner',
                badge: 'A1-A2',
                icon: '🌱',
                desc: isPt ? 'Frases curtas, essenciais e ritmo guiado' : 'Short, essential sentences & guided cadence',
              },
              {
                id: 'intermediate' as const,
                label: isPt ? 'Intermediário' : 'Intermediate',
                badge: 'B1-B2',
                icon: '🚀',
                desc: isPt ? 'Conectivos, diálogo fluido de 5 min e expressões comuns' : 'Connectors, fluid 5-min dialogue & idioms',
              },
              {
                id: 'advanced' as const,
                label: isPt ? 'Avançado' : 'Advanced',
                badge: 'C1-C2',
                icon: '✨',
                desc: isPt ? 'Discurso executivo, sutilezas e argumentação' : 'Executive discourse, nuances & persuasive debate',
              },
            ].map(lvl => {
              const isSelected = userLevel === lvl.id;
              return (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => handleLevelChange(lvl.id)}
                  className={cn(
                    "p-3 rounded-2xl border text-left transition-all relative flex flex-col justify-between",
                    isSelected
                      ? "border-[#FF8A4D] bg-[#FFF8F3] ring-2 ring-[#FF8A4D]/20 shadow-xs"
                      : "border-[#EFEAE1] bg-white hover:bg-[#FAF8F5]"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg">{lvl.icon}</span>
                    <span className={cn(
                      "text-[9px] font-bold px-1.5 py-0.2 rounded-full",
                      isSelected ? "bg-[#FF8A4D] text-white" : "bg-black/5 text-[#9E8679]"
                    )}>
                      {lvl.badge}
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className="text-xs font-bold block text-[#362A22]">{lvl.label}</span>
                    <span className="text-[10px] text-[#735A4A] line-clamp-2 leading-tight mt-0.5">
                      {lvl.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Conversation Tone / Context Mode Selector */}
        <div className="rounded-3xl border border-[#EDE8DE] bg-white p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#9E8679] block">
                {isPt ? 'Contexto & Tom da Conversa' : 'Conversation Context & Tone'}
              </span>
              <p className="text-xs text-[#735A4A]">
                {isPt ? 'Escolha a postura do assistente para esta sessão no Talk.' : 'Choose the assistant persona and conversational tone for this Talk session.'}
              </p>
            </div>
            <Badge className="bg-[#FFEFE5] text-[#C85724] border-[#FCD8C1] text-[10px] font-bold">
              {conversationTones.find(t => t.id === selectedTone)?.label} ({conversationTones.find(t => t.id === selectedTone)?.badge})
            </Badge>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {conversationTones.map(toneOpt => {
              const isSelected = selectedTone === toneOpt.id;
              return (
                <button
                  key={toneOpt.id}
                  type="button"
                  onClick={() => setSelectedTone(toneOpt.id)}
                  className={cn(
                    "p-3 rounded-2xl border text-left transition-all relative flex flex-col justify-between",
                    isSelected
                      ? "border-[#FF8A4D] bg-[#FFF8F3] ring-2 ring-[#FF8A4D]/20 shadow-xs"
                      : "border-[#EFEAE1] bg-white hover:bg-[#FAF8F5]"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg">{toneOpt.icon}</span>
                    <span className={cn(
                      "text-[9px] font-bold px-1.5 py-0.2 rounded-full",
                      isSelected ? "bg-[#FF8A4D] text-white" : "bg-black/5 text-[#9E8679]"
                    )}>
                      {toneOpt.badge}
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className="text-xs font-bold block text-[#362A22]">{toneOpt.label}</span>
                    <span className="text-[10px] text-[#735A4A] line-clamp-2 leading-tight mt-0.5">
                      {toneOpt.description}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Experience Tabs Navigation */}
        <div className="border-b border-[#EFEAE1] flex gap-1 overflow-x-auto pb-0.5 no-scrollbar">
          <button
            onClick={() => setActiveTab('pronunciation')}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 text-xs md:text-sm font-semibold rounded-t-xl transition-all whitespace-nowrap border-b-2",
              activeTab === 'pronunciation'
                ? "border-[#FF8A4D] text-[#FF8A4D] bg-white shadow-sm"
                : "border-transparent text-[#735A4A] hover:text-[#362A22] hover:bg-black/[0.02]"
            )}
          >
            <Mic className="h-4 w-4" />
            <span>{isPt ? 'Pronúncia (Speech)' : 'Pronunciation (Speech)'}</span>
            {Object.keys(pronCompleted).length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-[#FF8A4D]/10 text-[10px] text-[#FF8A4D]">
                {Object.keys(pronCompleted).length}/{pronunciationExercises.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('writing')}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 text-xs md:text-sm font-semibold rounded-t-xl transition-all whitespace-nowrap border-b-2",
              activeTab === 'writing'
                ? "border-[#FF8A4D] text-[#FF8A4D] bg-white shadow-sm"
                : "border-transparent text-[#735A4A] hover:text-[#362A22] hover:bg-black/[0.02]"
            )}
          >
            <BookOpen className="h-4 w-4" />
            <span>{isPt ? 'Escrita (Writing)' : 'Writing Practice'}</span>
            {Object.keys(writingScores).length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-[#FF8A4D]/10 text-[10px] text-[#FF8A4D]">
                {Object.keys(writingScores).length}/{writingExercises.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('vocabulary')}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 text-xs md:text-sm font-semibold rounded-t-xl transition-all whitespace-nowrap border-b-2",
              activeTab === 'vocabulary'
                ? "border-[#FF8A4D] text-[#FF8A4D] bg-white shadow-sm"
                : "border-transparent text-[#735A4A] hover:text-[#362A22] hover:bg-black/[0.02]"
            )}
          >
            <BookOpen className="h-4 w-4" />
            <span>{isPt ? `Vocabulário (${vocabWords.length})` : `Vocabulary (${vocabWords.length})`}</span>
          </button>

          <button
            onClick={() => setActiveTab('flashcards')}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 text-xs md:text-sm font-semibold rounded-t-xl transition-all whitespace-nowrap border-b-2",
              activeTab === 'flashcards'
                ? "border-[#FF8A4D] text-[#FF8A4D] bg-white shadow-sm"
                : "border-transparent text-[#735A4A] hover:text-[#362A22] hover:bg-black/[0.02]"
            )}
          >
            <Layers className="h-4 w-4" />
            <span>Flashcards</span>
          </button>

          <button
            onClick={() => setActiveTab('conversation')}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 text-xs md:text-sm font-semibold rounded-t-xl transition-all whitespace-nowrap border-b-2",
              activeTab === 'conversation'
                ? "border-[#FF8A4D] text-[#FF8A4D] bg-white shadow-sm"
                : "border-transparent text-[#735A4A] hover:text-[#362A22] hover:bg-black/[0.02]"
            )}
          >
            <MessageSquare className="h-4 w-4" />
            <span>{isPt ? 'Cenário & Metas' : 'Scenario & Goals'}</span>
          </button>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: PRONUNCIATION PRACTICE                                 */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'pronunciation' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h2 className="text-lg font-bold text-[#362A22]">
                  {isPt ? 'Simulação de Conversa de 5 Minutos (Pronúncia)' : '5-Minute Conversation Simulation (Pronunciation)'}
                </h2>
                <p className="text-xs text-[#735A4A]">
                  {isPt
                    ? 'Percorra as 4 etapas da conversa, ouça o modelo nativo e fale para calibrar sua fluência.'
                    : 'Walk through all 4 conversation phases, listen to native audio and speak to test your fluency.'}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-[#735A4A]">
                <span>
                  {isPt
                    ? `Etapa ${pronIdx + 1} de ${pronunciationExercises.length}`
                    : `Step ${pronIdx + 1} of ${pronunciationExercises.length}`}
                </span>
              </div>
            </div>

            {/* 5-Minute Conversation Step Navigation Pills */}
            <div className="rounded-2xl border border-[#EDE8DE] bg-[#FAF8F5] p-2.5 flex items-center justify-between gap-1.5 overflow-x-auto no-scrollbar shadow-2xs">
              {pronunciationExercises.map((ex, i) => {
                const isCurrent = i === pronIdx;
                const isDone = (pronCompleted[i] || 0) >= 70;
                return (
                  <button
                    key={ex.id || i}
                    type="button"
                    onClick={() => {
                      setPronIdx(i);
                      setSpokenTranscript(null);
                      setPronScore(null);
                      setWordResults([]);
                    }}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0",
                      isCurrent
                        ? "bg-[#FF8A4D] text-white shadow-xs"
                        : isDone
                        ? "bg-[#EFF7ED] text-[#2F6F38] border border-[#D6EBD4]"
                        : "bg-white text-[#735A4A] border border-[#EFEAE1] hover:bg-[#FAF8F5]"
                    )}
                  >
                    <span className="text-[10px] opacity-80">{i + 1}.</span>
                    <span>{ex.phaseRole || (isPt ? `Etapa ${i + 1}` : `Phase ${i + 1}`)}</span>
                    {isDone && <Check className="h-3 w-3 text-[#2F6F38]" />}
                  </button>
                );
              })}
            </div>

            {/* Pronunciation Target Card */}
            <div className="rounded-3xl border border-[#EDE8DE] bg-white p-6 md:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-[#F5F0E6] pb-4 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="rounded-full border-[#E5DECF] bg-[#FAF7F0] text-[11px] text-[#735A4A]">
                    {currentPron.stage || (isPt ? `Etapa ${pronIdx + 1} de 4` : `Step ${pronIdx + 1} of 4`)}
                  </Badge>
                  {currentPron.phaseRole && (
                    <Badge className="rounded-full bg-[#FFEFE5] text-[#C85724] border-[#FCD8C1] text-[10px] font-bold">
                      {currentPron.phaseRole}
                    </Badge>
                  )}
                  <Badge variant="outline" className="rounded-full border-[#E5DECF] bg-white text-[10px] text-[#9E8679]">
                    {isPt
                      ? `Nível: ${userLevel === 'beginner' ? 'Iniciante' : userLevel === 'intermediate' ? 'Intermediário' : 'Avançado'}`
                      : `Level: ${userLevel}`}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (pronIdx > 0) {
                        setPronIdx(prev => prev - 1);
                        setSpokenTranscript(null);
                        setPronScore(null);
                        setWordResults([]);
                      }
                    }}
                    disabled={pronIdx === 0}
                    className="rounded-full h-8 w-8 p-0"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (pronIdx < pronunciationExercises.length - 1) {
                        setPronIdx(prev => prev + 1);
                        setSpokenTranscript(null);
                        setPronScore(null);
                        setWordResults([]);
                      }
                    }}
                    disabled={pronIdx === pronunciationExercises.length - 1}
                    className="rounded-full h-8 w-8 p-0"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Target Phrase Display */}
              <div className="space-y-2 text-center py-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#9E8270]">
                  {isPt ? `Frase Alvo (${activeModule.name})` : `Target Phrase (${activeModule.name})`}
                </p>
                <h3 className="text-2xl md:text-3xl font-extrabold text-[#2B1F16] leading-snug">
                  {currentPron.phrase}
                </h3>
                <p className="text-sm font-medium text-[#735A4A]">
                  "{currentPron.meaning}"
                </p>
                {currentPron.tip && (
                  <p className="text-xs text-[#A86438] bg-[#FFF8F3] border border-[#FDE5D4] rounded-full px-4 py-1.5 inline-block mx-auto mt-2">
                    💡 {isPt ? `Dica de pronúncia: ${currentPron.tip}` : `Pronunciation tip: ${currentPron.tip}`}
                  </p>
                )}
              </div>

              {/* Audio & Mic Action Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Button
                  variant="outline"
                  onClick={() => playTextAudio(currentPron.phrase)}
                  disabled={playingAudio === currentPron.phrase}
                  className="rounded-full px-5 py-5 border-[#E6DFD3] hover:bg-[#F9F5EE] text-xs font-semibold text-[#362A22]"
                >
                  <Volume2 className={cn("mr-2 h-4 w-4 text-[#FF8A4D]", playingAudio === currentPron.phrase && "animate-pulse")} />
                  {playingAudio === currentPron.phrase
                    ? (isPt ? 'Reproduzindo...' : 'Playing...')
                    : (isPt ? 'Ouvir Modelo Nativo' : 'Listen to Native Audio')}
                </Button>

                {!isRecording ? (
                  <Button
                    onClick={startPronunciationRecording}
                    className="rounded-full px-6 py-5 bg-[#FF8A4D] hover:bg-[#F27835] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
                  >
                    <Mic className="mr-2 h-4 w-4" />
                    {isPt ? 'Falar Frase (Gravar)' : 'Speak Phrase (Record)'}
                  </Button>
                ) : (
                  <Button
                    onClick={stopPronunciationRecording}
                    className="rounded-full px-6 py-5 bg-[#E64833] hover:bg-[#D43D28] text-white text-xs font-bold animate-pulse shadow-md"
                  >
                    <MicOff className="mr-2 h-4 w-4" />
                    {isPt ? 'Ouvindo... Clique para avaliar' : 'Listening... Click to evaluate'}
                  </Button>
                )}
              </div>

              {/* Evaluation & Word-by-Word Breakdown */}
              {spokenTranscript && (
                <div className="rounded-2xl border border-[#EFEAE1] bg-[#FCFBF7] p-5 space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#735A4A]">
                        {isPt ? 'Precisão da Pronúncia:' : 'Pronunciation Accuracy:'}
                      </span>
                      <span className={cn(
                        "text-sm font-extrabold px-2.5 py-0.5 rounded-full",
                        (pronScore || 0) >= 80 ? "bg-emerald-100 text-emerald-800" :
                        (pronScore || 0) >= 50 ? "bg-amber-100 text-amber-800" :
                        "bg-orange-100 text-orange-800"
                      )}>
                        {pronScore}%
                      </span>
                    </div>

                    <span className="text-xs font-medium text-[#735A4A]">
                      {(pronScore || 0) >= 85
                        ? (isPt ? '🌟 Excelente pronúncia!' : '🌟 Excellent pronunciation!')
                        : (pronScore || 0) >= 60
                        ? (isPt ? '👍 Muito bom! Quase lá.' : '👍 Very good! Almost there.')
                        : (isPt ? '🌱 Continue praticando!' : '🌱 Keep practicing!')}
                    </span>
                  </div>

                  {/* Word-by-word visual inspection */}
                  {wordResults.length > 0 && (
                    <div className="space-y-1.5">
                      <p className="text-[11px] font-semibold text-[#8C7362] uppercase tracking-wider">
                        {isPt ? 'Palavras identificadas:' : 'Identified words:'}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {wordResults.map((item, idx) => (
                          <span
                            key={idx}
                            className={cn(
                              "text-xs font-semibold px-2.5 py-1 rounded-lg border",
                              item.matched
                                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                                : "bg-amber-50 border-amber-200 text-amber-800"
                            )}
                          >
                            {item.word} {item.matched ? '✓' : '•'}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="border-t border-[#F0EBE1] pt-3 text-xs text-[#735A4A]">
                    <span className="font-semibold text-[#362A22]">
                      {isPt ? 'O que ouvimos: ' : 'What we heard: '}
                    </span>
                    <span className="italic">"{spokenTranscript}"</span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Progress Bar */}
            <div className="rounded-2xl border border-[#F0EBE1] bg-[#FCFBF7] p-4 flex items-center justify-between text-xs">
              <span className="text-[#735A4A]">
                {isPt
                  ? `Progresso: ${Object.keys(pronCompleted).length} de ${pronunciationExercises.length} frases praticadas`
                  : `Progress: ${Object.keys(pronCompleted).length} of ${pronunciationExercises.length} phrases practiced`}
              </span>
              {pronIdx < pronunciationExercises.length - 1 ? (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setPronIdx(prev => prev + 1);
                    setSpokenTranscript(null);
                    setPronScore(null);
                    setWordResults([]);
                  }}
                  className="rounded-full text-[#FF8A4D] hover:text-[#F27835] hover:bg-[#FF8A4D]/10 text-xs font-bold"
                >
                  {isPt ? 'Próxima Frase' : 'Next Phrase'} <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={() => setActiveTab('writing')}
                  className="rounded-full bg-[#FF8A4D] text-white hover:bg-[#F27835] text-xs font-bold"
                >
                  {isPt ? 'Ir para Escrita' : 'Go to Writing'} <ChevronRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: WRITING PRACTICE                                       */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'writing' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#362A22]">
                  {isPt ? 'Prática de Escrita' : 'Writing Practice'}
                </h2>
                <p className="text-xs text-[#735A4A]">
                  {isPt
                    ? 'Responda aos desafios no idioma de destino. Use a barra de acentos para caracteres especiais.'
                    : 'Answer challenges in the target language. Use the accent toolbar for special characters.'}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-[#735A4A]">
                <span>
                  {isPt
                    ? `Exercício ${writingIdx + 1} de ${writingExercises.length}`
                    : `Exercise ${writingIdx + 1} of ${writingExercises.length}`}
                </span>
              </div>
            </div>

            {/* Exercise Card */}
            <div className="rounded-3xl border border-[#EDE8DE] bg-white p-6 md:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-[#F5F0E6] pb-3">
                <Badge variant="outline" className="rounded-full border-[#E5DECF] bg-[#FAF7F0] text-[11px] text-[#735A4A]">
                  {currentWriting.type === 'translate'
                    ? (isPt ? 'Tradução' : 'Translation')
                    : currentWriting.type === 'fill-blank'
                    ? (isPt ? 'Preencha a Lacuna' : 'Fill in the Blank')
                    : (isPt ? 'Resposta Contextual' : 'Contextual Reply')}
                </Badge>
                {currentWriting.hint && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowWritingHint(!showWritingHint)}
                    className="h-7 text-xs text-[#9E8270] hover:text-[#362A22]"
                  >
                    <HelpCircle className="mr-1 h-3.5 w-3.5" />
                    {showWritingHint ? (isPt ? 'Ocultar Dica' : 'Hide Hint') : (isPt ? 'Ver Dica' : 'View Hint')}
                  </Button>
                )}
              </div>

              {/* Context and Prompt */}
              <div className="space-y-3">
                {currentWriting.context && (
                  <p className="text-xs font-medium text-[#8C7362] bg-[#FAF7F0] p-3 rounded-xl border border-[#EFEAE1]">
                    💬 {currentWriting.context}
                  </p>
                )}
                <h3 className="text-xl md:text-2xl font-bold text-[#2B1F16]">
                  {currentWriting.prompt}
                </h3>
                {showWritingHint && currentWriting.hint && (
                  <p className="text-xs font-medium text-[#A05C2B] bg-[#FFF8F3] border border-[#FDE5D4] p-3 rounded-xl">
                    💡 {isPt ? `Dica: ${currentWriting.hint}` : `Hint: ${currentWriting.hint}`}
                  </p>
                )}
              </div>

              {/* Special Characters Toolbar */}
              {languageAccents.length > 0 && (
                <div className="space-y-1.5 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-[#8C7362] uppercase tracking-wider">
                      {isPt ? 'Caracteres rápidos:' : 'Special characters:'}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {languageAccents.map((char, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => insertAccent(char)}
                        className="rounded-lg border border-[#EAE3D5] bg-[#FDFBF7] px-2.5 py-1 text-xs font-bold text-[#362A22] hover:bg-[#FF8A4D]/10 hover:border-[#FF8A4D] transition-colors"
                      >
                        {char}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Text Input Field */}
              <div className="space-y-3">
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={userWritingInput}
                    onChange={e => setUserWritingInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        handleCheckWriting();
                      }
                    }}
                    placeholder={isPt ? `Escreva em ${activeModule.nativeName}...` : `Type in ${activeModule.nativeName}...`}
                    disabled={writingFeedback === 'correct'}
                    className={cn(
                      "w-full rounded-2xl border px-4 py-3.5 text-sm md:text-base outline-none transition-all",
                      writingFeedback === 'correct'
                        ? "border-emerald-400 bg-emerald-50/50 text-emerald-950 font-medium"
                        : writingFeedback === 'incorrect'
                        ? "border-amber-400 bg-amber-50/40 text-amber-950"
                        : "border-[#DFD7C8] bg-white focus:border-[#FF8A4D] focus:ring-2 focus:ring-[#FF8A4D]/10"
                    )}
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="text-xs text-[#8C7362]">
                    {isPt ? 'Pressione' : 'Press'}{' '}
                    <kbd className="px-1.5 py-0.5 rounded bg-black/5 font-mono text-[10px]">Enter ↵</kbd>{' '}
                    {isPt ? 'para enviar' : 'to submit'}
                  </div>

                  {writingFeedback !== 'correct' ? (
                    <Button
                      onClick={handleCheckWriting}
                      disabled={!userWritingInput.trim()}
                      className="rounded-full bg-[#FF8A4D] hover:bg-[#F27835] text-white text-xs font-bold px-5"
                    >
                      <Send className="mr-1.5 h-3.5 w-3.5" />
                      {isPt ? 'Verificar Resposta' : 'Check Answer'}
                    </Button>
                  ) : (
                    <Button
                      onClick={nextWritingExercise}
                      className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5"
                    >
                      {writingIdx < writingExercises.length - 1
                        ? (isPt ? 'Próximo Desafio' : 'Next Challenge')
                        : (isPt ? 'Concluir' : 'Finish')}{' '}
                      <ChevronRight className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Feedback Alert */}
              {writingFeedback === 'correct' && (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 space-y-2 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    {isPt ? 'Excelente! Resposta correta e natural.' : 'Excellent! Natural and accurate answer.'}
                  </div>
                  <p className="text-xs text-emerald-900 leading-relaxed">
                    {currentWriting.explanation}
                  </p>
                </div>
              )}

              {writingFeedback === 'incorrect' && (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                    <AlertCircle className="h-5 w-5 text-amber-700" />
                    {isPt ? 'Quase lá! Veja a resposta esperada:' : 'Almost there! Here is the expected answer:'}
                  </div>
                  <div className="text-xs text-amber-950 space-y-1">
                    <p className="font-semibold text-amber-900">
                      {isPt ? 'Esperado: ' : 'Expected: '}
                      <span className="underline font-bold">{currentWriting.acceptedAnswers[0]}</span>
                    </p>
                    <p className="text-[11px] text-amber-800 leading-relaxed">
                      {currentWriting.explanation}
                    </p>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setUserWritingInput('');
                        setWritingFeedback('idle');
                      }}
                      className="rounded-full text-xs border-amber-300 text-amber-900 hover:bg-amber-100"
                    >
                      {isPt ? 'Tentar Novamente' : 'Try Again'}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={nextWritingExercise}
                      className="rounded-full text-xs text-amber-900 hover:bg-amber-100"
                    >
                      {isPt ? 'Pular Exercício' : 'Skip Exercise'}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Progress Bar */}
            <div className="rounded-2xl border border-[#F0EBE1] bg-[#FCFBF7] p-4 flex items-center justify-between text-xs">
              <span className="text-[#735A4A]">
                {isPt
                  ? `Progresso: ${Object.keys(writingScores).length} de ${writingExercises.length} exercícios completados`
                  : `Progress: ${Object.keys(writingScores).length} of ${writingExercises.length} exercises completed`}
              </span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setActiveTab('vocabulary')}
                className="rounded-full text-[#FF8A4D] hover:text-[#F27835] hover:bg-[#FF8A4D]/10 text-xs font-bold"
              >
                {isPt ? 'Ver Vocabulário' : 'View Vocabulary'} <ChevronRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 3: VOCABULARY LIBRARY                                     */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'vocabulary' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#362A22]">
                  {isPt ? 'Vocabulário do Tema' : 'Theme Vocabulary'}
                </h2>
                <p className="text-xs text-[#735A4A]">
                  {isPt
                    ? 'Palavras e expressões essenciais para conversar sobre este tópico com confiança.'
                    : 'Essential words and phrases to talk about this topic with confidence.'}
                </p>
              </div>
              <Link href={`/words?theme=${encodeURIComponent(theme.id)}`}>
                <Button size="sm" variant="outline" className="rounded-full text-xs border-[#E6DFD3] text-[#735A4A] hover:text-[#362A22]">
                  {isPt ? 'Abrir no Lexicon Completo' : 'Open in Full Lexicon'} <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </div>

            <div className="grid gap-3">
              {vocabWords.map((word) => (
                <div
                  key={word.id}
                  className="rounded-2xl border border-[#EFEAE1] bg-white p-4 transition-all hover:border-[#E5DEC7] hover:shadow-sm flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-base font-bold text-[#2B1F16]">{word.term}</h4>
                      {word.partOfSpeech && (
                        <Badge variant="outline" className="rounded-full border-[#E8DFD1] bg-[#FAF8F5] text-[10px] text-[#8C7362]">
                          {word.partOfSpeech}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs font-medium text-[#735A4A]">{word.meaning}</p>
                    {word.example && (
                      <p className="text-xs text-[#8C7362] italic pt-1 border-t border-[#F5F0E6] mt-1.5">
                        "{word.example}"
                      </p>
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => playTextAudio(word.term)}
                    disabled={playingAudio === word.term}
                    className="rounded-full h-9 w-9 p-0 text-[#FF8A4D] hover:bg-[#FF8A4D]/10 flex-shrink-0"
                    title={isPt ? "Ouvir pronúncia" : "Listen to pronunciation"}
                  >
                    <Volume2 className={cn("h-4 w-4", playingAudio === word.term && "animate-pulse")} />
                  </Button>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-[#F0EBE1] bg-[#FCFBF7] p-4 flex items-center justify-between text-xs">
              <span className="text-[#735A4A]">
                {isPt ? 'Pronto para testar a sua memória com estes termos?' : 'Ready to test your memory with these words?'}
              </span>
              <Button
                size="sm"
                onClick={() => setActiveTab('flashcards')}
                className="rounded-full bg-[#FF8A4D] hover:bg-[#F27835] text-white text-xs font-bold"
              >
                {isPt ? 'Praticar Flashcards' : 'Practice Flashcards'} <ChevronRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 4: FLASHCARDS PRACTICE                                    */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'flashcards' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#362A22]">
                  {isPt ? 'Cartões de Memória (Flashcards)' : 'Flashcards'}
                </h2>
                <p className="text-xs text-[#735A4A]">
                  {isPt
                    ? 'Pratique recall ativo com repetição espaçada. Vire o cartão para ver a tradução e exemplo.'
                    : 'Practice active recall with spaced repetition. Flip the card to see the translation and example.'}
                </p>
              </div>
              <Link href={`/flashcards?theme=${encodeURIComponent(theme.id)}`}>
                <Button size="sm" variant="outline" className="rounded-full text-xs border-[#E6DFD3] text-[#735A4A] hover:text-[#362A22]">
                  {isPt ? 'Modo Imersivo' : 'Immersive Mode'} <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </div>

            {/* In-page 3D Flashcard */}
            {currentCard && (
              <div className="space-y-4">
                <div
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="cursor-pointer select-none rounded-3xl border border-[#EDE8DE] bg-white p-8 md:p-12 text-center shadow-sm hover:shadow-md transition-all min-h-[220px] flex flex-col items-center justify-center relative group"
                >
                  <span className="absolute top-4 right-4 text-[10px] uppercase tracking-wider text-[#9E8270] flex items-center gap-1 font-semibold">
                    <RotateCw className="h-3 w-3 group-hover:rotate-180 transition-transform duration-300" />
                    {isPt ? 'Clique para virar' : 'Click to flip'}
                  </span>

                  {!isFlipped ? (
                    <div className="space-y-3">
                      <Badge variant="outline" className="rounded-full border-[#E8DFD1] bg-[#FAF8F5] text-[11px] text-[#8C7362]">
                        {currentCard.partOfSpeech || (isPt ? 'palavra' : 'word')}
                      </Badge>
                      <h3 className="text-3xl md:text-4xl font-extrabold text-[#2B1F16]">
                        {currentCard.term}
                      </h3>
                      <p className="text-xs text-[#A89080]">
                        {isPt ? 'Como você traduziria este termo?' : 'How would you translate this term?'}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3 animate-in fade-in duration-200">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#FF8A4D]">
                        {isPt ? 'Significado' : 'Meaning'}
                      </span>
                      <h4 className="text-2xl md:text-3xl font-bold text-[#362A22]">
                        {currentCard.meaning}
                      </h4>
                      {currentCard.example && (
                        <p className="text-xs text-[#735A4A] italic max-w-md pt-2 border-t border-[#F5F0E6]">
                          "{currentCard.example}"
                        </p>
                      )}
                    </div>
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      playTextAudio(currentCard.term);
                    }}
                    className="absolute bottom-4 left-4 rounded-full h-8 w-8 p-0 text-[#FF8A4D] hover:bg-[#FF8A4D]/10"
                    title={isPt ? "Ouvir pronúncia" : "Listen to pronunciation"}
                  >
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Rating Buttons */}
                <div className="flex items-center justify-between gap-3 pt-2">
                  <div className="text-xs text-[#735A4A]">
                    {isPt
                      ? `Cartão ${flashcardIdx + 1} de ${vocabWords.length}`
                      : `Card ${flashcardIdx + 1} of ${vocabWords.length}`}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleScoreCard(false)}
                      className="rounded-full border-[#F7D4C8] bg-[#FFF5F2] hover:bg-[#FFEAE4] text-[#A0451A] text-xs font-bold px-4"
                    >
                      {isPt ? 'Ainda Aprendendo' : 'Still Learning'}
                    </Button>
                    <Button
                      onClick={() => handleScoreCard(true)}
                      className="rounded-full bg-[#FF8A4D] hover:bg-[#F27835] text-white text-xs font-bold px-5"
                    >
                      {isPt ? 'Acertei! ✓' : 'Got it! ✓'}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 5: CONVERSATION BRIEFING & GOALS                          */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'conversation' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#362A22]">
                  {isPt ? 'Briefing do Cenário' : 'Scenario Briefing'}
                </h2>
                <p className="text-xs text-[#735A4A]">
                  {isPt
                    ? 'Prepare-se para conversar com voz natural. Veja o diálogo de introdução e as metas da sessão.'
                    : 'Get ready to talk with natural voice. Review the starter dialogue and session goals.'}
                </p>
              </div>
            </div>

            {/* Scenario Dialogue Card */}
            <div className="rounded-3xl border border-[#EDE8DE] bg-white p-6 md:p-8 shadow-sm space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#9E8270]">
                  {isPt ? 'Diálogo Inicial Sugerido' : 'Suggested Starter Dialogue'}
                </span>
                <div className="space-y-3 pt-2">
                  <div className="rounded-2xl bg-[#FCFBF7] border border-[#EFEAE1] p-4 space-y-1">
                    <span className="text-[10px] font-bold text-[#FF8A4D] uppercase">Mural (Assistant)</span>
                    <p className="text-sm font-bold text-[#2B1F16]">
                      "{experience.starterAssistant}"
                    </p>
                    <p className="text-xs text-[#735A4A]">
                      {experience.starterMeaning}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#FFF8F3] border border-[#FDE5D4] p-4 space-y-1">
                    <span className="text-[10px] font-bold text-[#A0451A] uppercase">
                      {isPt ? 'Sua Resposta Sugerida' : 'Your Suggested Reply'}
                    </span>
                    <p className="text-sm font-bold text-[#2B1F16]">
                      "{experience.starterUser}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Learning Objectives */}
              <div className="space-y-2 pt-2 border-t border-[#F5F0E6]">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#9E8270]">
                  {isPt ? 'Metas para esta Conversa' : 'Goals for this Conversation'}
                </span>
                <ul className="grid gap-2 pt-1">
                  {experience.objectives.map((obj, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-[#362A22]">
                      <CheckCircle2 className="h-4 w-4 text-[#FF8A4D] flex-shrink-0" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Big CTA with Selected Tone */}
              <div className="pt-4 flex flex-col items-center gap-2">
                <Link href={`/talk?theme=${encodeURIComponent(theme.id)}&tone=${selectedTone}&level=${userLevel}&lang=${activeLanguageID}`}>
                  <Button size="lg" className="rounded-full bg-[#FF8A4D] hover:bg-[#F27835] text-white px-8 py-6 text-sm font-bold shadow-md hover:shadow-lg transition-all">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    {isPt
                      ? `Iniciar Conversa de 5 min no Modo ${conversationTones.find(t => t.id === selectedTone)?.label} (${userLevel === 'beginner' ? 'Iniciante' : userLevel === 'intermediate' ? 'Intermediário' : 'Avançado'})`
                      : `Start 5-min Conversation in ${conversationTones.find(t => t.id === selectedTone)?.label} Mode (${userLevel})`}
                  </Button>
                </Link>
                <span className="text-[11px] text-[#9E8679]">
                  {isPt ? 'Tom ativo: ' : 'Active tone: '}
                  {conversationTones.find(t => t.id === selectedTone)?.icon}{' '}
                  {conversationTones.find(t => t.id === selectedTone)?.description}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Placement Assessment Diagnostic Modal */}
        <LevelAssessmentModal
          isOpen={assessmentOpen}
          onClose={() => setAssessmentOpen(false)}
          languageID={activeLanguageID}
          meaningLanguage={meaningLanguage}
          currentLevel={userLevel}
          onLevelSelected={handleLevelChange}
        />
      </div>
    </div>
  );
}

export default function ThemeDetailPage({ params }: PageProps) {
  const { themeId } = use(params);

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FFFDF9] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF8A4D]" />
      </div>
    }>
      <ThemeDetailContent themeId={themeId} />
    </Suspense>
  );
}
