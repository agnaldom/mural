'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
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
  ArrowUpRight,
  X,
  MessageSquare,
  BookOpen,
  Layers,
  Sparkles,
  Mic,
  PenTool,
  ChevronRight,
  CalendarCheck,
  UserCheck,
  Rocket,
  Scale,
  Phone,
  Laptop,
  Shuffle,
  Award,
  Presentation,
  Lightbulb,
  Plane,
  Key,
  Building,
  Activity,
  AlertCircle,
  MapPin,
  Smile,
  Palette,
  Heart,
  Moon,
  Timer,
  Target,
  HelpCircle,
  ShieldAlert,
  Check,
  Globe,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useArchiveStore } from '@/lib/storage/archive-store';
import { UserProficiencyLevel } from '@/types/learning';
import { LevelAssessmentModal } from '@/components/themes/level-assessment-modal';
import { LANGUAGE_MODULES } from '@/lib/languages/registry';
import {
  getThemesForLanguage,
  ConversationTheme,
  THEME_PACKS,
  getThemePacks,
  THEME_PORTUGUESE_CATEGORIES,
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
  'arrow-up-right': ArrowUpRight,
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
  'bg-[#FFEFE5] border-[#FCD8C1]', // 0: Peach
  'bg-[#F2EFFF] border-[#DFDAFA]', // 1: Lilac
  'bg-[#EFF7ED] border-[#D6EBD4]', // 2: Sage
  'bg-[#FFF6DC] border-[#FAE8B2]', // 3: Butter
];

export default function ThemesPage() {
  const router = useRouter();
  const { activeLanguageID, setLearningLanguage, setLanguageLevel, loadArchive, archive } = useArchiveStore();

  useEffect(() => {
    loadArchive();
  }, [loadArchive]);

  const meaningLanguage = archive.preferences?.meaningLanguage || 'Portuguese';
  const isPt = meaningLanguage === 'Portuguese';

  const langKey = activeLanguageID?.split('-')[0]?.toLowerCase() || 'en';
  const hasLevelSet = !!archive.preferences?.languageLevels?.[langKey];
  const userLevel: UserProficiencyLevel = archive.preferences?.languageLevels?.[langKey] || 'beginner';

  const activeModule = LANGUAGE_MODULES[activeLanguageID] || LANGUAGE_MODULES['en'];

  const [search, setSearch] = useState('');
  const [selectedPack, setSelectedPack] = useState('All');
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [levelMenuOpen, setLevelMenuOpen] = useState(false);
  const [assessmentOpen, setAssessmentOpen] = useState(false);

  const themes = useMemo(() => {
    return getThemesForLanguage(activeLanguageID, meaningLanguage);
  }, [activeLanguageID, meaningLanguage]);

  const packs = useMemo(() => getThemePacks(meaningLanguage), [meaningLanguage]);

  const filteredThemes = useMemo(() => {
    return themes.filter(t => {
      const matchesPack =
        selectedPack === 'All' ||
        t.category === selectedPack ||
        t.category === THEME_PORTUGUESE_CATEGORIES[selectedPack];
      const matchesSearch =
        search.trim() === '' ||
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.subtitle.toLowerCase().includes(search.toLowerCase()) ||
        t.situation.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase());
      return matchesPack && matchesSearch;
    });
  }, [themes, selectedPack, search]);

  const handleCardClick = (theme: ConversationTheme) => {
    router.push(`/themes/${encodeURIComponent(theme.id)}`);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6 pb-28 space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9E8679]" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={isPt ? "Buscar um tema de conversa (ex: standup, aeroporto, entrevista, café)..." : "Find a conversation theme (e.g. standup, airport, interview, coffee)..."}
          className="w-full h-12 pl-11 pr-10 rounded-full border border-[#EEDFD2] bg-white/80 focus:bg-white text-sm text-[#362A22] placeholder:text-[#9E8679] shadow-sm transition-all outline-none focus:ring-2 focus:ring-[#FF8A4D]/30"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9E8679] hover:text-[#362A22]"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Header Eyebrow & Title */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-widest text-[#9E8679]">
            {isPt ? 'Coleções Curadas de Temas' : 'Curated Conversation Packs'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#362A22] leading-tight">
            {isPt ? (
              <>
                O que você quer<br />conversar hoje?
              </>
            ) : (
              <>
                What&apos;s on<br />your mind?
              </>
            )}
          </h1>
          <p className="text-sm sm:text-base text-[#735A4A] mt-1 font-normal">
            {isPt
              ? `Pratique fala, pronúncia, escrita e vocabulário com temas autênticos em ${activeModule.name}.`
              : `Practice speaking, pronunciation, writing, and vocabulary with authentic themes in ${activeModule.name}.`}
          </p>
        </div>

        {/* Language & Level Controls */}
        <div className="flex items-center gap-2 flex-wrap self-start pt-1">
          {/* Level Switcher & Placement trigger */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLevelMenuOpen(!levelMenuOpen)}
              className="flex items-center space-x-1.5 rounded-full border border-[#E8DFD1] bg-white/90 hover:bg-white px-3 py-1.5 text-xs font-bold text-[#362A22] transition-all shadow-sm"
              title={isPt ? "Alterar nível de proficiência" : "Change proficiency level"}
            >
              <span>{userLevel === 'beginner' ? '🌱' : userLevel === 'intermediate' ? '🚀' : '✨'}</span>
              <span>{userLevel === 'beginner' ? (isPt ? 'Iniciante' : 'Beginner') : userLevel === 'intermediate' ? (isPt ? 'Intermediário' : 'Intermediate') : (isPt ? 'Avançado' : 'Advanced')}</span>
              <ChevronDown className="h-3 w-3 text-[#9E8679]" />
            </button>

            {levelMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setLevelMenuOpen(false)} />
                <div className="absolute right-0 mt-2 z-50 w-56 rounded-2xl border border-[#EEDFD2] bg-[#FFFBF7] p-2 shadow-xl">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#9E8679] border-b border-[#EEDFD2]/60">
                    {isPt ? 'Nível de Proficiência' : 'Proficiency Level'}
                  </div>
                  {(['beginner', 'intermediate', 'advanced'] as UserProficiencyLevel[]).map(lvl => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => {
                        setLanguageLevel(activeLanguageID, lvl);
                        setLevelMenuOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors mt-1",
                        lvl === userLevel
                          ? "bg-[#FFEFE5] text-[#C85724] font-bold"
                          : "text-[#362A22] hover:bg-black/5"
                      )}
                    >
                      <span>
                        {lvl === 'beginner' ? (isPt ? '🌱 Iniciante (A1-A2)' : '🌱 Beginner (A1-A2)') : lvl === 'intermediate' ? (isPt ? '🚀 Intermediário (B1-B2)' : '🚀 Intermediate (B1-B2)') : (isPt ? '✨ Avançado (C1-C2)' : '✨ Advanced (C1-C2)')}
                      </span>
                      {lvl === userLevel && <Check className="h-3.5 w-3.5 text-[#FF8A4D]" />}
                    </button>
                  ))}
                  <div className="pt-2 mt-1 border-t border-[#EEDFD2]/60">
                    <button
                      type="button"
                      onClick={() => {
                        setLevelMenuOpen(false);
                        setAssessmentOpen(true);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-[#FF8A4D] hover:bg-[#FFEFE5] transition-colors flex items-center gap-1.5"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>{isPt ? 'Testar meu Nível (2 min)' : 'Test my Level (2 min)'}</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Quick Language Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center space-x-1.5 rounded-full border border-[#E8DFD1] bg-white/90 hover:bg-white px-3.5 py-1.5 text-xs font-bold text-[#362A22] transition-all shadow-sm"
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
                    {isPt ? 'Idioma de Estudo' : 'Select Learning Language'}
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
        </div>
      </div>

      {/* Diagnostic Assessment Invitation Banner (if not yet tested) */}
      {!hasLevelSet && (
        <div className="rounded-3xl border border-[#FCD8C1] bg-[#FFF8F3] p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in duration-300">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#FFEFE5] text-xl shadow-inner">
              🎯
            </span>
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-[#2B1F16]">
                {isPt
                  ? `Novo em ${activeModule.name}? Faça um teste rápido de 2 minutos!`
                  : `New to ${activeModule.name}? Take a quick 2-minute diagnostic test!`}
              </h3>
              <p className="text-xs text-[#735A4A]">
                {isPt
                  ? 'Personalize todas as conversas de 5 min, exercícios de pronúncia, escrita e vocabulário para o seu nível real.'
                  : 'Customize all 5-minute conversation phases, pronunciation, writing, and vocabulary to your level.'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            <Button
              onClick={() => setAssessmentOpen(true)}
              className="rounded-full bg-[#FF8A4D] hover:bg-[#F27835] text-white text-xs font-bold px-4 py-2 shadow-xs w-full sm:w-auto"
            >
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              {isPt ? 'Fazer Teste (2 min)' : 'Take Test (2 min)'}
            </Button>
            <Button
              variant="outline"
              onClick={() => setLanguageLevel(activeLanguageID, 'beginner')}
              className="rounded-full border-[#E5DECF] bg-white text-[#735A4A] text-xs font-semibold px-3 py-2 w-full sm:w-auto hover:bg-[#FAF7F0]"
            >
              {isPt ? 'Iniciar como Iniciante' : 'Start as Beginner'}
            </Button>
          </div>
        </div>
      )}

      {/* Hero Quick Action: "Just talk ↗" */}
      <button
        onClick={() => router.push('/talk')}
        className="w-full flex items-center justify-between p-5 rounded-3xl border border-[#EEDFD2] bg-white/90 hover:bg-white text-[#362A22] shadow-sm hover:shadow-md transition-all group"
      >
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-[#FFEFE5] text-[#FF8A4D] rounded-2xl group-hover:scale-105 transition-transform">
            <Sparkles className="h-6 w-6 stroke-[1.8]" />
          </div>
          <div>
            <span className="text-base sm:text-lg font-bold block text-left">
              {isPt ? 'Apenas conversar' : 'Just talk'}
            </span>
            <span className="text-xs text-[#735A4A] font-normal block text-left">
              {isPt ? 'Conversa aberta sem tópico fixo' : 'Open conversation with no fixed topic'}
            </span>
          </div>
        </div>
        <ArrowUpRight className="h-5 w-5 text-[#9E8679] group-hover:text-[#362A22] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </button>

      {/* Packs Horizontal Carousel */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#9E8679]">
            {isPt ? 'Filtrar por Coleção' : 'Filter by Collection'}
          </span>
          <span className="text-xs text-[#9E8679]">
            {filteredThemes.length} {filteredThemes.length === 1 ? (isPt ? 'tema' : 'theme') : (isPt ? 'temas' : 'themes')}
          </span>
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {packs.map(pack => {
            const isSelected = selectedPack === pack.id;
            const count = pack.id === 'All' ? themes.length : themes.filter(t => t.category === pack.id).length;

            return (
              <button
                key={pack.id}
                onClick={() => setSelectedPack(pack.id)}
                className={cn(
                  'flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-sm',
                  isSelected
                    ? 'bg-[#FFEFE5] text-[#C85724] border border-[#FCD8C1] shadow-xs'
                    : 'bg-white/80 hover:bg-white text-[#735A4A] border border-[#EEDFD2]'
                )}
              >
                <span>{pack.icon}</span>
                <span>{pack.title}</span>
                <span className={cn(
                  "text-[10px] px-1.5 py-0.2 rounded-full",
                  isSelected ? "bg-[#FF8A4D]/20 text-[#A0451A]" : "bg-black/5 text-[#9E8679]"
                )}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Themes Grid */}
      {filteredThemes.length === 0 ? (
        <div className="text-center py-12 p-8 rounded-3xl border border-[#EEDFD2] bg-white/60">
          <p className="text-sm font-bold text-[#362A22]">No matching themes found</p>
          <p className="text-xs text-[#735A4A] mt-1">
            Try a different search keyword or category pack.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredThemes.map(theme => {
            const Icon = THEME_ICONS[theme.symbol] || Sparkles;
            const panelColor = PANEL_COLORS[theme.colorIndex % PANEL_COLORS.length];

            return (
              <div
                key={theme.id}
                onClick={() => handleCardClick(theme)}
                className={cn(
                  'cursor-pointer flex flex-col justify-between p-5 rounded-3xl border shadow-sm hover:shadow-md transition-all group relative',
                  panelColor
                )}
              >
                {/* Header: Icon, Category Badge & Title */}
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="text-[#735A4A] group-hover:text-[#362A22] transition-colors p-2 bg-white/75 rounded-2xl shadow-xs">
                      <Icon className="h-5 w-5 stroke-[1.8] text-[#FF8A4D]" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Badge className="bg-white/80 text-[#735A4A] border-[#EEDFD2] text-[10px] font-bold">
                        {theme.category}
                      </Badge>
                      <span className="p-1 text-[#9E8679] group-hover:text-[#FF8A4D] transition-colors">
                        <ChevronRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#362A22] group-hover:text-[#FF8A4D] transition-colors leading-snug">
                    {theme.title}
                  </h3>
                  <p className="text-xs text-[#735A4A] mt-1 font-medium">
                    {theme.subtitle}
                  </p>
                  <p className="text-[11px] text-[#9E8679] mt-2 line-clamp-2 leading-relaxed">
                    {theme.situation}
                  </p>
                </div>

                {/* Sub-actions per Theme */}
                <div className="mt-4 pt-3 border-t border-[#362A22]/10 flex flex-wrap gap-1.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/themes/${encodeURIComponent(theme.id)}?tab=pronunciation`);
                    }}
                    className="flex items-center gap-1 py-1.5 px-2.5 rounded-lg bg-white/90 hover:bg-[#FF8A4D] hover:text-white text-[#362A22] text-[10px] font-bold shadow-2xs transition-all"
                    title="Praticar Pronúncia"
                  >
                    <Mic className="h-3 w-3" />
                    <span>Pronúncia</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/themes/${encodeURIComponent(theme.id)}?tab=writing`);
                    }}
                    className="flex items-center gap-1 py-1.5 px-2.5 rounded-lg bg-white/90 hover:bg-[#FF8A4D] hover:text-white text-[#362A22] text-[10px] font-bold shadow-2xs transition-all"
                    title="Praticar Escrita"
                  >
                    <PenTool className="h-3 w-3" />
                    <span>Escrita</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/talk?theme=${encodeURIComponent(theme.id)}`);
                    }}
                    className="flex items-center gap-1 py-1.5 px-2.5 rounded-lg bg-white/90 hover:bg-[#FF8A4D] hover:text-white text-[#362A22] text-[10px] font-bold shadow-2xs transition-all"
                    title="Conversar com Voz"
                  >
                    <MessageSquare className="h-3 w-3" />
                    <span>Talk</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/themes/${encodeURIComponent(theme.id)}?tab=vocabulary`);
                    }}
                    className="flex items-center gap-1 py-1.5 px-2.5 rounded-lg bg-white/90 hover:bg-[#6A56C4] hover:text-white text-[#362A22] text-[10px] font-bold shadow-2xs transition-all"
                    title="Ver Vocabulário"
                  >
                    <BookOpen className="h-3 w-3" />
                    <span>Words</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/themes/${encodeURIComponent(theme.id)}?tab=flashcards`);
                    }}
                    className="flex items-center gap-1 py-1.5 px-2.5 rounded-lg bg-white/90 hover:bg-[#1E7B45] hover:text-white text-[#362A22] text-[10px] font-bold shadow-2xs transition-all"
                    title="Praticar Cartões"
                  >
                    <Layers className="h-3 w-3" />
                    <span>Cards</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Placement Assessment Diagnostic Modal */}
      <LevelAssessmentModal
        isOpen={assessmentOpen}
        onClose={() => setAssessmentOpen(false)}
        languageID={activeLanguageID}
        meaningLanguage={meaningLanguage}
        currentLevel={userLevel}
        onLevelSelected={(lvl) => setLanguageLevel(activeLanguageID, lvl)}
      />
    </div>
  );
}
