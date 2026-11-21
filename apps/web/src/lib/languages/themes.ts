import { UserProficiencyLevel } from '@/types/learning';

export interface ConversationTheme {
  id: string;
  title: string;
  subtitle: string;
  symbol: string; // Icon identifier
  category: string;
  situation: string;
  colorIndex: number; // 0 = Peach, 1 = Lilac, 2 = Sage, 3 = Butter
}

export type ConversationTone = 'casual' | 'professional' | 'formal' | 'challenging';

export interface ConversationToneOption {
  id: ConversationTone;
  label: string;
  icon: string;
  badge: string;
  description: string;
}

export const CONVERSATION_TONES: ConversationToneOption[] = [
  {
    id: 'casual',
    label: 'Casual',
    icon: '☕',
    badge: 'Amigo',
    description: 'Conversa natural e descontraída, como um papo entre amigos.',
  },
  {
    id: 'professional',
    label: 'Professional',
    icon: '💼',
    badge: 'Trabalho',
    description: 'Comunicação corporativa e vocabulário voltado para o ambiente de trabalho.',
  },
  {
    id: 'formal',
    label: 'Formal',
    icon: '🎩',
    badge: 'Executivo',
    description: 'Apresentações, entrevistas formais e reuniões de alto nível.',
  },
  {
    id: 'challenging',
    label: 'Challenging',
    icon: '⚡',
    badge: 'Desafiador',
    description: 'Perguntas complexas e vocabulário avançado para destravar sua fluência.',
  },
];

export function getConversationTones(meaningLanguage: string = 'Portuguese'): ConversationToneOption[] {
  const isPt = meaningLanguage === 'Portuguese';
  if (isPt) {
    return CONVERSATION_TONES;
  }
  return [
    {
      id: 'casual',
      label: 'Casual',
      icon: '☕',
      badge: 'Friend',
      description: 'Natural and relaxed conversation, like chatting with a friend.',
    },
    {
      id: 'professional',
      label: 'Professional',
      icon: '💼',
      badge: 'Work',
      description: 'Business conversation and workplace vocabulary for professional contexts.',
    },
    {
      id: 'formal',
      label: 'Formal',
      icon: '🎩',
      badge: 'Executive',
      description: 'Presentations, formal interviews, and executive-level discussions.',
    },
    {
      id: 'challenging',
      label: 'Challenging',
      icon: '⚡',
      badge: 'Challenging',
      description: 'Complex questions and advanced vocabulary to unlock your fluency.',
    },
  ];
}

export interface ThemePack {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}

export const THEME_PACKS: ThemePack[] = [
  {
    id: 'All',
    title: 'All Themes',
    subtitle: 'Explore all conversation topics',
    icon: '✨',
  },
  {
    id: 'Work & Career',
    title: 'Work & Career',
    subtitle: 'Standups, meetings, interviews & clients',
    icon: '💼',
  },
  {
    id: 'Speak with Confidence',
    title: 'Speak with Confidence',
    subtitle: 'Presentations, pitches, speeches & Q&A',
    icon: '🎙️',
  },
  {
    id: 'Travel & Adventure',
    title: 'Travel & Adventure',
    subtitle: 'Airports, hotels, cities & real-life situations',
    icon: '✈️',
  },
  {
    id: 'Deep Conversations',
    title: 'Deep Conversations',
    subtitle: 'Memories, dreams, values & life stories',
    icon: '💭',
  },
  {
    id: 'Everyday Life',
    title: 'Everyday Life',
    subtitle: 'Coffee, weekends, food, friends & home',
    icon: '☕',
  },
];

export function getThemePacks(meaningLanguage: string = 'Portuguese'): ThemePack[] {
  const isPt = meaningLanguage === 'Portuguese';
  if (!isPt) return THEME_PACKS;
  return [
    {
      id: 'All',
      title: 'Todos os Temas',
      subtitle: 'Explore todos os tópicos de conversa',
      icon: '✨',
    },
    {
      id: 'Work & Career',
      title: 'Trabalho & Carreira',
      subtitle: 'Standups, reuniões, entrevistas e clientes',
      icon: '💼',
    },
    {
      id: 'Speak with Confidence',
      title: 'Fale com Confiança',
      subtitle: 'Apresentações, pitches, discursos e Q&A',
      icon: '🎙️',
    },
    {
      id: 'Travel & Adventure',
      title: 'Viagem & Aventura',
      subtitle: 'Aeroportos, hotéis, cidades e situações reais',
      icon: '✈️',
    },
    {
      id: 'Deep Conversations',
      title: 'Conversas Profundas',
      subtitle: 'Memórias, sonhos, valores e histórias de vida',
      icon: '💭',
    },
    {
      id: 'Everyday Life',
      title: 'Vida Cotidiana',
      subtitle: 'Café, fins de semana, comida e amigos',
      icon: '☕',
    },
  ];
}

export const SHARED_THEMES: ConversationTheme[] = [
  // ==========================================
  // PACK 1: Work & Career (High Priority)
  // ==========================================
  {
    id: 'daily-standup',
    title: 'The Daily Standup',
    subtitle: 'What are you working on?',
    symbol: 'calendar-check',
    category: 'Work & Career',
    situation: 'Give your team a quick 2-minute update: what you worked on yesterday, what you are tackling today, and any blockers.',
    colorIndex: 0,
  },
  {
    id: 'first-impressions',
    title: 'First Impressions',
    subtitle: "Let's introduce ourselves",
    symbol: 'hand',
    category: 'Work & Career',
    situation: "Introduce yourself to a brand new team: your background, what excites you about the project, and how you like to collaborate.",
    colorIndex: 1,
  },
  {
    id: 'show-and-tell',
    title: 'Show and Tell',
    subtitle: "Present something you're proud of",
    symbol: 'sparkles',
    category: 'Work & Career',
    situation: 'Present a feature, project or creative work you are proud of. Explain the problem, your solution, and key results.',
    colorIndex: 2,
  },
  {
    id: 'the-interview',
    title: 'The Interview',
    subtitle: 'Tell me about yourself',
    symbol: 'user-check',
    category: 'Work & Career',
    situation: 'Practice a job interview scenario. Walk through your journey, strengths, and what makes you a great fit for the role.',
    colorIndex: 3,
  },
  {
    id: 'the-kickoff',
    title: 'The Kickoff',
    subtitle: "Let's get this project started",
    symbol: 'rocket',
    category: 'Work & Career',
    situation: 'Lead or participate in a project kickoff meeting. Align on scope, deadlines, and responsibilities.',
    colorIndex: 0,
  },
  {
    id: 'the-big-meeting',
    title: 'The Big Meeting',
    subtitle: "What's on the agenda?",
    symbol: 'users',
    category: 'Work & Career',
    situation: 'Participate in an important team meeting. Share your perspective, ask clarifying questions, and align on next steps.',
    colorIndex: 1,
  },
  {
    id: 'different-point-of-view',
    title: 'A Different Point of View',
    subtitle: "Let's see it another way",
    symbol: 'compass',
    category: 'Work & Career',
    situation: 'Diplomatically share a differing opinion during a strategic discussion. Build alignment constructively.',
    colorIndex: 2,
  },
  {
    id: 'constructive-feedback',
    title: 'Constructive Feedback',
    subtitle: 'How can we make it better?',
    symbol: 'message-square',
    category: 'Work & Career',
    situation: 'Give or receive helpful, actionable feedback with empathy, specificity, and professional cadence.',
    colorIndex: 3,
  },
  {
    id: 'difficult-conversation',
    title: 'The Difficult Conversation',
    subtitle: "Let's talk about it",
    symbol: 'shield-alert',
    category: 'Work & Career',
    situation: 'Navigate a delicate workplace situation: managing expectations, addressing misunderstandings, or resetting priorities.',
    colorIndex: 0,
  },
  {
    id: 'new-opportunity',
    title: 'A New Opportunity',
    subtitle: 'What comes next?',
    symbol: 'arrow-up-right',
    category: 'Work & Career',
    situation: 'Discuss career growth, new responsibilities, and future projects with your manager or mentor.',
    colorIndex: 1,
  },
  {
    id: 'negotiation',
    title: 'The Negotiation',
    subtitle: 'Can we find a middle ground?',
    symbol: 'scale',
    category: 'Work & Career',
    situation: 'Negotiate terms, deadlines, or scope with a partner or client to reach a win-win outcome.',
    colorIndex: 2,
  },
  {
    id: 'networking',
    title: 'Networking',
    subtitle: 'So, what do you do?',
    symbol: 'users',
    category: 'Work & Career',
    situation: 'Chat naturally at a networking mixer or conference. Break the ice, ask great questions, and exchange contacts.',
    colorIndex: 3,
  },
  {
    id: 'client-call',
    title: 'The Client Call',
    subtitle: 'How can I help you?',
    symbol: 'phone',
    category: 'Work & Career',
    situation: 'Lead a professional call with an important client. Listen to their needs and propose clear solutions.',
    colorIndex: 0,
  },
  {
    id: 'monday-office',
    title: 'Monday at the Office',
    subtitle: "What's happening this week?",
    symbol: 'coffee',
    category: 'Work & Career',
    situation: 'Catch up with colleagues on Monday morning: chat about the weekend and align on weekly priorities.',
    colorIndex: 1,
  },
  {
    id: 'working-remotely',
    title: 'Working Remotely',
    subtitle: 'Where are you working from?',
    symbol: 'laptop',
    category: 'Work & Career',
    situation: 'Discuss remote and hybrid work routines, time zones, productivity tips, and asynchronous communication.',
    colorIndex: 2,
  },
  {
    id: 'career-switch',
    title: 'The Career Switch',
    subtitle: 'What would you like to become?',
    symbol: 'shuffle',
    category: 'Work & Career',
    situation: 'Explore shifting into a new industry or discipline: transferable skills, passions, and learning paths.',
    colorIndex: 3,
  },
  {
    id: 'promotion',
    title: 'The Promotion',
    subtitle: "You've earned it",
    symbol: 'award',
    category: 'Work & Career',
    situation: 'Celebrate a milestone advancement, acknowledge team support, and outline goals for your new title.',
    colorIndex: 0,
  },
  {
    id: 'team-celebration',
    title: 'A Team Celebration',
    subtitle: 'We did it together',
    symbol: 'wine',
    category: 'Work & Career',
    situation: 'Celebrate shipping a major milestone with your team: share gratitude, funny moments, and toast to success.',
    colorIndex: 1,
  },

  // ==========================================
  // PACK 2: Speak with Confidence
  // ==========================================
  {
    id: 'the-introduction',
    title: 'The Introduction',
    subtitle: 'Introduce yourself in a room full of strangers',
    symbol: 'users',
    category: 'Speak with Confidence',
    situation: 'Deliver a confident, memorable self-introduction in front of an audience or a large group meeting.',
    colorIndex: 0,
  },
  {
    id: 'ted-talk',
    title: 'The TED-Style Talk',
    subtitle: 'An idea worth sharing',
    symbol: 'mic',
    category: 'Speak with Confidence',
    situation: 'Deliver an inspiring short talk around an insight or idea that can change the way people think.',
    colorIndex: 1,
  },
  {
    id: 'project-pitch',
    title: 'The Project Pitch',
    subtitle: 'Make them believe in your idea',
    symbol: 'target',
    category: 'Speak with Confidence',
    situation: 'Pitch a project or product idea to stakeholders or investors with clarity and persuasive conviction.',
    colorIndex: 2,
  },
  {
    id: 'the-qa',
    title: 'The Q&A',
    subtitle: 'You have the floor',
    symbol: 'help-circle',
    category: 'Speak with Confidence',
    situation: 'Handle tough or spontaneous questions from the audience after a presentation with composure and poise.',
    colorIndex: 3,
  },
  {
    id: 'elevator-pitch',
    title: 'The Elevator Pitch',
    subtitle: 'You have thirty seconds',
    symbol: 'timer',
    category: 'Speak with Confidence',
    situation: 'Condense your business or personal mission into a memorable, punchy 30-second explanation.',
    colorIndex: 0,
  },
  {
    id: 'on-the-stage',
    title: 'On the Stage',
    subtitle: 'Share an idea with the world',
    symbol: 'presentation',
    category: 'Speak with Confidence',
    situation: 'Step up to the stage. Engage the room, use storytelling, and make a lasting impression on listeners.',
    colorIndex: 1,
  },
  {
    id: 'brainstorming',
    title: 'Brainstorming',
    subtitle: 'What if we tried something new?',
    symbol: 'lightbulb',
    category: 'Speak with Confidence',
    situation: 'Facilitate a vibrant brainstorming session: throw out wild ideas, build on others, and suspend judgment.',
    colorIndex: 2,
  },

  // ==========================================
  // PACK 3: Travel & Adventure
  // ==========================================
  {
    id: 'airport',
    title: 'At the Airport',
    subtitle: 'Where are you flying today?',
    symbol: 'plane',
    category: 'Travel & Adventure',
    situation: 'Navigate check-in, baggage drop, security, and boarding gate questions at an international airport.',
    colorIndex: 0,
  },
  {
    id: 'hotel-check-in',
    title: 'Checking In',
    subtitle: 'I have a reservation',
    symbol: 'key',
    category: 'Travel & Adventure',
    situation: 'Check into your hotel, ask about breakfast hours, wifi, amenities, and verify reservation details.',
    colorIndex: 1,
  },
  {
    id: 'lost-in-city',
    title: 'Lost in the City',
    subtitle: 'Could you help me find my way?',
    symbol: 'compass',
    category: 'Travel & Adventure',
    situation: 'Politely ask a local for directions when your phone battery dies in an unfamiliar neighborhood.',
    colorIndex: 2,
  },
  {
    id: 'hotel-lobby',
    title: 'The Hotel Lobby',
    subtitle: 'A room with a view, please',
    symbol: 'building',
    category: 'Travel & Adventure',
    situation: 'Request a room upgrade, extra pillows, or recommendations for nearby restaurants at the concierge.',
    colorIndex: 3,
  },
  {
    id: 'meeting-neighbors',
    title: 'Meeting the Neighbors',
    subtitle: "We haven't met before",
    symbol: 'hand',
    category: 'Travel & Adventure',
    situation: 'Say hello to your new neighbors, exchange pleasantries, and ask about local neighborhood tips.',
    colorIndex: 0,
  },
  {
    id: 'doctor-visit',
    title: "A Doctor's Visit",
    subtitle: "Tell me what's bothering you",
    symbol: 'activity',
    category: 'Travel & Adventure',
    situation: 'Describe symptoms, duration, and health concerns clearly to a healthcare professional or pharmacist.',
    colorIndex: 1,
  },
  {
    id: 'making-complaint',
    title: 'Making a Complaint',
    subtitle: "Something isn't quite right",
    symbol: 'alert-circle',
    category: 'Travel & Adventure',
    situation: 'State an issue politely but firmly (e.g., incorrect order or faulty service) to get it resolved.',
    colorIndex: 2,
  },
  {
    id: 'the-unexpected',
    title: 'The Unexpected',
    subtitle: 'Well, that was a surprise',
    symbol: 'sparkles',
    category: 'Travel & Adventure',
    situation: 'React naturally to an unexpected travel detour, cancellation, or delightful surprise encounter.',
    colorIndex: 3,
  },
  {
    id: 'asking-directions',
    title: 'Asking for Directions',
    subtitle: 'Is it far from here?',
    symbol: 'map-pin',
    category: 'Travel & Adventure',
    situation: 'Ask how to get to the museum or metro station on foot or by public transit with clarity.',
    colorIndex: 0,
  },
  {
    id: 'little-shopping',
    title: 'A Little Shopping',
    subtitle: "I'm just looking around",
    symbol: 'shopping-bag',
    category: 'Travel & Adventure',
    situation: 'Browse a boutique or shop, ask about sizes and prices, and decide whether to purchase.',
    colorIndex: 1,
  },

  // ==========================================
  // PACK 4: Deep Conversations
  // ==========================================
  {
    id: 'childhood-memory',
    title: 'A Childhood Memory',
    subtitle: 'Do you remember when?',
    symbol: 'smile',
    category: 'Deep Conversations',
    situation: 'Share a fond, funny, or vivid memory from your childhood and listen to another.',
    colorIndex: 0,
  },
  {
    id: 'the-perfect-day',
    title: 'The Perfect Day',
    subtitle: 'What would you do?',
    symbol: 'sun',
    category: 'Deep Conversations',
    situation: 'Describe your ideal 24 hours from waking up to going to sleep with no obligations.',
    colorIndex: 1,
  },
  {
    id: 'new-hobby',
    title: 'A New Hobby',
    subtitle: "I've always wanted to try",
    symbol: 'palette',
    category: 'Deep Conversations',
    situation: 'Discuss a creative craft, sport, or skill you have always wanted to pick up and why.',
    colorIndex: 2,
  },
  {
    id: 'bucket-list',
    title: 'The Bucket List',
    subtitle: "One day, I'd love to...",
    symbol: 'mountain',
    category: 'Deep Conversations',
    situation: 'Talk about the dreams, travels, and adventures you want to experience in your lifetime.',
    colorIndex: 3,
  },
  {
    id: 'little-confession',
    title: 'A Little Confession',
    subtitle: "Here's something about me",
    symbol: 'heart',
    category: 'Deep Conversations',
    situation: 'Share a quirky habit, guilty pleasure, or harmless secret that makes you uniquely you.',
    colorIndex: 0,
  },
  {
    id: 'best-advice',
    title: 'The Best Advice',
    subtitle: 'Someone once told me',
    symbol: 'book',
    category: 'Deep Conversations',
    situation: 'Reflect on words of wisdom that guided you during a tough or transformative moment.',
    colorIndex: 1,
  },
  {
    id: 'strange-dream',
    title: 'A Strange Dream',
    subtitle: 'It felt so real',
    symbol: 'moon',
    category: 'Deep Conversations',
    situation: 'Recall a vivid, bizarre, or fascinating dream you woke up thinking about.',
    colorIndex: 2,
  },
  {
    id: 'first-date',
    title: 'The First Date',
    subtitle: 'Tell me your story',
    symbol: 'wine',
    category: 'Deep Conversations',
    situation: 'Engage in pleasant, curious getting-to-know-you conversation over drinks or a quiet meal.',
    colorIndex: 3,
  },
  {
    id: 'family-tradition',
    title: 'A Family Tradition',
    subtitle: 'We do this every year',
    symbol: 'users',
    category: 'Deep Conversations',
    situation: 'Describe a meaningful holiday or family ritual passed down through generations.',
    colorIndex: 0,
  },
  {
    id: 'things-we-love',
    title: 'The Things We Love',
    subtitle: 'What makes you happy?',
    symbol: 'heart',
    category: 'Deep Conversations',
    situation: 'Celebrate the simple things that bring genuine joy: morning coffee, music, walks, friends.',
    colorIndex: 1,
  },

  // ==========================================
  // PACK 5: Everyday Life (Classic Themes)
  // ==========================================
  {
    id: 'coffee',
    title: 'A coffee?',
    subtitle: 'Something warm, please',
    symbol: 'coffee',
    category: 'Everyday Life',
    situation: 'You work in a cosy café. Help the learner order, then chat naturally.',
    colorIndex: 0,
  },
  {
    id: 'weekend',
    title: 'The weekend',
    subtitle: 'Tell me about yours',
    symbol: 'sun',
    category: 'Everyday Life',
    situation: 'Ask about the learner’s weekend. Practise past events and follow their interests.',
    colorIndex: 1,
  },
  {
    id: 'walk',
    title: 'A little walk',
    subtitle: 'Out into the fresh air',
    symbol: 'tree',
    category: 'Everyday Life',
    situation: 'Take an imagined forest walk together. Talk about nature, weather and daily life.',
    colorIndex: 2,
  },
  {
    id: 'dinner',
    title: 'Dinner plans',
    subtitle: 'Let’s make something',
    symbol: 'utensils',
    category: 'Everyday Life',
    situation: 'Plan dinner together. Ask about ingredients, preferences and the steps of cooking.',
    colorIndex: 3,
  },
  {
    id: 'groceries',
    title: 'At the market',
    subtitle: 'Find the good tomatoes',
    symbol: 'shopping-bag',
    category: 'Everyday Life',
    situation: 'Help the learner shop at a local food market. Practise quantities and questions.',
    colorIndex: 2,
  },
  {
    id: 'home',
    title: 'A place of your own',
    subtitle: 'Make yourself at home',
    symbol: 'home',
    category: 'Everyday Life',
    situation: 'Discuss a home, rooms, moving and what makes a place comfortable.',
    colorIndex: 3,
  },
  {
    id: 'restaurant',
    title: 'A table for two',
    subtitle: 'Stay for dessert',
    symbol: 'wine',
    category: 'Everyday Life',
    situation: 'Role-play a restaurant meal. Practise requests, preferences and polite problem-solving.',
    colorIndex: 0,
  },
];

// Language-specific title and subtitle overrides matching apps/ios/Core/Languages/
export const THEME_OVERRIDES: Record<string, Record<string, Partial<ConversationTheme>>> = {
  es: {
    coffee: { title: 'Un café', subtitle: 'Something warm, please' },
    groceries: { title: 'En el mercado', subtitle: 'A little of everything' },
    traditions: { title: 'La sobremesa', subtitle: 'Let the conversation linger' },
    cabin: { title: 'A weekend away', subtitle: 'Somewhere in the sunshine' },
  },
  nb: {
    coffee: { title: 'En kaffe?', subtitle: 'Something warm, please' },
    groceries: { title: 'På butikken', subtitle: 'A little of everything' },
    walk: { title: 'En liten tur', subtitle: 'Out into the fresh air' },
    cabin: { title: 'På hytta', subtitle: 'A quieter kind of day' },
  },
  fr: {
    coffee: { title: 'Un café ?', subtitle: 'Something warm, please' },
    groceries: { title: 'Au marché', subtitle: 'A little of everything' },
    traditions: { title: 'À table', subtitle: 'Stay a little longer' },
    travel: { title: 'En route', subtitle: 'A ticket to somewhere' },
  },
  de: {
    coffee: { title: 'Ein Kaffee?', subtitle: 'Etwas Warmes, bitte' },
    groceries: { title: 'Auf dem Markt', subtitle: 'Von allem ein bisschen' },
    cabin: { title: 'Ein Wochenende weg', subtitle: 'Ein Tapetenwechsel' },
    'daily-standup': { title: 'Das Daily Standup', subtitle: 'Woran arbeiten Sie heute?' },
    'first-impressions': { title: 'Erster Eindruck', subtitle: 'Stellen wir uns vor' },
    'show-and-tell': { title: 'Präsentation', subtitle: 'Zeigen Sie, worauf Sie stolz sind' },
    'the-interview': { title: 'Das Vorstellungsgespräch', subtitle: 'Erzählen Sie von sich' },
    'the-kickoff': { title: 'Der Projektstart', subtitle: 'Legen wir gemeinsam los' },
    'the-big-meeting': { title: 'Das große Meeting', subtitle: 'Was steht auf der Tagesordnung?' },
    'different-point-of-view': { title: 'Ein anderer Blickwinkel', subtitle: 'Betrachten wir es anders' },
    'constructive-feedback': { title: 'Konstruktives Feedback', subtitle: 'Wie können wir es verbessern?' },
    'difficult-conversation': { title: 'Das schwierige Gespräch', subtitle: 'Sprechen wir offen darüber' },
    'new-opportunity': { title: 'Eine neue Chance', subtitle: 'Was kommt als Nächstes?' },
    'negotiation': { title: 'Die Verhandlung', subtitle: 'Finden wir einen Kompromiss?' },
    'networking': { title: 'Networking', subtitle: 'Was machen Sie beruflich?' },
    'client-call': { title: 'Das Kundengespräch', subtitle: 'Wie kann ich Ihnen helfen?' },
    'monday-office': { title: 'Montag im Büro', subtitle: 'Was steht diese Woche an?' },
    'working-remotely': { title: 'Homeoffice & Remote', subtitle: 'Von wo aus arbeiten Sie?' },
    'career-switch': { title: 'Der Karrierewechsel', subtitle: 'Was möchten Sie werden?' },
    'promotion': { title: 'Die Beförderung', subtitle: 'Sie haben es sich verdient' },
    'team-celebration': { title: 'Erfolge feiern', subtitle: 'Wir haben es zusammen geschafft' },
    'the-introduction': { title: 'Die Selbstvorstellung', subtitle: 'Sich im Raum überzeugend vorstellen' },
    'ted-talk': { title: 'Der Vortrag im TED-Stil', subtitle: 'Eine Idee, die es wert ist' },
    'project-pitch': { title: 'Der Projekt-Pitch', subtitle: 'Begeistern Sie für Ihre Idee' },
    'the-qa': { title: 'Die Fragerunde (Q&A)', subtitle: 'Sie haben das Wort' },
    'elevator-pitch': { title: 'Der Elevator Pitch', subtitle: 'Sie haben dreißig Sekunden' },
    'on-the-stage': { title: 'Auf der Bühne', subtitle: 'Teilen Sie eine Idee mit der Welt' },
    'brainstorming': { title: 'Brainstorming', subtitle: 'Was wäre, wenn wir etwas Neues probieren?' },
    'airport': { title: 'Am Flughafen', subtitle: 'Wohin fliegen Sie heute?' },
    'hotel-check-in': { title: 'Der Check-in', subtitle: 'Ich habe eine Reservierung' },
    'lost-in-city': { title: 'In der Stadt verlaufen', subtitle: 'Können Sie mir den Weg zeigen?' },
    'hotel-lobby': { title: 'In der Hotellobby', subtitle: 'Ein Zimmer mit Aussicht, bitte' },
    'meeting-neighbors': { title: 'Die Nachbarn treffen', subtitle: 'Wir kennen uns noch nicht' },
    'doctor-visit': { title: 'Beim Arzt', subtitle: 'Was fehlt Ihnen denn?' },
    'making-complaint': { title: 'Eine Beschwerde', subtitle: 'Etwas stimmt hier nicht ganz' },
    'the-unexpected': { title: 'Das Unerwartete', subtitle: 'Das war eine echte Überraschung' },
    'asking-directions': { title: 'Nach dem Weg fragen', subtitle: 'Ist es weit von hier?' },
    'little-shopping': { title: 'Ein wenig einkaufen', subtitle: 'Ich schaue mich nur um' },
    'childhood-memory': { title: 'Kindheitserinnerungen', subtitle: 'Erinnerst du dich noch?' },
    'the-perfect-day': { title: 'Der perfekte Tag', subtitle: 'Was würdest du tun?' },
    'new-hobby': { title: 'Ein neues Hobby', subtitle: 'Das wollte ich schon immer ausprobieren' },
    'bucket-list': { title: 'Die Wunschliste', subtitle: 'Eines Tages möchte ich...' },
    'little-confession': { title: 'Ein kleines Geheimnis', subtitle: 'Hier ist etwas über mich' },
    'best-advice': { title: 'Der beste Ratschlag', subtitle: 'Jemand hat mir mal gesagt' },
    'strange-dream': { title: 'Ein seltsamer Traum', subtitle: 'Es fühlte sich so real an' },
    'first-date': { title: 'Das erste Date', subtitle: 'Erzähl mir deine Geschichte' },
    'family-tradition': { title: 'Familientradition', subtitle: 'Das machen wir jedes Jahr' },
    'things-we-love': { title: 'Was wir lieben', subtitle: 'Was macht dich glücklich?' },
  },
  pt: {
    coffee: { title: 'Um café?', subtitle: 'Algo quentinho, por favor' },
    groceries: { title: 'Na feira', subtitle: 'Um pouco de tudo' },
    cabin: { title: 'Fim de semana fora', subtitle: 'Um momento de tranquilidade' },
    walk: { title: 'Um passeio', subtitle: 'Respirar ar puro' },
    friends: { title: 'Novos amigos', subtitle: 'Um convite, quem sabe' },
    'daily-standup': { title: 'A Daily Standup', subtitle: 'No que você está trabalhando hoje?' },
    'first-impressions': { title: 'Primeiras Impressões', subtitle: 'Vamos nos apresentar' },
    'show-and-tell': { title: 'Apresentação de Projeto', subtitle: 'Mostre algo de que se orgulha' },
    'the-interview': { title: 'A Entrevista', subtitle: 'Conte-me sobre você' },
    'the-kickoff': { title: 'O Pontapé Inicial', subtitle: 'Vamos começar este projeto juntos' },
    'the-big-meeting': { title: 'A Grande Reunião', subtitle: 'O que está na pauta?' },
    'different-point-of-view': { title: 'Um Ponto de Vista Diferente', subtitle: 'Vamos ver por outro ângulo' },
    'constructive-feedback': { title: 'Feedback Construtivo', subtitle: 'Como podemos melhorar?' },
    'difficult-conversation': { title: 'A Conversa Difícil', subtitle: 'Vamos conversar abertamente' },
    'new-opportunity': { title: 'Uma Nova Oportunidade', subtitle: 'O que vem a seguir?' },
    'negotiation': { title: 'A Negociação', subtitle: 'Podemos encontrar um meio-termo?' },
    'networking': { title: 'Networking', subtitle: 'Com o que você trabalha?' },
    'client-call': { title: 'A Chamada com o Cliente', subtitle: 'Como posso ajudar você?' },
    'monday-office': { title: 'Segunda no Escritório', subtitle: 'O que acontece esta semana?' },
    'working-remotely': { title: 'Trabalho Remoto', subtitle: 'De onde você está trabalhando?' },
    'career-switch': { title: 'Mudança de Carreira', subtitle: 'O que gostaria de se tornar?' },
    'promotion': { title: 'A Promoção', subtitle: 'Você fez por merecer' },
    'team-celebration': { title: 'Celebração da Equipe', subtitle: 'Conseguimos juntos' },
    'the-introduction': { title: 'A Apresentação Pessoal', subtitle: 'Apresente-se com confiança' },
    'ted-talk': { title: 'Palestra Estilo TED', subtitle: 'Uma ideia que vale a pena' },
    'project-pitch': { title: 'O Pitch do Projeto', subtitle: 'Faça-os acreditar na sua ideia' },
    'the-qa': { title: 'Perguntas e Respostas (Q&A)', subtitle: 'A palavra é sua' },
    'elevator-pitch': { title: 'O Elevator Pitch', subtitle: 'Você tem trinta segundos' },
    'on-the-stage': { title: 'No Palco', subtitle: 'Compartilhe uma ideia com o mundo' },
    'brainstorming': { title: 'Brainstorming', subtitle: 'E se tentássemos algo novo?' },
    'airport': { title: 'No Aeroporto', subtitle: 'Para onde você vai voar hoje?' },
    'hotel-check-in': { title: 'O Check-in', subtitle: 'Tenho uma reserva' },
    'lost-in-city': { title: 'Perdido na Cidade', subtitle: 'Poderia me ajudar a encontrar o caminho?' },
    'hotel-lobby': { title: 'No Hall do Hotel', subtitle: 'Um quarto com vista, por favor' },
    'meeting-neighbors': { title: 'Conhecendo os Vizinhos', subtitle: 'Ainda não nos conhecemos' },
    'doctor-visit': { title: 'No Consultório Médico', subtitle: 'O que está incomodando você?' },
    'making-complaint': { title: 'Fazendo uma Reclamação', subtitle: 'Algo não está totalmente certo' },
    'the-unexpected': { title: 'O Inesperado', subtitle: 'Bem, isso foi uma surpresa' },
    'asking-directions': { title: 'Pedindo Informações', subtitle: 'É longe daqui?' },
    'little-shopping': { title: 'Umas Comprinhas', subtitle: 'Só estou dando uma olhada' },
    'childhood-memory': { title: 'Lembrança de Infância', subtitle: 'Você se lembra de quando...?' },
    'the-perfect-day': { title: 'O Dia Perfeito', subtitle: 'O que você faria?' },
    'new-hobby': { title: 'Um Novo Hobby', subtitle: 'Sempre quis experimentar' },
    'bucket-list': { title: 'Lista de Desejos', subtitle: 'Um dia gostaria muito de...' },
    'little-confession': { title: 'Uma Confissão', subtitle: 'Aqui está algo sobre mim' },
    'best-advice': { title: 'O Melhor Conselho', subtitle: 'Alguém uma vez me disse' },
    'strange-dream': { title: 'Um Sonho Estranho', subtitle: 'Parecia tão real' },
    'first-date': { title: 'O Primeiro Encontro', subtitle: 'Conte-me a sua história' },
    'family-tradition': { title: 'Tradição Familiar', subtitle: 'Fazemos isso todo ano' },
    'things-we-love': { title: 'As Coisas Que Amamos', subtitle: 'O que faz você feliz?' },
  },
  it: {
    coffee: { title: 'Un caffè?', subtitle: 'Something warm, please' },
    groceries: { title: 'Al mercato', subtitle: 'A little of everything' },
    restaurant: { title: 'A tavola', subtitle: 'Stay for dessert' },
  },
};

export const THEME_PORTUGUESE_CATEGORIES: Record<string, string> = {
  'Work & Career': 'Trabalho & Carreira',
  'Everyday Life': 'Vida Cotidiana',
  'Speak with Confidence': 'Fale com Confiança',
  'Travel & Adventure': 'Viagem & Aventura',
  'Deep Conversations': 'Conversas Profundas',
};

export const THEME_PORTUGUESE_SITUATIONS: Record<string, string> = {
  'daily-standup': 'Dê à sua equipe uma rápida atualização de 2 minutos: o que você fez ontem, no que está trabalhando hoje e quaisquer impedimentos.',
  'first-impressions': 'Apresente-se a uma nova equipe: sua trajetória, o que te motiva no projeto e como você gosta de colaborar.',
  'show-and-tell': 'Apresente um recurso, projeto ou trabalho criativo do qual se orgulha. Explique o problema, sua solução e os principais resultados.',
  'the-interview': 'Pratique uma entrevista de emprego. Percorra sua trajetória, pontos fortes e por que você é ideal para a oportunidade.',
  'the-kickoff': 'Lidere ou participe de uma reunião de início de projeto. Alinhe escopo, prazos e responsabilidades com a equipe.',
  'the-big-meeting': 'Participe de uma reunião importante da equipe. Compartilhe sua visão, tire dúvidas e alinhe os próximos passos.',
  'different-point-of-view': 'Compartilhe uma opinião divergente com tato e diplomacia em uma discussão estratégica.',
  'constructive-feedback': 'Dê ou receba feedback construtivo com empatia, especificidade e cadência profissional.',
  'difficult-conversation': 'Conduza uma conversa delicada: gerencie expectativas, esclareça mal-entendidos ou redefina prioridades.',
  'new-opportunity': 'Converse sobre crescimento de carreira, novas responsabilidades e projetos futuros com seu mentor ou líder.',
  'negotiation': 'Negocie termos, prazos ou escopo com um parceiro ou cliente para alcançar um resultado positivo para ambos.',
  'networking': 'Converse naturalmente em um evento profissional ou conferência. Quebre o gelo, faça boas perguntas e troque contatos.',
  'the-client-call': 'Conduza uma ligação profissional com um cliente importante. Ouça suas necessidades e proponha soluções claras.',
  'monday-office': 'Converse com colegas na segunda-feira de manhã: fale sobre o fim de semana e alinhe as prioridades da semana.',
  'working-remotely': 'Converse sobre rotinas de trabalho remoto e híbrido, fusos horários, produtividade e comunicação assíncrona.',
  'career-switch': 'Explore uma transição para uma nova área ou carreira: habilidades transferíveis, interesses e planos de desenvolvimento.',
  'the-promotion': 'Celebre uma promoção, reconheça o apoio do time e trace metas claras para o seu novo momento.',
  'team-celebration': 'Celebre a entrega de um grande marco com a sua equipe: compartilhe agradecimentos, histórias e comemore a conquista.',
  'the-introduction': 'Apresente-se com segurança e clareza diante de uma plateia ou em uma grande reunião com pessoas novas.',
  'ted-talk': 'Apresente uma palestra curta e inspiradora sobre uma ideia que vale a pena compartilhar com o mundo.',
  'project-pitch': 'Apresente uma ideia de projeto ou produto para investidores ou lideranças com clareza e poder de persuasão.',
  'the-qa': 'Responda a perguntas desafiadoras ou espontâneas da plateia após uma apresentação com tranquilidade e precisão.',
  'elevator-pitch': 'Resuma sua proposta profissional ou de negócios em uma apresentação objetiva e marcante de 30 segundos.',
  'on-the-stage': 'Suba ao palco. Conecte-se com o público, use storytelling e cause uma impressão duradoura nos ouvintes.',
  'brainstorming': 'Facilite uma sessão vibrante de ideação: sugira ideias criativas, construa sobre as dos outros e suspenda julgamentos.',
  'at-the-airport': 'Navegue pelo check-in, despacho de malas, controle de segurança e portão de embarque em um aeroporto internacional.',
  'checking-in': 'Faça check-in no hotel, tire dúvidas sobre café da manhã, wi-fi e comodidades, e confirme sua reserva.',
  'lost-in-city': 'Peça orientações educadamente a um morador local quando a bateria do celular acabar em um bairro novo.',
  'hotel-lobby': 'Solicite um quarto melhor, travesseiros extras ou recomendações de restaurantes na recepção do hotel.',
  'meeting-neighbors': 'Cumprimente novos vizinhos, tenha uma conversa acolhedora e peça dicas sobre a vizinhança.',
  'doctor-visit': 'Descreva sintomas, duração e dúvidas de saúde com clareza para um profissional de saúde ou farmacêutico.',
  'making-complaint': 'Relate um problema com educação e firmeza (como um pedido incorreto ou serviço insatisfatório) para obter solução.',
  'the-unexpected': 'Reaja com naturalidade e calma a imprevistos de viagem, cancelamentos ou surpresas do caminho.',
  'asking-directions': 'Pergunte com precisão como chegar a um ponto turístico ou estação de metrô a pé ou de transporte público.',
  'little-shopping': 'Visite uma loja, pergunte sobre tamanhos, cores e preços, e decida se vai levar o produto.',
  'childhood-memory': 'Compartilhe uma memória carinhosa, engraçada ou marcante da infância e ouça a história da outra pessoa.',
  'perfect-day': 'Descreva como seriam suas 24 horas ideais, desde o despertar até o repouso, sem obrigações nem pressa.',
  'new-hobby': 'Converse sobre um novo hobby, esporte ou habilidade criativa que sempre quis experimentar e por quê.',
  'bucket-list': 'Fale sobre os sonhos, viagens e aventuras que você quer realizar ao longo da vida.',
  'little-confession': 'Compartilhe um detalhe curioso, um hábito peculiar ou uma confissão divertida sobre seu jeito de ser.',
  'best-advice': 'Relembre um conselho valioso que você recebeu e que fez a diferença em um momento decisivo da vida.',
  'strange-dream': 'Conte um sonho vívido, curioso ou misterioso que você teve e que pareceu incrivelmente real.',
  'first-date': 'Converse de forma leve, atenta e espontânea para conhecer melhor alguém em um primeiro encontro.',
  'family-tradition': 'Descreva uma tradição, celebração ou hábito especial que sua família costuma manter todo ano.',
  'things-we-love': 'Converse sobre as coisas simples da vida que te fazem verdadeiramente feliz e realizado.',
  'coffee': 'Peça seu café preferido, escolha algo gostoso para acompanhar e converse descontraidamente no balcão.',
  'weekend': 'Conte como foi seu fim de semana, comente seus momentos preferidos e converse sobre planos.',
  'walk': 'Dê um passeio ao ar livre, converse sobre a natureza, o clima e os detalhes do dia a dia.',
  'dinner': 'Planeje um almoço ou jantar especial, converse sobre receitas, ingredientes e pratos favoritos.',
  'groceries': 'Faça compras no mercado local, peça quantidades e esclareça dúvidas de produtos com naturalidade.',
  'cabin': 'Converse sobre uma viagem para relaxar, descansar no campo e recarregar as energias.',
  'restaurant': 'Faça pedidos em um restaurante, tire dúvidas do cardápio e peça a conta de maneira natural e educada.',
};

export function getThemesForLanguage(languageID: string, meaningLanguage: string = 'Portuguese'): ConversationTheme[] {
  const overrides = THEME_OVERRIDES[languageID] || {};
  const isPt = meaningLanguage === 'Portuguese';

  return SHARED_THEMES.map(theme => {
    const override = overrides[theme.id];
    const base = override ? { ...theme, ...override } : { ...theme };

    if (isPt) {
      return {
        ...base,
        category: THEME_PORTUGUESE_CATEGORIES[base.category] || base.category,
        situation: THEME_PORTUGUESE_SITUATIONS[base.id] || base.situation,
      };
    }
    return base;
  });
}

export interface ThematicWord {
  id: string;
  term: string;
  meaning: string;
  pronunciation?: string;
  example?: string;
  partOfSpeech?: 'noun' | 'verb' | 'phrase' | 'adjective';
  level?: UserProficiencyLevel;
}

export interface ThemeExperience {
  starterAssistant: string;
  starterUser: string;
  starterMeaning: string;
  objectives: string[];
}

export const THEME_EXPERIENCES: Record<string, Record<string, ThemeExperience>> = {
  coffee: {
    es: {
      starterAssistant: '¡Hola! Bienvenido al café. ¿Qué te pongo hoy?',
      starterUser: 'Quisiera un café con leche, por favor.',
      starterMeaning: 'Hi! Welcome to the café. What can I get you today?',
      objectives: ['Order hot drinks and pastries', 'Ask for the bill and pay', 'Casual café pleasantries'],
    },
    en: {
      starterAssistant: 'Hi there! Welcome in. What can I get started for you?',
      starterUser: "I'd love a cappuccino with oat milk, please.",
      starterMeaning: 'Hi there! Welcome in. What can I get started for you?',
      objectives: ['Customise your drink order', 'Request the check or receipt', 'Friendly small talk with the barista'],
    },
    pt: {
      starterAssistant: 'Olá! Bom dia, o que você vai querer hoje?',
      starterUser: 'Um café com leite e um pão de queijo, por favor.',
      starterMeaning: 'Hello! Good morning, what would you like today?',
      objectives: ['Pedir bebidas quentes e lanches', 'Pedir a conta no balcão', 'Cumprimentos naturais'],
    },
    fr: {
      starterAssistant: 'Bonjour ! Qu’est-ce qui vous ferait plaisir aujourd’hui ?',
      starterUser: 'Un café au lait et un croissant, s’il vous plaît.',
      starterMeaning: 'Hello! What would you like today?',
      objectives: ['Commander un café et des viennoiseries', 'Demander l’addition', 'Politesse au comptoir'],
    },
    de: {
      starterAssistant: 'Guten Tag! Was darf es denn heute für Sie sein?',
      starterUser: 'Einen Kaffee mit Hafermilch, bitte.',
      starterMeaning: 'Good day! What can I get for you today?',
      objectives: ['Kaffee und Gebäck bestellen', 'Nach der Rechnung fragen', 'Höfliche Alltagsgespräche'],
    },
  },
  weekend: {
    es: {
      starterAssistant: '¡Hola! ¿Qué tal estuvo tu fin de semana?',
      starterUser: 'Estuvo muy tranquilo, salí a pasear y leí bastante.',
      starterMeaning: 'Hi! How was your weekend?',
      objectives: ['Talk about past events and activities', 'Describe how you spent your free time', 'Ask questions about plans'],
    },
    en: {
      starterAssistant: 'Hey! How did your weekend go? Do anything fun?',
      starterUser: 'It was pretty relaxing, just caught up on some reading.',
      starterMeaning: 'Hey! How did your weekend go? Do anything fun?',
      objectives: ['Share weekend highlights', 'Use past tense naturally', 'Ask about upcoming plans'],
    },
    pt: {
      starterAssistant: 'E aí! Como foi o seu fim de semana?',
      starterUser: 'Foi ótimo, descansei bastante e vi alguns amigos.',
      starterMeaning: 'Hey! How was your weekend?',
      objectives: ['Falar sobre atividades passadas', 'Contar planos e descanso', 'Manter o ritmo da conversa'],
    },
  },
  walk: {
    es: {
      starterAssistant: '¡Qué buen día hace para caminar! ¿Por dónde te gusta pasear?',
      starterUser: 'Me gusta mucho ir al parque cerca de casa.',
      starterMeaning: 'What a great day for a walk! Where do you like to stroll?',
      objectives: ['Describe parks and nature', 'Discuss weather and walking routes', 'Express personal preferences'],
    },
    en: {
      starterAssistant: 'The weather is lovely for a walk today! Where are you headed?',
      starterUser: "I'm heading towards the riverside trail for some fresh air.",
      starterMeaning: 'The weather is lovely for a walk today! Where are you headed?',
      objectives: ['Describe outdoor scenery', 'Talk about pace and fresh air', 'Navigate walking directions'],
    },
  },
  dinner: {
    es: {
      starterAssistant: '¡Hora de cenar! ¿Qué te apetece preparar hoy?',
      starterUser: 'Pensaba cocinar una pasta sencilla con verduras.',
      starterMeaning: 'Dinner time! What do you feel like cooking today?',
      objectives: ['Talk about ingredients and recipes', 'Describe cooking steps', 'Share food preferences'],
    },
    en: {
      starterAssistant: 'Dinner time! What are you thinking of making tonight?',
      starterUser: "I was thinking of tossing together a quick stir-fry.",
      starterMeaning: 'Dinner time! What are you thinking of making tonight?',
      objectives: ['Discuss cooking techniques', 'List fresh ingredients', 'Talk about dinner traditions'],
    },
  },
};

export const THEME_VOCABULARY: Record<string, Record<string, ThematicWord[]>> = {
  coffee: {
    es: [
      { id: 'c-es-1', term: 'un café con leche', meaning: 'coffee with milk', example: '¿Me pones un café con leche, por favor?', partOfSpeech: 'phrase' },
      { id: 'c-es-2', term: 'la cuenta', meaning: 'the bill / check', example: '¿Nos traes la cuenta cuando puedas?', partOfSpeech: 'noun' },
      { id: 'c-es-3', term: 'pedir', meaning: 'to order / to ask for', example: '¿Qué vas a pedir hoy?', partOfSpeech: 'verb' },
      { id: 'c-es-4', term: 'sin azúcar', meaning: 'without sugar', example: 'Lo tomo solo, sin azúcar.', partOfSpeech: 'phrase' },
      { id: 'c-es-5', term: 'para llevar', meaning: 'to take away / to go', example: 'Un café para llevar, por favor.', partOfSpeech: 'phrase' },
      { id: 'c-es-6', term: 'la sobremesa', meaning: 'lingering conversation after a meal', example: 'Nos quedamos charlando en la sobremesa.', partOfSpeech: 'noun' },
    ],
    en: [
      { id: 'c-en-1', term: 'espresso', meaning: 'concentrated rich black coffee', example: 'I will have a double espresso, please.', partOfSpeech: 'noun' },
      { id: 'c-en-2', term: 'the check', meaning: 'the bill at a café or restaurant', example: 'Could we get the check when you are ready?', partOfSpeech: 'noun' },
      { id: 'c-en-3', term: 'to order', meaning: 'to request food or beverages', example: 'Are you ready to order or do you need a minute?', partOfSpeech: 'verb' },
      { id: 'c-en-4', term: 'decaf', meaning: 'decaffeinated coffee', example: 'Do you have decaf espresso beans today?', partOfSpeech: 'adjective' },
      { id: 'c-en-5', term: 'to go', meaning: 'takeaway / packaged to carry away', example: 'A warm flat white to go, please.', partOfSpeech: 'phrase' },
      { id: 'c-en-6', term: 'pastry', meaning: 'sweet baked good like a croissant', example: 'A fresh almond pastry pairs great with coffee.', partOfSpeech: 'noun' },
    ],
    pt: [
      { id: 'c-pt-1', term: 'café com leite', meaning: 'coffee with milk', example: 'Um café com leite bem quentinho, por favor.', partOfSpeech: 'phrase' },
      { id: 'c-pt-2', term: 'a conta', meaning: 'the bill', example: 'Pode trazer a conta quando der, por favor?', partOfSpeech: 'noun' },
      { id: 'c-pt-3', term: 'pedir', meaning: 'to order', example: 'O que você vai querer pedir hoje?', partOfSpeech: 'verb' },
      { id: 'c-pt-4', term: 'sem açúcar', meaning: 'without sugar', example: 'Prefiro meu café puro sem açúcar.', partOfSpeech: 'phrase' },
      { id: 'c-pt-5', term: 'para viagem', meaning: 'to go / take out', example: 'Um cappuccino para viagem, por favor.', partOfSpeech: 'phrase' },
      { id: 'c-pt-6', term: 'pão de queijo', meaning: 'warm cheese bread', example: 'Dois pães de queijo bem quentinhos.', partOfSpeech: 'noun' },
    ],
    fr: [
      { id: 'c-fr-1', term: 'un café au lait', meaning: 'coffee with milk', example: 'Un café au lait s’il vous plaît.', partOfSpeech: 'phrase' },
      { id: 'c-fr-2', term: "l'addition", meaning: 'the bill / check', example: 'L’addition quand vous aurez un instant.', partOfSpeech: 'noun' },
      { id: 'c-fr-3', term: 'commander', meaning: 'to order', example: 'Vous êtes prêts à commander ?', partOfSpeech: 'verb' },
      { id: 'c-fr-4', term: 'sans sucre', meaning: 'without sugar', example: 'Un espresso court sans sucre.', partOfSpeech: 'phrase' },
      { id: 'c-fr-5', term: 'à emporter', meaning: 'to take away', example: 'C’est pour consommer ici ou à emporter ?', partOfSpeech: 'phrase' },
      { id: 'c-fr-6', term: 'un croissant', meaning: 'croissant', example: 'Un croissant croustillant au beurre.', partOfSpeech: 'noun' },
    ],
    de: [
      { id: 'c-de-1', term: 'der Kaffee', meaning: 'coffee', example: 'Einen Kaffee mit Hafermilch, bitte.', partOfSpeech: 'noun' },
      { id: 'c-de-2', term: 'die Rechnung', meaning: 'the bill', example: 'Zusammen oder getrennt? Die Rechnung, bitte.', partOfSpeech: 'noun' },
      { id: 'c-de-3', term: 'bestellen', meaning: 'to order', example: 'Ich möchte gerne bestellen.', partOfSpeech: 'verb' },
      { id: 'c-de-4', term: 'ohne Zucker', meaning: 'without sugar', example: 'Einen doppelten Espresso ohne Zucker.', partOfSpeech: 'phrase' },
      { id: 'c-de-5', term: 'zum Mitnehmen', meaning: 'to take away', example: 'Einen Cappuccino zum Mitnehmen, bitte.', partOfSpeech: 'phrase' },
      { id: 'c-de-6', term: 'das Gebäck', meaning: 'pastry', example: 'Haben Sie frisches Gebäck da?', partOfSpeech: 'noun' },
    ],
    it: [
      { id: 'c-it-1', term: 'un caffè macchiato', meaning: 'espresso with a drop of milk', example: 'Un macchiato caldo al banco, per favore.', partOfSpeech: 'phrase' },
      { id: 'c-it-2', term: 'il conto', meaning: 'the check / bill', example: 'Possiamo avere il conto, grazie.', partOfSpeech: 'noun' },
      { id: 'c-it-3', term: 'ordinare', meaning: 'to order', example: 'Cosa desiderate ordinare?', partOfSpeech: 'verb' },
      { id: 'c-it-4', term: 'senza zucchero', meaning: 'without sugar', example: 'Lo bevo amaro, senza zucchero.', partOfSpeech: 'phrase' },
      { id: 'c-it-5', term: 'da portare via', meaning: 'to take away', example: 'Un caffè da portare via.', partOfSpeech: 'phrase' },
      { id: 'c-it-6', term: 'un cornetto', meaning: 'croissant', example: 'Un cornetto caldo alla crema.', partOfSpeech: 'noun' },
    ],
    nb: [
      { id: 'c-nb-1', term: 'en kaffe med melk', meaning: 'coffee with milk', example: 'En kaffe med havremelk, takk.', partOfSpeech: 'phrase' },
      { id: 'c-nb-2', term: 'regningen', meaning: 'the bill', example: 'Kan vi få regningen?', partOfSpeech: 'noun' },
      { id: 'c-nb-3', term: 'å bestille', meaning: 'to order', example: 'Er dere klare til å bestille?', partOfSpeech: 'verb' },
      { id: 'c-nb-4', term: 'uten sukker', meaning: 'without sugar', example: 'Svart kaffe uten sukker, takk.', partOfSpeech: 'phrase' },
      { id: 'c-nb-5', term: 'å ta med', meaning: 'to take away', example: 'En stor kaffe å ta med.', partOfSpeech: 'phrase' },
      { id: 'c-nb-6', term: 'en kanelbolle', meaning: 'cinnamon bun', example: 'En nystekt kanelbolle smaker nydelig.', partOfSpeech: 'noun' },
    ],
  },
  weekend: {
    es: [
      { id: 'w-es-1', term: 'el fin de semana', meaning: 'the weekend', example: '¿Qué planes tienes para el fin de semana?', partOfSpeech: 'noun' },
      { id: 'w-es-2', term: 'descansar', meaning: 'to rest / unwind', example: 'Aproveché para descansar y dormir más.', partOfSpeech: 'verb' },
      { id: 'w-es-3', term: 'quedar con', meaning: 'to meet up with', example: 'Quedé con unos amigos el sábado.', partOfSpeech: 'verb' },
      { id: 'w-es-4', term: 'hacer una escapada', meaning: 'to take a short trip', example: 'Hicimos una escapada a la montaña.', partOfSpeech: 'phrase' },
      { id: 'w-es-5', term: 'tranquilo', meaning: 'calm / quiet', example: 'Fue un fin de semana muy tranquilo.', partOfSpeech: 'adjective' },
    ],
    en: [
      { id: 'w-en-1', term: 'the weekend', meaning: 'Saturday and Sunday', example: 'How was your weekend overall?', partOfSpeech: 'noun' },
      { id: 'w-en-2', term: 'to unwind', meaning: 'to relax after work', example: 'It was great to finally unwind and slow down.', partOfSpeech: 'verb' },
      { id: 'w-en-3', term: 'to catch up', meaning: 'to meet friends and exchange news', example: 'We caught up over dinner on Saturday evening.', partOfSpeech: 'verb' },
      { id: 'w-en-4', term: 'getaway', meaning: 'short holiday trip', example: 'We planned a quick weekend getaway nearby.', partOfSpeech: 'noun' },
      { id: 'w-en-5', term: 'peaceful', meaning: 'calm and quiet', example: 'Had a wonderfully peaceful Sunday morning.', partOfSpeech: 'adjective' },
    ],
  },
  walk: {
    es: [
      { id: 'wk-es-1', term: 'dar un paseo', meaning: 'to take a walk', example: '¿Te apetece dar un paseo por la tarde?', partOfSpeech: 'verb' },
      { id: 'wk-es-2', term: 'el aire fresco', meaning: 'fresh air', example: 'Sienta genial respirar el aire fresco.', partOfSpeech: 'noun' },
      { id: 'wk-es-3', term: 'el sendero', meaning: 'the trail / path', example: 'Seguimos el sendero junto al río.', partOfSpeech: 'noun' },
      { id: 'wk-es-4', term: 'la naturaleza', meaning: 'nature', example: 'Desconectar en la naturaleza es revitalizante.', partOfSpeech: 'noun' },
      { id: 'wk-es-5', term: 'despejarse', meaning: 'to clear one’s mind', example: 'Caminar me ayuda a despejarme.', partOfSpeech: 'verb' },
    ],
    en: [
      { id: 'wk-en-1', term: 'stroll', meaning: 'a relaxed leisure walk', example: 'Let’s take a gentle stroll through the gardens.', partOfSpeech: 'noun' },
      { id: 'wk-en-2', term: 'fresh air', meaning: 'clean outdoor air', example: 'Nothing beats getting some brisk fresh air.', partOfSpeech: 'noun' },
      { id: 'wk-en-3', term: 'trail', meaning: 'path in nature or park', example: 'The forest trail was shaded and quiet.', partOfSpeech: 'noun' },
      { id: 'wk-en-4', term: 'to clear your head', meaning: 'to relieve mental stress', example: 'A quick walk always helps clear my head.', partOfSpeech: 'phrase' },
      { id: 'wk-en-5', term: 'scenery', meaning: 'natural landscape view', example: 'The mountain scenery was breathtaking.', partOfSpeech: 'noun' },
    ],
  },
  dinner: {
    es: [
      { id: 'd-es-1', term: 'la cena', meaning: 'dinner', example: '¿Qué preparamos hoy para la cena?', partOfSpeech: 'noun' },
      { id: 'd-es-2', term: 'los ingredientes', meaning: 'ingredients', example: 'Tenemos todos los ingredientes necesarios.', partOfSpeech: 'noun' },
      { id: 'd-es-3', term: 'cocinar', meaning: 'to cook', example: 'Me gusta cocinar con música de fondo.', partOfSpeech: 'verb' },
      { id: 'd-es-4', term: 'la receta', meaning: 'recipe', example: 'Es una receta casera de mi abuela.', partOfSpeech: 'noun' },
      { id: 'd-es-5', term: 'poner la mesa', meaning: 'to set the table', example: '¿Me ayudas a poner la mesa?', partOfSpeech: 'phrase' },
    ],
    en: [
      { id: 'd-en-1', term: 'dinner', meaning: 'evening main meal', example: 'What would you like for dinner tonight?', partOfSpeech: 'noun' },
      { id: 'd-en-2', term: 'ingredients', meaning: 'items used in cooking', example: 'Make sure we have all the fresh ingredients.', partOfSpeech: 'noun' },
      { id: 'd-en-3', term: 'recipe', meaning: 'set of cooking instructions', example: 'I found an easy pasta recipe online.', partOfSpeech: 'noun' },
      { id: 'd-en-4', term: 'homemade', meaning: 'made from scratch at home', example: 'There is nothing like a warm homemade meal.', partOfSpeech: 'adjective' },
      { id: 'd-en-5', term: 'to set the table', meaning: 'to prepare plates and cutlery', example: 'Could you please set the table for three?', partOfSpeech: 'phrase' },
    ],
  },
  groceries: {
    es: [
      { id: 'g-es-1', term: 'el mercado', meaning: 'the market', example: 'Voy al mercado de abastos por verdura.', partOfSpeech: 'noun' },
      { id: 'g-es-2', term: 'fresco', meaning: 'fresh', example: 'El pescado está fresquísimo hoy.', partOfSpeech: 'adjective' },
      { id: 'g-es-3', term: '¿cuánto cuesta?', meaning: 'how much is it?', example: 'Disculpe, ¿a cuánto está el kilo de uvas?', partOfSpeech: 'phrase' },
      { id: 'g-es-4', term: 'la bolsa', meaning: 'the bag', example: 'Traje mi propia bolsa reutilizable.', partOfSpeech: 'noun' },
      { id: 'g-es-5', term: 'comprar', meaning: 'to buy / purchase', example: 'Tengo que comprar pan y queso.', partOfSpeech: 'verb' },
    ],
    en: [
      { id: 'g-en-1', term: 'grocery store', meaning: 'food supermarket', example: 'I am stopping by the grocery store on my way home.', partOfSpeech: 'noun' },
      { id: 'g-en-2', term: 'fresh produce', meaning: 'fruits and vegetables', example: 'The market has fantastic organic produce.', partOfSpeech: 'noun' },
      { id: 'g-en-3', term: 'how much is this?', meaning: 'asking for the price', example: 'Excuse me, how much are these avocados?', partOfSpeech: 'phrase' },
      { id: 'g-en-4', term: 'aisle', meaning: 'passage between shelves in a shop', example: 'The spices are in the third aisle.', partOfSpeech: 'noun' },
      { id: 'g-en-5', term: 'reusable bag', meaning: 'eco shopping bag', example: 'Remember to grab your reusable bags.', partOfSpeech: 'noun' },
    ],
  },
  travel: {
    es: [
      { id: 't-es-1', term: 'el billete', meaning: 'the ticket', example: 'Tengo que comprar el billete de ida y vuelta.', partOfSpeech: 'noun' },
      { id: 't-es-2', term: 'el andén', meaning: 'the platform', example: 'El tren sale del andén número cuatro.', partOfSpeech: 'noun' },
      { id: 't-es-3', term: 'la maleta', meaning: 'the suitcase', example: 'Ya terminé de preparar la maleta.', partOfSpeech: 'noun' },
      { id: 't-es-4', term: 'el viaje', meaning: 'the journey / trip', example: '¡Que tengas muy buen viaje!', partOfSpeech: 'noun' },
      { id: 't-es-5', term: 'hacer transbordo', meaning: 'to transfer / connect', example: 'Tenemos que hacer transbordo en la estación central.', partOfSpeech: 'phrase' },
    ],
    en: [
      { id: 't-en-1', term: 'ticket', meaning: 'travel fare document', example: 'I bought a round-trip train ticket.', partOfSpeech: 'noun' },
      { id: 't-en-2', term: 'platform', meaning: 'train boarding area', example: 'The express train departs from platform five.', partOfSpeech: 'noun' },
      { id: 't-en-3', term: 'luggage', meaning: 'suitcases and travel bags', example: 'Only traveling with carry-on luggage.', partOfSpeech: 'noun' },
      { id: 't-en-4', term: 'journey', meaning: 'the act of traveling from A to B', example: 'Have a safe and pleasant journey!', partOfSpeech: 'noun' },
      { id: 't-en-5', term: 'layover / transfer', meaning: 'connection stop between journeys', example: 'We have a brief 20-minute train transfer.', partOfSpeech: 'noun' },
    ],
  },
  restaurant: {
    es: [
      { id: 'r-es-1', term: 'una mesa para dos', meaning: 'a table for two', example: 'Buenas noches, ¿tendrían una mesa para dos?', partOfSpeech: 'phrase' },
      { id: 'r-es-2', term: 'la carta', meaning: 'the menu', example: '¿Podríamos ver la carta de postres?', partOfSpeech: 'noun' },
      { id: 'r-es-3', term: 'el plato principal', meaning: 'the main course', example: 'De plato principal pediré el salmón.', partOfSpeech: 'noun' },
      { id: 'r-es-4', term: 'delicioso', meaning: 'delicious', example: 'Todo estaba realmente delicioso, gracias.', partOfSpeech: 'adjective' },
      { id: 'r-es-5', term: 'la propina', meaning: 'the tip', example: 'Dejamos una buena propina por el gran servicio.', partOfSpeech: 'noun' },
    ],
    en: [
      { id: 'r-en-1', term: 'table for two', meaning: 'dining reservation for 2 people', example: 'Could we get a table for two by the window?', partOfSpeech: 'phrase' },
      { id: 'r-en-2', term: 'the menu', meaning: 'list of dishes and prices', example: 'Could we see the dessert menu, please?', partOfSpeech: 'noun' },
      { id: 'r-en-3', term: 'main course', meaning: 'primary meal course', example: 'For the main course, I will have the roasted salmon.', partOfSpeech: 'noun' },
      { id: 'r-en-4', term: 'delicious', meaning: 'tasting exceptionally good', example: 'The food was absolutely delicious tonight.', partOfSpeech: 'adjective' },
      { id: 'r-en-5', term: 'tip / gratuity', meaning: 'extra money given for good service', example: 'We left a generous tip for the wonderful server.', partOfSpeech: 'noun' },
    ],
  },
};

export function getThemeExperience(
  themeId: string,
  languageID: string,
  meaningLanguage: string = 'Portuguese',
  level: UserProficiencyLevel = 'beginner',
  tone: ConversationTone = 'casual'
): ThemeExperience {
  const langKey = languageID?.split('-')[0]?.toLowerCase() || 'en';
  const isPt = meaningLanguage === 'Portuguese';

  const overrides = THEME_OVERRIDES[langKey] || {};
  const override = overrides[themeId];
  const foundTheme = SHARED_THEMES.find(t => t.id === themeId);
  const themeName = override?.title || foundTheme?.title || 'this topic';
  const subtitle = override?.subtitle || foundTheme?.subtitle || 'Tell me more about it';

  // Base objectives by level
  const objectives = isPt
    ? level === 'advanced'
      ? [
          `Liderar e modular a conversa de 5 min com vocabulário culto e idiomático`,
          `Debater pontos de vista complexos e resolver divergências com diplomacia executiva`,
          `Eliminar hesitações e dominar entonações nativas de alto impacto`,
        ]
      : level === 'intermediate'
      ? [
          `Sustentar uma conversa contínua de 5 minutos com cadência natural`,
          `Usar conectivos e expressões para articular ideias e opiniões`,
          `Superar pequenas dúvidas e responder a perguntas de acompanhamento`,
        ]
      : [
          `Compreender a ideia principal do tema sem pressa`,
          `Construir frases curtas, claras e bem articuladas`,
          `Fixar 5 palavras e expressões essenciais do tema`,
        ]
    : level === 'advanced'
    ? [
        `Lead and modulate a 5-minute conversation with executive, idiomatic vocabulary`,
        `Debate complex trade-offs and build consensus with diplomatic clarity`,
        `Eliminate pauses and deliver native-level persuasive intonation`,
      ]
    : level === 'intermediate'
    ? [
        `Sustain a continuous 5-minute dialogue with natural conversational flow`,
        `Employ connectors and idiomatic collocations to express viewpoints`,
        `Answer follow-up questions spontaneously without translating in your head`,
      ]
    : [
        `Grasp the core conversational situation with confidence`,
        `Formulate clear, well-pronounced short sentences`,
        `Master 5 foundational topic-specific words and phrases`,
      ];

  if (langKey === 'de') {
    const starterAssistant =
      level === 'advanced'
        ? `Guten Tag! Lassen Sie uns eine strategische Diskussion über "${themeName}" führen. Welche Kernperspektiven möchten Sie beleuchten?`
        : level === 'intermediate'
        ? `Guten Tag! Lassen Sie uns über "${themeName}" sprechen. ${subtitle}. Wie ist Ihre aktuelle Einschätzung?`
        : `Guten Tag! Willkommen zum Thema "${themeName}". ${subtitle}.`;

    const starterUser =
      level === 'advanced'
        ? `Sehr gerne. Ich möchte die wesentlichen Prioritäten und strategischen Handlungsfelder herausstellen.`
        : level === 'intermediate'
        ? `Sehr gerne! Ich möchte meine Perspektive teilen und die wichtigsten Punkte ansprechen.`
        : `Hallo! Ich freue mich darauf, heute über dieses Thema zu sprechen.`;

    const starterMeaning = isPt
      ? level === 'advanced'
        ? `Olá! Vamos conduzir uma discussão estratégica sobre "${themeName}". Quais perspectivas centrais você gostaria de destacar?`
        : level === 'intermediate'
        ? `Olá! Vamos conversar sobre "${themeName}". ${subtitle}. Qual é a sua avaliação atual?`
        : `Olá! Bem-vindo ao tema "${themeName}". ${subtitle}.`
      : level === 'advanced'
      ? `Hello! Let us conduct a strategic discussion on "${themeName}". Which core perspectives would you like to highlight?`
      : level === 'intermediate'
      ? `Hello! Let's talk about "${themeName}". ${subtitle}. What is your current assessment?`
      : `Hello! Welcome to "${themeName}". ${subtitle}.`;

    return { starterAssistant, starterUser, starterMeaning, objectives };
  }

  if (langKey === 'en') {
    const starterAssistant =
      level === 'advanced'
        ? `Good morning. Let's delve into "${themeName}". ${subtitle}. How would you articulate our primary strategic focus?`
        : level === 'intermediate'
        ? `Hi there! Let's talk about "${themeName}". ${subtitle}. What are your main thoughts on this today?`
        : `Hi there! Let's talk about "${themeName}". ${subtitle}.`;

    const starterUser =
      level === 'advanced'
        ? `I appreciate the opportunity. I'd like to frame our deliverables around high-leverage milestones and cross-functional alignment.`
        : level === 'intermediate'
        ? `Sounds great! I'd love to share my progress and highlight a few key priorities for today.`
        : `Hi! I am ready and glad to chat about this topic today.`;

    const starterMeaning = isPt
      ? level === 'advanced'
        ? `Bom dia. Vamos nos aprofundar em "${themeName}". ${subtitle}. Como você articularia nosso foco estratégico principal?`
        : level === 'intermediate'
        ? `Olá! Vamos conversar sobre "${themeName}". ${subtitle}. Quais são suas ideias principais para hoje?`
        : `Olá! Vamos conversar sobre "${themeName}". ${subtitle}.`
      : level === 'advanced'
      ? `Good morning. Let's delve into "${themeName}". ${subtitle}. How would you articulate our primary strategic focus?`
      : level === 'intermediate'
      ? `Hi there! Let's talk about "${themeName}". ${subtitle}. What are your main thoughts on this today?`
      : `Hi there! Let's talk about "${themeName}". ${subtitle}.`;

    return { starterAssistant, starterUser, starterMeaning, objectives };
  }

  if (langKey === 'es') {
    const starterAssistant =
      level === 'advanced'
        ? `¡Buenos días! Profundicemos en "${themeName}". ${subtitle}. ¿Cuáles consideras que son los factores estratégicos clave?`
        : level === 'intermediate'
        ? `¡Hola! Me encantaría hablar sobre "${themeName}". ${subtitle}. ¿Cuál es tu perspectiva actual?`
        : `¡Hola! Vamos a conversar sobre "${themeName}". ${subtitle}.`;

    const starterUser =
      level === 'advanced'
        ? `Con mucho gusto. Me gustaría enfatizar los hitos prioritarios y cómo mitigar los principales riesgos de ejecución.`
        : level === 'intermediate'
        ? `Hola, me parece excelente. Me gustaría compartir mi punto de vista y repasar las prioridades del día.`
        : `¡Hola! Me alegra mucho practicar este tema hoy.`;

    const starterMeaning = isPt
      ? `Olá! Vamos conversar sobre "${themeName}"? ${subtitle}.`
      : `Hello! Let's talk about "${themeName}". ${subtitle}.`;

    return { starterAssistant, starterUser, starterMeaning, objectives };
  }

  // Fallback for all other languages
  return {
    starterAssistant: `Hi there! Let's talk about ${themeName.toLowerCase()}. ${subtitle}.`,
    starterUser: `Sounds good! I'd love to share my thoughts on ${themeName.toLowerCase()}.`,
    starterMeaning: isPt
      ? `Olá! Vamos conversar sobre ${themeName.toLowerCase()}? ${subtitle}.`
      : `Hi there! Let's talk about ${themeName.toLowerCase()}. ${subtitle}.`,
    objectives,
  };
}

export function getThemeVocabulary(
  themeId: string,
  languageID: string,
  meaningLanguage: string = 'Portuguese',
  level: UserProficiencyLevel = 'beginner',
  tone: ConversationTone = 'casual'
): ThematicWord[] {
  const langKey = languageID?.split('-')[0]?.toLowerCase() || 'en';
  const isPt = meaningLanguage === 'Portuguese';
  const themeVocab = THEME_VOCABULARY[themeId];
  if (themeVocab && themeVocab[langKey] && themeVocab[langKey].length > 0) {
    const list = themeVocab[langKey];
    if (isPt) return list;
    return list.map(item => {
      if (item.meaning === 'cappuccino com leite de aveia') return { ...item, meaning: 'cappuccino with oat milk' };
      if (item.meaning === 'café pequeno com leite') return { ...item, meaning: 'small coffee with milk' };
      if (item.meaning === 'para viagem') return { ...item, meaning: 'to go / takeaway' };
      if (item.meaning === 'para tomar aqui') return { ...item, meaning: 'for here / stay here' };
      if (item.meaning === 'grãos de café recém moídos') return { ...item, meaning: 'freshly roasted coffee beans' };
      if (item.meaning === 'fique com o troco') return { ...item, meaning: 'keep the change' };
      return item;
    });
  }

  const foundTheme = SHARED_THEMES.find(t => t.id === themeId);

  if (langKey === 'de') {
    if (level === 'advanced') {
      return [
        { id: `${themeId}-1`, term: 'der Engpass', meaning: isPt ? 'gargalo crítico / obstáculo estrutural (bottleneck)' : 'critical bottleneck or impediment', example: 'Wir müssen diesen Engpass in der Architektur zeitnah auflösen.', partOfSpeech: 'noun', level: 'advanced' },
        { id: `${themeId}-2`, term: 'die Konsensbildung', meaning: isPt ? 'construção de consenso estratégico' : 'strategic consensus building among stakeholders', example: 'Die Konsensbildung mit allen Stakeholdern war entscheidend.', partOfSpeech: 'noun', level: 'advanced' },
        { id: `${themeId}-3`, term: 'abwägen', meaning: isPt ? 'ponderar prós e contras minuciosamente' : 'to weigh trade-offs and options carefully', example: 'Lassen Sie uns die verschiedenen Optionen sachlich abwägen.', partOfSpeech: 'verb', level: 'advanced' },
        { id: `${themeId}-4`, term: 'die Kernaussage', meaning: isPt ? 'mensagem central / aprendizado de alto impacto' : 'core strategic message or takeaway', example: 'Was ist die wesentliche Kernaussage für die Geschäftsführung?', partOfSpeech: 'noun', level: 'advanced' },
        { id: `${themeId}-5`, term: 'nachhaltig', meaning: isPt ? 'sustentável / duradouro a longo prazo' : 'sustainable and long-term resilient', example: 'Wir streben eine nachhaltige und skalierbare Lösung an.', partOfSpeech: 'adjective', level: 'advanced' },
      ];
    }
    if (level === 'intermediate') {
      return [
        { id: `${themeId}-1`, term: 'der Meilenstein', meaning: isPt ? 'marco importante ou etapa concluída' : 'key milestone or completed stage', example: 'Wir haben einen wichtigen Meilenstein im Projekt erreicht.', partOfSpeech: 'noun', level: 'intermediate' },
        { id: `${themeId}-2`, term: 'nachfassen', meaning: isPt ? 'retomar contato ou dar seguimento (follow up)' : 'to follow up or check back with someone', example: 'Ich werde heute Nachmittag beim Kunden nachfassen.', partOfSpeech: 'verb', level: 'intermediate' },
        { id: `${themeId}-3`, term: 'abstimmen', meaning: isPt ? 'alinhar / sincronizar detalhes com a equipe' : 'to coordinate and align with teammates', example: 'Lassen Sie uns die Details vor dem Release abstimmen.', partOfSpeech: 'verb', level: 'intermediate' },
        { id: `${themeId}-4`, term: 'im Zeitplan', meaning: isPt ? 'dentro do prazo previsto (on schedule)' : 'on schedule / according to timeline', example: 'Alle Lieferungen liegen vollkommen im Zeitplan.', partOfSpeech: 'phrase', level: 'intermediate' },
        { id: `${themeId}-5`, term: 'die Priorität', meaning: isPt ? 'prioridade principal da semana' : 'top priority of the week', example: 'Unsere oberste Priorität ist die Stabilität der Anwendung.', partOfSpeech: 'noun', level: 'intermediate' },
      ];
    }
    // beginner
    return [
      { id: `${themeId}-1`, term: 'das Standup', meaning: isPt ? 'reunião rápida diária de alinhamento' : 'quick daily alignment meeting (standup)', example: 'Lassen Sie uns ein kurzes Standup machen, um Hindernisse zu klären.', partOfSpeech: 'noun', level: 'beginner' },
      { id: `${themeId}-2`, term: 'das Hindernis', meaning: isPt ? 'obstáculo / impedimento (blocker)' : 'obstacle / blocker / impediment', example: 'Ich habe heute keine Hindernisse, alles läuft nach Plan.', partOfSpeech: 'noun', level: 'beginner' },
      { id: `${themeId}-3`, term: 'die Aufgabe', meaning: isPt ? 'tarefa diária ou atividade' : 'daily task or assignment', example: 'Ich habe meine Aufgabe für heute fertiggestellt.', partOfSpeech: 'noun', level: 'beginner' },
      { id: `${themeId}-4`, term: 'das Team', meaning: isPt ? 'equipe de trabalho' : 'work team / coworkers', example: 'Unser Team arbeitet sehr gut zusammen.', partOfSpeech: 'noun', level: 'beginner' },
      { id: `${themeId}-5`, term: 'bereit', meaning: isPt ? 'pronto / preparado' : 'ready / prepared', example: 'Ich bin bereit für das Gespräch.', partOfSpeech: 'adjective', level: 'beginner' },
    ];
  }

  if (langKey === 'en') {
    if (level === 'advanced') {
      return [
        { id: `${themeId}-1`, term: 'strategic alignment', meaning: isPt ? 'alinhamento estratégico entre lideranças' : 'strategic alignment across leadership', example: 'We achieved strategic alignment across all business units.', partOfSpeech: 'phrase', level: 'advanced' },
        { id: `${themeId}-2`, term: 'bottleneck', meaning: isPt ? 'gargalo estrutural ou impedimento crítico' : 'critical bottleneck limiting velocity', example: 'We mitigated the architectural bottleneck before peak hours.', partOfSpeech: 'noun', level: 'advanced' },
        { id: `${themeId}-3`, term: 'value proposition', meaning: isPt ? 'proposta de valor do projeto' : 'compelling core value proposition', example: 'Clearly articulate the value proposition to our stakeholders.', partOfSpeech: 'phrase', level: 'advanced' },
        { id: `${themeId}-4`, term: 'actionable takeaway', meaning: isPt ? 'conclusão prática e aplicável' : 'actionable decision or concrete next step', example: 'What is the most actionable takeaway from this session?', partOfSpeech: 'noun', level: 'advanced' },
        { id: `${themeId}-5`, term: 'proactive', meaning: isPt ? 'proativo / antecipando cenários' : 'proactive in mitigating downstream risks', example: 'Our proactive stance safeguarded the launch timeline.', partOfSpeech: 'adjective', level: 'advanced' },
      ];
    }
    if (level === 'intermediate') {
      return [
        { id: `${themeId}-1`, term: 'on track', meaning: isPt ? 'dentro do prazo / correndo conforme o plano' : 'progressing according to schedule', example: 'Everything is right on track for our upcoming milestone.', partOfSpeech: 'phrase', level: 'intermediate' },
        { id: `${themeId}-2`, term: 'touch base', meaning: isPt ? 'alinhar rapidamente / conversar brevemente' : 'to briefly connect and sync status', example: 'Let us touch base this afternoon to unblock design.', partOfSpeech: 'verb', level: 'intermediate' },
        { id: `${themeId}-3`, term: 'milestone', meaning: isPt ? 'marco importante ou etapa concluída' : 'key project milestone or stage', example: 'We reached an important milestone ahead of schedule.', partOfSpeech: 'noun', level: 'intermediate' },
        { id: `${themeId}-4`, term: 'follow up', meaning: isPt ? 'dar continuidade ou retomar contato' : 'to continue contact or verify next steps', example: 'I will follow up with the client by the end of the day.', partOfSpeech: 'verb', level: 'intermediate' },
        { id: `${themeId}-5`, term: 'dependency', meaning: isPt ? 'dependência entre tarefas' : 'task dependency requiring cross-team input', example: 'We have one dependency that needs to be clarified.', partOfSpeech: 'noun', level: 'intermediate' },
      ];
    }
    // beginner
    return [
      { id: `${themeId}-1`, term: 'standup', meaning: isPt ? 'reunião rápida diária de alinhamento' : 'quick daily alignment meeting', example: 'Let us do a quick standup to unblock everyone.', partOfSpeech: 'noun', level: 'beginner' },
      { id: `${themeId}-2`, term: 'blocker', meaning: isPt ? 'impedimento ou obstáculo no trabalho' : 'work obstacle or impediment (blocker)', example: 'I do not have any blockers today, everything is on track.', partOfSpeech: 'noun', level: 'beginner' },
      { id: `${themeId}-3`, term: 'task', meaning: isPt ? 'tarefa ou atividade individual' : 'individual task or work item', example: 'I completed my primary task this morning.', partOfSpeech: 'noun', level: 'beginner' },
      { id: `${themeId}-4`, term: 'update', meaning: isPt ? 'atualização de status' : 'status update on work progress', example: 'Here is a quick 1-minute update on my progress.', partOfSpeech: 'noun', level: 'beginner' },
      { id: `${themeId}-5`, term: 'ready', meaning: isPt ? 'pronto / preparado' : 'ready and prepared', example: 'I am ready to start the conversation.', partOfSpeech: 'adjective', level: 'beginner' },
    ];
  }

  if (langKey === 'es') {
    if (level === 'advanced') {
      return [
        { id: `${themeId}-1`, term: 'cuello de botella', meaning: isPt ? 'gargalo estrutural ou impedimento' : 'critical bottleneck or obstacle', example: 'Logramos mitigar el cuello de botella en los procesos.', partOfSpeech: 'noun', level: 'advanced' },
        { id: `${themeId}-2`, term: 'consenso estratégico', meaning: isPt ? 'consenso estratégico entre partes' : 'strategic consensus across departments', example: 'Es prioritario alcanzar un consenso estratégico.', partOfSpeech: 'noun', level: 'advanced' },
        { id: `${themeId}-3`, term: 'ponderar', meaning: isPt ? 'ponderar trade-offs minuciosamente' : 'to weigh options and trade-offs carefully', example: 'Debemos ponderar los riesgos antes de avanzar.', partOfSpeech: 'verb', level: 'advanced' },
        { id: `${themeId}-4`, term: 'propuesta de valor', meaning: isPt ? 'proposta de valor do projeto' : 'core value proposition', example: 'Definimos una propuesta de valor muy atractiva.', partOfSpeech: 'phrase', level: 'advanced' },
        { id: `${themeId}-5`, term: 'sostenible', meaning: isPt ? 'sustentável / resiliente a longo prazo' : 'sustainable and scalable long-term', example: 'Buscamos una solución técnica sostenible.', partOfSpeech: 'adjective', level: 'advanced' },
      ];
    }
    return [
      { id: `${themeId}-1`, term: 'sobre ruedas', meaning: isPt ? 'correndo perfeitamente / sobre rodas' : 'running smoothly / on track', example: 'Todo marcha sobre ruedas en el proyecto.', partOfSpeech: 'phrase', level: 'intermediate' },
      { id: `${themeId}-2`, term: 'el hito', meaning: isPt ? 'marco importante ou etapa concluída' : 'key milestone achieved', example: 'Alcanzamos un hito crucial esta mañana.', partOfSpeech: 'noun', level: 'intermediate' },
      { id: `${themeId}-3`, term: 'dar seguimiento', meaning: isPt ? 'dar seguimento / follow up' : 'to follow up on an action item', example: 'Voy a dar seguimiento a los puntos pendientes.', partOfSpeech: 'verb', level: 'intermediate' },
      { id: `${themeId}-4`, term: 'la prioridad', meaning: isPt ? 'prioridade principal' : 'main priority or focus', example: 'Nuestra prioridad es la calidad de entrega.', partOfSpeech: 'noun', level: 'intermediate' },
      { id: `${themeId}-5`, term: 'coordinar', meaning: isPt ? 'coordenar com o time' : 'to coordinate with teammates', example: 'Vamos a coordinar los próximos pasos.', partOfSpeech: 'verb', level: 'intermediate' },
    ];
  }

  // Multilingual fallback
  return [
    { id: `${themeId}-1`, term: 'perspective', meaning: isPt ? 'ponto de vista / perspectiva' : 'point of view / perspective', example: 'Let me share a different perspective on this.', partOfSpeech: 'noun', level },
    { id: `${themeId}-2`, term: 'milestone', meaning: isPt ? 'marco importante ou etapa concluída' : 'key project milestone or stage', example: 'We reached an important milestone ahead of schedule.', partOfSpeech: 'noun', level },
    { id: `${themeId}-3`, term: 'collaborate', meaning: isPt ? 'trabalhar em equipe / colaborar' : 'to work collaboratively together', example: "It is wonderful to collaborate with such a passionate team.", partOfSpeech: 'verb', level },
    { id: `${themeId}-4`, term: 'key takeaway', meaning: isPt ? 'ponto principal / conclusão chave' : 'main conclusion or key lesson', example: 'What is your main takeaway from the meeting?', partOfSpeech: 'noun', level },
    { id: `${themeId}-5`, term: 'action item', meaning: isPt ? 'tarefa ou ação definida para alguém' : 'assigned action item or task', example: 'Let us review the action items before we wrap up.', partOfSpeech: 'noun', level },
  ];
}

export interface ThematicPronunciationExercise {
  id: string;
  phrase: string;
  meaning: string;
  phonetic?: string;
  tip?: string;
  level: 'beginner' | 'intermediate' | 'natural';
  stage?: string;
  stepIndex?: number;
  phaseRole?: string;
}

export interface ThematicWritingExercise {
  id: string;
  type: 'translate' | 'fill-blank' | 'reply';
  prompt: string;
  context?: string;
  hint?: string;
  acceptedAnswers: string[];
  explanation: string;
  level?: UserProficiencyLevel;
}

export const LANGUAGE_ACCENTS: Record<string, string[]> = {
  en: ["'", "-", "?", "!", "\"", ",", "."],
  es: ['á', 'é', 'í', 'ó', 'ú', 'ü', 'ñ', '¿', '¡'],
  pt: ['á', 'é', 'í', 'ó', 'ú', 'â', 'ê', 'ô', 'ã', 'õ', 'ç'],
  fr: ['é', 'è', 'ê', 'ë', 'à', 'â', 'ç', 'î', 'ï', 'ô', 'ù', 'û', 'œ'],
  de: ['ä', 'ö', 'ü', 'ß'],
  nb: ['æ', 'ø', 'å'],
  it: ['à', 'è', 'é', 'ì', 'ò', 'ù'],
  ru: ['ё', 'й', 'ъ', 'ы', 'ь', 'э', 'ю', 'я'],
  el: ['ά', 'έ', 'ή', 'ί', 'ό', 'ύ', 'ώ'],
  sr: ['č', 'ć', 'đ', 'š', 'ž'],
  nl: ['é', 'ë', 'ï', 'ij'],
  tl: ['ñ', 'ng'],
  zh: ['ā', 'á', 'ǎ', 'à', 'ē', 'é', 'ě', 'è', 'ī', 'í', 'ǐ', 'ì', 'ō', 'ó', 'ǒ', 'ò', 'ū', 'ú', 'ǔ', 'ù', 'ü'],
};

export const THEME_PRONUNCIATION: Record<string, Record<string, ThematicPronunciationExercise[]>> = {
  coffee: {
    es: [
      { id: 'p-es-1', phrase: 'Quisiera un café con leche, por favor.', meaning: 'I would like a coffee with milk, please.', tip: 'Enfatiza "café" y une "con leche" de forma fluida.', level: 'beginner' },
      { id: 'p-es-2', phrase: '¿Tiene alguna opción de leche de avena?', meaning: 'Do you have any oat milk options?', tip: 'Entonación ascendente para preguntas.', level: 'intermediate' },
      { id: 'p-es-3', phrase: 'Para tomar aquí, muchas gracias.', meaning: 'For here, thank you very much.', tip: 'Pronuncia la "r" suave al final de "tomar".', level: 'beginner' },
      { id: 'p-es-4', phrase: '¿Me cobras con tarjeta, por favor?', meaning: 'Can I pay by card, please?', tip: 'Tono amigable y natural para pedir la cuenta.', level: 'natural' },
    ],
    en: [
      { id: 'p-en-1', phrase: 'Could I get a cappuccino with oat milk, please?', meaning: 'Gostaria de um cappuccino com leite de aveia, por favor.', tip: 'Connect "Could I" naturally: /kʊd aɪ/.', level: 'beginner' },
      { id: 'p-en-2', phrase: 'Is it possible to get that iced?', meaning: 'É possível fazer ele gelado?', tip: 'Light tap on the "t" sound in "get that".', level: 'intermediate' },
      { id: 'p-en-3', phrase: 'To stay or to go?', meaning: 'Para tomar aqui ou para viagem?', tip: 'Notice the rhythmic balance of the phrase.', level: 'beginner' },
      { id: 'p-en-4', phrase: 'Keep the change, have a wonderful afternoon!', meaning: 'Fique com o troco, tenha uma ótima tarde!', tip: 'Friendly falling intonation on "afternoon".', level: 'natural' },
    ],
    pt: [
      { id: 'p-pt-1', phrase: 'Um café com leite e um pão de queijo, por favor.', meaning: 'A coffee with milk and a cheese bread, please.', tip: 'Atenção ao som nasal de "pão".', level: 'beginner' },
      { id: 'p-pt-2', phrase: 'Pode passar no cartão de débito?', meaning: 'Can I pay with debit card?', tip: 'Entonação suave e convidativa.', level: 'intermediate' },
      { id: 'p-pt-3', phrase: 'É para viagem ou para tomar aqui?', meaning: 'Is it to go or to have here?', tip: 'Ritmo descontraído típico do balcão.', level: 'beginner' },
      { id: 'p-pt-4', phrase: 'O café estava delicioso, muito obrigado!', meaning: 'The coffee was delicious, thank you so much!', tip: 'Pronúncia clara do "delicioso".', level: 'natural' },
    ],
    fr: [
      { id: 'p-fr-1', phrase: 'Un café au lait et un croissant, s’il vous plaît.', meaning: 'A coffee with milk and a croissant, please.', tip: 'Liaison douce entre "un" et "café".', level: 'beginner' },
      { id: 'p-fr-2', phrase: 'C’est pour emporter ou sur place ?', meaning: 'Is it to take away or stay here?', tip: 'Le "r" guttural doux en fin de mot.', level: 'intermediate' },
      { id: 'p-fr-3', phrase: 'L’addition, s’il vous plaît.', meaning: 'The bill, please.', tip: 'Expression classique et polie.', level: 'beginner' },
    ],
    de: [
      { id: 'p-de-1', phrase: 'Einen Cappuccino mit Hafermilch, bitte.', meaning: 'A cappuccino with oat milk, please.', tip: 'Klares "ch" am Ende von Hafermilch.', level: 'beginner' },
      { id: 'p-de-2', phrase: 'Könnte ich bitte die Rechnung haben?', meaning: 'Could I please have the bill?', tip: 'Höfliche Satzmelodie am Satzende.', level: 'intermediate' },
      { id: 'p-de-3', phrase: 'Zum Hier-Trinken oder zum Mitnehmen?', meaning: 'To drink here or to take away?', tip: 'Betone "Hier" und "Mitnehmen".', level: 'beginner' },
    ],
    nb: [
      { id: 'p-nb-1', phrase: 'Jeg vil gjerne ha en kaffe latte, takk.', meaning: 'I would like a café latte, please.', tip: 'Uttal "gjerne" med myk j-lyd: /jæɳə/.', level: 'beginner' },
      { id: 'p-nb-2', phrase: 'Kan jeg få betale med kort?', meaning: 'Can I pay with card?', tip: 'Melodisk tonefall på spørsmål.', level: 'intermediate' },
      { id: 'p-nb-3', phrase: 'Ta med, takk!', meaning: 'To go, thanks!', tip: 'Kort og greit hverdagsuttrykk.', level: 'beginner' },
    ],
  },
  restaurant: {
    es: [
      { id: 'p-res-1', phrase: 'Una mesa para dos personas cerca de la ventana.', meaning: 'A table for two people near the window.', tip: 'Cadencia tranquila al llegar al restaurante.', level: 'beginner' },
      { id: 'p-res-2', phrase: '¿Qué nos recomienda como plato principal?', meaning: 'What do you recommend as a main course?', tip: 'Acento rítmico en "recomienda".', level: 'intermediate' },
      { id: 'p-res-3', phrase: 'Estaba todo riquísimo, felicitaciones al chef.', meaning: 'Everything was delicious, congratulations to the chef.', tip: 'Articulación clara de "riquísimo".', level: 'natural' },
    ],
    en: [
      { id: 'p-ren-1', phrase: 'Could we have a table for two by the window?', meaning: 'Poderíamos ter uma mesa para dois perto da janela?', tip: 'Polite rising cadence at the end.', level: 'beginner' },
      { id: 'p-ren-2', phrase: 'What would you recommend for the main course?', meaning: 'O que você recomendaria para o prato principal?', tip: 'Blend "What would you" naturally.', level: 'intermediate' },
      { id: 'p-ren-3', phrase: 'We had a wonderful dinner, thank you so much.', meaning: 'Tivemos um jantar maravilhoso, muito obrigado.', tip: 'Warm falling tone for compliments.', level: 'natural' },
    ],
    pt: [
      { id: 'p-rpt-1', phrase: 'Uma mesa para dois, por favor.', meaning: 'A table for two, please.', tip: 'Tom educado e direto ao chegar.', level: 'beginner' },
      { id: 'p-rpt-2', phrase: 'Qual é a sugestão do chefe para hoje?', meaning: 'What is the chef recommendation for today?', tip: 'Pronúncia aberta de "sugestão".', level: 'intermediate' },
      { id: 'p-rpt-3', phrase: 'A comida estava excelente, parabéns!', meaning: 'The food was excellent, congratulations!', tip: 'Entonação calorosa e expressiva.', level: 'natural' },
    ],
  },
  introductions: {
    es: [
      { id: 'p-int-es-1', phrase: 'Mucho gusto, es un placer conocerte.', meaning: 'Nice to meet you, it is a pleasure to meet you.', tip: 'Sonido suave de la "c" en conocerte.', level: 'beginner' },
      { id: 'p-int-es-2', phrase: '¿De dónde eres originalmente?', meaning: 'Where are you originally from?', tip: 'Entonación interrogativa clara en "¿De dónde?".', level: 'beginner' },
      { id: 'p-int-es-3', phrase: 'Vivo aquí desde hace un par de años.', meaning: 'I have lived here for a couple of years.', tip: 'Articula bien "desde hace".', level: 'intermediate' },
    ],
    en: [
      { id: 'p-int-en-1', phrase: 'Nice to meet you! How has your day been?', meaning: 'Prazer em te conhecer! Como foi o seu dia?', tip: 'Friendly tone with rising inflection on "been".', level: 'beginner' },
      { id: 'p-int-en-2', phrase: 'Where are you originally from?', meaning: 'De onde você é originalmente?', tip: 'Stress the word "originally".', level: 'beginner' },
      { id: 'p-int-en-3', phrase: 'I have been living here for about two years now.', meaning: 'Moro aqui há cerca de dois anos.', tip: 'Contract "I have" to "I\'ve" for natural cadence.', level: 'intermediate' },
    ],
    pt: [
      { id: 'p-int-pt-1', phrase: 'Muito prazer, é ótimo te conhecer!', meaning: 'Nice to meet you, great to meet you!', tip: 'Cadência calorosa e espontânea.', level: 'beginner' },
      { id: 'p-int-pt-2', phrase: 'De onde você é originalmente?', meaning: 'Where are you originally from?', tip: 'Entonação amigável.', level: 'beginner' },
    ],
  },
  travel: {
    es: [
      { id: 'p-tr-es-1', phrase: '¿A qué andén llega el próximo tren?', meaning: 'Which platform does the next train arrive at?', tip: 'Pronuncia "andén" con fuerza en la última sílaba.', level: 'intermediate' },
      { id: 'p-tr-es-2', phrase: 'Un billete de ida y vuelta para Madrid, por favor.', meaning: 'A round-trip ticket to Madrid, please.', tip: 'Conexión suave en "ida y vuelta".', level: 'beginner' },
    ],
    en: [
      { id: 'p-tr-en-1', phrase: 'Which platform does the train to Oxford leave from?', meaning: 'De qual plataforma sai o trem para Oxford?', tip: 'Natural cadence on destination name.', level: 'intermediate' },
      { id: 'p-tr-en-2', phrase: 'A round-trip ticket to central station, please.', meaning: 'Uma passagem de ida e volta para a estação central, por favor.', tip: 'Clear stress on "round-trip".', level: 'beginner' },
    ],
    pt: [
      { id: 'p-tr-pt-1', phrase: 'De qual plataforma sai o próximo trem?', meaning: 'Which platform does the next train leave from?', tip: 'Entonação interrogativa natural.', level: 'intermediate' },
      { id: 'p-tr-pt-2', phrase: 'Uma passagem de ida e volta, por favor.', meaning: 'A round-trip ticket, please.', tip: 'Fácil e direto.', level: 'beginner' },
    ],
  },
};

export const THEME_WRITING: Record<string, Record<string, ThematicWritingExercise[]>> = {
  coffee: {
    es: [
      {
        id: 'w-es-1',
        type: 'translate',
        prompt: 'Traduce al español: "A coffee with milk, please."',
        hint: 'Usa "con leche" y añade "por favor".',
        acceptedAnswers: ['un café con leche, por favor', 'un cafe con leche por favor', 'un café con leche por favor.', 'quisiera un café con leche, por favor'],
        explanation: 'En español, "un café con leche" es la expresión cotidiana. Recuerda el acento en "café".',
      },
      {
        id: 'w-es-2',
        type: 'fill-blank',
        prompt: 'Completa la frase: "¿Para tomar aquí o para ___?" (para llevar)',
        hint: 'Verbo en infinitivo que significa transportar o llevar.',
        acceptedAnswers: ['llevar', 'para llevar'],
        explanation: '"Para llevar" es la expresión habitual en cafeterías para comida o bebida para llevar.',
      },
      {
        id: 'w-es-3',
        type: 'reply',
        prompt: 'El camarero pregunta: "¿Desea algo de comer?"\nResponde que quieres un cruasán.',
        context: 'El camarero te mira amablemente detrás del mostrador.',
        hint: 'Puedes decir: "Un cruasán, por favor" o "Un croissant, gracias".',
        acceptedAnswers: ['un cruasán, por favor', 'un cruasán por favor', 'un croissant, por favor', 'un croissant por favor', 'un cruasán, gracias'],
        explanation: 'Tanto "cruasán" (forma adaptada) como "croissant" se entienden perfectamente en todo el mundo hispanohablante.',
      },
      {
        id: 'w-es-4',
        type: 'translate',
        prompt: 'Traduce: "Can I pay by card?"',
        hint: 'Pregunta usando "con tarjeta".',
        acceptedAnswers: ['¿puedo pagar con tarjeta?', 'puedo pagar con tarjeta?', '¿se puede pagar con tarjeta?', 'puedo pagar con tarjeta', 'se puede pagar con tarjeta?'],
        explanation: '"¿Puedo pagar con tarjeta?" es una fórmula educada y universal para consultar el método de pago.',
      },
    ],
    en: [
      {
        id: 'w-en-1',
        type: 'translate',
        prompt: 'Translate to English: "Um café pequeno com leite, por favor."',
        hint: 'Use "small coffee with milk".',
        acceptedAnswers: ['a small coffee with milk, please', 'a small coffee with milk please', 'a small coffee with milk, please.', 'could i have a small coffee with milk, please'],
        explanation: '"A small coffee with milk, please" is clear, polite, and completely natural.',
      },
      {
        id: 'w-en-2',
        type: 'fill-blank',
        prompt: 'Complete the sentence: "Could I have a cappuccino ___ oat milk?"',
        hint: 'Preposition meaning accompanied by.',
        acceptedAnswers: ['with'],
        explanation: 'We use "with" to specify milk choices or flavor shots in coffee drinks.',
      },
      {
        id: 'w-en-3',
        type: 'reply',
        prompt: 'The barista asks: "For here or to go?"\nReply that it is to go.',
        context: 'You are ordering on your way to work.',
        hint: 'Say: "To go, please."',
        acceptedAnswers: ['to go, please', 'to go please', 'to go, please.', 'it is to go, please', "it's to go, please"],
        explanation: '"To go, please" (or "Takeaway, please" in British English) clearly specifies your choice.',
      },
    ],
    pt: [
      {
        id: 'w-pt-1',
        type: 'translate',
        prompt: 'Escreva em português: "A coffee with milk, please."',
        hint: 'Use "um café com leite".',
        acceptedAnswers: ['um café com leite, por favor', 'um cafe com leite por favor', 'um café com leite por favor.', 'eu gostaria de um café com leite, por favor'],
        explanation: '"Um café com leite, por favor" é a expressão mais comum no Brasil e em Portugal.',
      },
      {
        id: 'w-pt-2',
        type: 'fill-blank',
        prompt: 'Complete a frase: "É para viagem ou para tomar ___?"',
        hint: 'Palavra que indica este local.',
        acceptedAnswers: ['aqui'],
        explanation: '"Para tomar aqui" indica consumo dentro do café.',
      },
      {
        id: 'w-pt-3',
        type: 'reply',
        prompt: 'O atendente pergunta: "Crédito ou débito?"\nResponda que prefere no débito.',
        context: 'Hora de pagar no balcão.',
        hint: 'Responda: "No débito, por favor."',
        acceptedAnswers: ['no débito, por favor', 'no debito por favor', 'débito, por favor', 'debito por favor', 'no débito', 'débito'],
        explanation: '"No débito, por favor" é a resposta natural e rápida.',
      },
    ],
    fr: [
      {
        id: 'w-fr-1',
        type: 'translate',
        prompt: 'Traduisez en français : "A coffee with milk, please."',
        hint: 'Utilisez "un café au lait".',
        acceptedAnswers: ['un café au lait, s’il vous plaît', 'un cafe au lait sil vous plait', 'un café au lait, s\'il vous plaît', 'un café au lait s\'il vous plaît'],
        explanation: '"Un café au lait, s\'il vous plaît" est la formule standard polie.',
      },
      {
        id: 'w-fr-2',
        type: 'fill-blank',
        prompt: 'Complétez : "C’est pour emporter ou sur ___ ?"',
        hint: 'Endroit où l\'on reste pour consommer.',
        acceptedAnswers: ['place', 'sur place'],
        explanation: '"Sur place" signifie consommer à l\'intérieur de l\'établissement.',
      },
    ],
    de: [
      {
        id: 'w-de-1',
        type: 'translate',
        prompt: 'Übersetzen Sie: "A cappuccino with oat milk, please."',
        hint: 'Nutzen Sie "Einen Cappuccino mit Hafermilch, bitte".',
        acceptedAnswers: ['einen cappuccino mit hafermilch, bitte', 'einen cappuccino mit hafermilch bitte', 'einen cappuccino mit hafermilch, bitte.'],
        explanation: 'Im Deutschen steht der Akkusativ "Einen Cappuccino".',
      },
    ],
    nb: [
      {
        id: 'w-nb-1',
        type: 'translate',
        prompt: 'Oversett til norsk: "A coffee, please."',
        hint: 'Bruk "En kaffe, takk."',
        acceptedAnswers: ['en kaffe, takk', 'en kaffe takk', 'en kaffe, takk.', 'jeg vil gjerne ha en kaffe, takk'],
        explanation: '"En kaffe, takk" er den naturlige og høflige måten å bestille på.',
      },
    ],
  },
  restaurant: {
    es: [
      {
        id: 'w-res-es-1',
        type: 'translate',
        prompt: 'Traduce al español: "A table for two, please."',
        hint: 'Usa "una mesa para dos".',
        acceptedAnswers: ['una mesa para dos, por favor', 'una mesa para dos personas, por favor', 'una mesa para dos por favor'],
        explanation: '"Una mesa para dos, por favor" es la manera estándar y cortés de solicitar mesa.',
      },
      {
        id: 'w-res-es-2',
        type: 'fill-blank',
        prompt: 'Completa: "¿Nos trae la ___ cuando pueda, por favor?" (para pagar)',
        hint: 'Documento donde se detalla el total consumido.',
        acceptedAnswers: ['cuenta', 'la cuenta'],
        explanation: '"La cuenta" es la palabra universal para pedir el total a pagar en un restaurante.',
      },
    ],
    en: [
      {
        id: 'w-res-en-1',
        type: 'translate',
        prompt: 'Translate to English: "A table for two, please."',
        hint: 'Use "table for two".',
        acceptedAnswers: ['a table for two, please', 'a table for two please', 'table for two, please'],
        explanation: '"A table for two, please" is standard dining etiquette.',
      },
    ],
    pt: [
      {
        id: 'w-res-pt-1',
        type: 'translate',
        prompt: 'Escreva em português: "A table for two, please."',
        hint: 'Use "uma mesa para dois".',
        acceptedAnswers: ['uma mesa para dois, por favor', 'uma mesa para dois por favor'],
        explanation: '"Uma mesa para dois, por favor" é a saudação ao garçom na recepção.',
      },
    ],
  },
};

export function getThemePronunciationExercises(
  themeId: string,
  languageID: string,
  meaningLanguage: string = 'Portuguese',
  level: UserProficiencyLevel = 'beginner',
  tone: ConversationTone = 'casual'
): ThematicPronunciationExercise[] {
  const langKey = languageID?.split('-')[0]?.toLowerCase() || 'en';
  const isPt = meaningLanguage === 'Portuguese';

  // -------------------------------------------------------------
  // 5-MINUTE CONVERSATION SIMULATION TEMPLATE
  // 4 sequential steps:
  // Step 1: 0:00 - 1:00 • Warm-up & Greeting
  // Step 2: 1:00 - 2:30 • Core Discussion & Update
  // Step 3: 2:30 - 4:00 • Deepening & Collaboration
  // Step 4: 4:00 - 5:00 • Wrap-up & Next Steps
  // -------------------------------------------------------------

  if (langKey === 'de') {
    if (level === 'advanced') {
      return [
        {
          id: `${themeId}-de-p1`,
          stepIndex: 1,
          stage: isPt ? '0:00 - 1:00 • Abertura & Saudação' : '0:00 - 1:00 • Warm-up & Greeting',
          phaseRole: isPt ? 'Abertura Estratégica' : 'Strategic Framing',
          phrase: `Guten Morgen allerseits. Lassen Sie uns die strategische Ausrichtung und unsere Kernprioritäten abstimmen.`,
          meaning: isPt ? `Bom dia a todos. Vamos alinhar a direção estratégica e nossas prioridades centrais.` : `Good morning everyone. Let us align our strategic direction and core priorities.`,
          tip: isPt ? 'Entonação firme e pausada; enfatize "strategische Ausrichtung" com autoridade.' : 'Firm and composed intonation; emphasize "strategische Ausrichtung" with authority.',
          level: 'natural',
        },
        {
          id: `${themeId}-de-p2`,
          stepIndex: 2,
          stage: isPt ? '1:00 - 2:30 • Ponto Central & Atualização' : '1:00 - 2:30 • Core Discussion & Update',
          phaseRole: isPt ? 'Ponto Central Executivo' : 'Executive Overview',
          phrase: `Dank proaktiver Maßnahmen konnten wir den kritischen Engpass in den Prozessen erfolgreich beseitigen.`,
          meaning: isPt ? `Graças a medidas proativas, conseguimos eliminar com sucesso o gargalo crítico nos processos.` : `Thanks to proactive measures, we successfully eliminated the critical process bottleneck.`,
          tip: isPt ? 'Atenção à pronúncia limpa de "proaktiver Maßnahmen" e "beseitigen".' : 'Clean articulation of "proaktiver Maßnahmen" and "beseitigen".',
          level: 'natural',
        },
        {
          id: `${themeId}-de-p3`,
          stepIndex: 3,
          stage: isPt ? '2:30 - 4:00 • Aprofundamento & Perguntas' : '2:30 - 4:00 • Deepening & Collaboration',
          phaseRole: isPt ? 'Aprofundamento & Trade-offs' : 'Strategic Alignment',
          phrase: `Unser Augenmerk gilt nun der nachhaltigen Skalierung sowie der Konsensbildung mit allen maßgeblichen Stakeholdern.`,
          meaning: isPt ? `Nossa atenção se volta agora para a escalabilidade sustentável e a construção de consenso com as partes interessadas.` : `Our focus is now on sustainable scaling and building consensus with key stakeholders.`,
          tip: isPt ? 'Mantenha o fôlego suave e cadenciado em orações compostas longas.' : 'Maintain a calm, measured breath across long compound German sentences.',
          level: 'natural',
        },
        {
          id: `${themeId}-de-p4`,
          stepIndex: 4,
          stage: isPt ? '4:00 - 5:00 • Conclusão & Próximos Passos' : '4:00 - 5:00 • Wrap-up & Next Steps',
          phaseRole: isPt ? 'Conclusão & Accountability' : 'Accountability & Wrap-up',
          phrase: `Ich fasse die wesentlichen Action Items zusammen und trage Sorge für deren zügige und transparente Umsetzung.`,
          meaning: isPt ? `Resumo os itens de ação essenciais e asseguro sua implementação rápida e transparente.` : `I summarize the core action items and ensure their prompt, transparent execution.`,
          tip: isPt ? 'Cadência descendente conclusiva no fechamento do diálogo de 5 minutos.' : 'Decisive falling cadence to close the 5-minute conversation exchange.',
          level: 'natural',
        },
      ];
    }

    if (level === 'intermediate') {
      return [
        {
          id: `${themeId}-de-p1`,
          stepIndex: 1,
          stage: isPt ? '0:00 - 1:00 • Abertura & Saudação' : '0:00 - 1:00 • Warm-up & Greeting',
          phaseRole: isPt ? 'Abertura & Conexão' : 'Opening & Check-in',
          phrase: `Guten Morgen Team! Lasst uns kurz abstimmen, damit wir heute alle auf demselben Stand sind.`,
          meaning: isPt ? `Bom dia equipe! Vamos nos alinhar rapidamente para que todos fiquemos na mesma página hoje.` : `Good morning team! Let's do a quick sync so we all stay on the same page today.`,
          tip: isPt ? 'Conecte "damit wir" suavemente; use tom colaborativo e aberto.' : 'Connect "damit wir" smoothly; adopt an open, collaborative tone.',
          level: 'intermediate',
        },
        {
          id: `${themeId}-de-p2`,
          stepIndex: 2,
          stage: isPt ? '1:00 - 2:30 • Ponto Central & Atualização' : '1:00 - 2:30 • Core Discussion & Update',
          phaseRole: isPt ? 'Ponto Central' : 'Status & Progress',
          phrase: `Gestern habe ich den Meilenstein abgeschlossen, sodass wir heute mit dem nächsten Teil starten können.`,
          meaning: isPt ? `Ontem concluí o marco do projeto, de modo que hoje podemos iniciar a próxima etapa.` : `Yesterday I wrapped up the milestone, so we can start the next phase today.`,
          tip: isPt ? 'Observe a subordinação com "sodass" e o verbo conjugado "können" no final.' : 'Notice the subordination with "sodass" and modal verb "können" at the end.',
          level: 'intermediate',
        },
        {
          id: `${themeId}-de-p3`,
          stepIndex: 3,
          stage: isPt ? '2:30 - 4:00 • Aprofundamento & Perguntas' : '2:30 - 4:00 • Deepening & Collaboration',
          phaseRole: isPt ? 'Aprofundamento & Bloqueios' : 'Discussion & Blockers',
          phrase: `Heute arbeite ich an den Details, allerdings müssen wir noch eine wichtige Abhängigkeit im Backend klären.`,
          meaning: isPt ? `Hoje trabalho nos detalhes, contudo ainda precisamos esclarecer uma dependência importante no backend.` : `Today I work on the details, though we still need to clarify an important backend dependency.`,
          tip: isPt ? 'Use o conector "allerdings" com uma leve pausa rítmica antes dele.' : 'Use connector "allerdings" with a light natural pause right before it.',
          level: 'intermediate',
        },
        {
          id: `${themeId}-de-p4`,
          stepIndex: 4,
          stage: isPt ? '4:00 - 5:00 • Conclusão & Próximos Passos' : '4:00 - 5:00 • Wrap-up & Next Steps',
          phaseRole: isPt ? 'Conclusão & Apoio' : 'Next Steps & Support',
          phrase: `Alles liegt gut im Zeitplan. Wenn jemand Unterstützung braucht, gebt mir einfach Bescheid!`,
          meaning: isPt ? `Tudo está dentro do prazo. Se alguém precisar de ajuda, é só me avisar!` : `Everything is on schedule. If anyone needs assistance, just let me know!`,
          tip: isPt ? 'Entonação amigável e encorajadora em "gebt mir einfach Bescheid".' : 'Friendly, encouraging intonation on "gebt mir einfach Bescheid".',
          level: 'intermediate',
        },
      ];
    }

    // beginner (de)
    return [
      {
        id: `${themeId}-de-p1`,
        stepIndex: 1,
        stage: isPt ? '0:00 - 1:00 • Abertura & Saudação' : '0:00 - 1:00 • Warm-up & Greeting',
        phaseRole: isPt ? 'Abertura Simples' : 'Simple Greeting',
        phrase: `Guten Tag! Ich freue mich auf unser heutiges Gespräch.`,
        meaning: isPt ? `Olá! Estou feliz em participar da nossa conversa de hoje.` : `Hello! I am happy to take part in our conversation today.`,
        tip: isPt ? 'Pronuncie as palavras com calma e ritmo firme. Atenção ao "ch" em "freue mich".' : 'Pronounce words calmly with steady rhythm. Soft "ch" sound in "freue mich".',
        level: 'beginner',
      },
      {
        id: `${themeId}-de-p2`,
        stepIndex: 2,
        stage: isPt ? '1:00 - 2:30 • Ponto Central & Atualização' : '1:00 - 2:30 • Core Discussion & Update',
        phaseRole: isPt ? 'Ponto Central' : 'Core Statement',
        phrase: `Gestern habe ich meine Hauptaufgabe erfolgreich abgeschlossen.`,
        meaning: isPt ? `Ontem concluí minha tarefa principal com sucesso.` : `Yesterday I completed my main task successfully.`,
        tip: isPt ? 'Enfatize "Hauptaufgabe" dividindo em Haupt + Aufgabe.' : 'Emphasize "Hauptaufgabe" by splitting into Haupt + Aufgabe.',
        level: 'beginner',
      },
      {
        id: `${themeId}-de-p3`,
        stepIndex: 3,
        stage: isPt ? '2:30 - 4:00 • Aprofundamento & Perguntas' : '2:30 - 4:00 • Deepening & Collaboration',
        phaseRole: isPt ? 'Status Atual' : 'Current Status',
        phrase: `Heute arbeite ich an der neuen Funktion mit dem Team.`,
        meaning: isPt ? `Hoje trabalho na nova funcionalidade com a equipe.` : `Today I work on the new feature with the team.`,
        tip: isPt ? 'Conecte "mit dem Team" suavemente.' : 'Connect "mit dem Team" naturally.',
        level: 'beginner',
      },
      {
        id: `${themeId}-de-p4`,
        stepIndex: 4,
        stage: isPt ? '4:00 - 5:00 • Conclusão & Próximos Passos' : '4:00 - 5:00 • Wrap-up & Next Steps',
        phaseRole: isPt ? 'Fechamento' : 'Wrap-up',
        phrase: `Ich habe heute keine Hindernisse. Vielen Dank an alle!`,
        meaning: isPt ? `Não tenho impedimentos hoje. Muito obrigado a todos!` : `I have no blockers today. Thank you very much everyone!`,
        tip: isPt ? 'Pronúncia clara de "keine Hindernisse".' : 'Clear pronunciation of "keine Hindernisse".',
        level: 'beginner',
      },
    ];
  }

  if (langKey === 'en') {
    if (level === 'advanced') {
      return [
        {
          id: `${themeId}-en-p1`,
          stepIndex: 1,
          stage: isPt ? '0:00 - 1:00 • Abertura & Saudação' : '0:00 - 1:00 • Warm-up & Greeting',
          phaseRole: isPt ? 'Abertura Estratégica' : 'Executive Framing',
          phrase: `Good morning all. I would like to frame our discussion around strategic milestones and release velocity.`,
          meaning: isPt ? `Bom dia a todos. Gostaria de enquadrar nossa discussão em torno de marcos estratégicos e velocidade de entrega.` : `Good morning all. I would like to frame our discussion around strategic milestones and release velocity.`,
          tip: isPt ? 'Ritmo executivo pausado; conecte "frame our" como /freɪmaʊər/.' : 'Measured executive rhythm; connect "frame our" smoothly as /freɪmaʊər/.',
          level: 'natural',
        },
        {
          id: `${themeId}-en-p2`,
          stepIndex: 2,
          stage: isPt ? '1:00 - 2:30 • Ponto Central & Atualização' : '1:00 - 2:30 • Core Discussion & Update',
          phaseRole: isPt ? 'Ponto Central Executivo' : 'Deliverables & Metrics',
          phrase: `Yesterday we mitigated an architectural bottleneck, ensuring sub-second response times and resilient performance.`,
          meaning: isPt ? `Ontem mitigamos um gargalo arquitetural, garantindo tempos de resposta abaixo de um segundo e performance resiliente.` : `Yesterday we mitigated an architectural bottleneck, ensuring sub-second response times and resilient performance.`,
          tip: isPt ? 'Enfatize "architectural bottleneck" e "resilient performance".' : 'Stress "architectural bottleneck" and "resilient performance" with clarity.',
          level: 'natural',
        },
        {
          id: `${themeId}-en-p3`,
          stepIndex: 3,
          stage: isPt ? '2:30 - 4:00 • Aprofundamento & Perguntas' : '2:30 - 4:00 • Deepening & Collaboration',
          phaseRole: isPt ? 'Alinhamento & Dependências' : 'Stakeholder Consensus',
          phrase: `Today my priority is orchestrating stakeholder alignment to ensure seamless cross-functional execution.`,
          meaning: isPt ? `Hoje minha prioridade é articular o alinhamento das partes interessadas para garantir execução multidisciplinar sem atritos.` : `Today my priority is orchestrating stakeholder alignment to ensure seamless cross-functional execution.`,
          tip: isPt ? 'Pronuncie "seamless cross-functional execution" com entonação contínua e sem quebras.' : 'Pronounce "seamless cross-functional execution" with an unbroken melodic arc.',
          level: 'natural',
        },
        {
          id: `${themeId}-en-p4`,
          stepIndex: 4,
          stage: isPt ? '4:00 - 5:00 • Conclusão & Próximos Passos' : '4:00 - 5:00 • Wrap-up & Next Steps',
          phaseRole: isPt ? 'Conclusão & Accountability' : 'Accountability Matrix',
          phrase: `I will document the actionable takeaways and follow up with the key stakeholders before the end of the day.`,
          meaning: isPt ? `Vou documentar os pontos práticos e dar seguimento com os principais envolvidos até o fim do dia.` : `I will document the actionable takeaways and follow up with the key stakeholders before the end of the day.`,
          tip: isPt ? 'Cadência descendente assertiva ao concluir a conversa de 5 minutos.' : 'Assertive falling cadence to close the 5-minute conversation exchange.',
          level: 'natural',
        },
      ];
    }

    if (level === 'intermediate') {
      return [
        {
          id: `${themeId}-en-p1`,
          stepIndex: 1,
          stage: isPt ? '0:00 - 1:00 • Abertura & Saudação' : '0:00 - 1:00 • Warm-up & Greeting',
          phaseRole: isPt ? 'Abertura & Conexão' : 'Warm-up & Sync',
          phrase: `Morning team! Let's do a quick sync so we can stay aligned on our key priorities today.`,
          meaning: isPt ? `Bom dia equipe! Vamos fazer um alinhamento rápido para mantermos o foco nas prioridades de hoje.` : `Morning team! Let's do a quick sync so we can stay aligned on our key priorities today.`,
          tip: isPt ? 'Conecte as palavras: "so we can stay aligned" soa como um único bloco rítmico.' : 'Blend "so we can stay aligned" into a single rhythmic flow.',
          level: 'intermediate',
        },
        {
          id: `${themeId}-en-p2`,
          stepIndex: 2,
          stage: isPt ? '1:00 - 2:30 • Ponto Central & Atualização' : '1:00 - 2:30 • Core Discussion & Update',
          phaseRole: isPt ? 'Ponto Central' : 'Progress & Status',
          phrase: `Yesterday I wrapped up the initial implementation, though we still need to verify a couple of edge cases.`,
          meaning: isPt ? `Ontem finalizei a implementação inicial, embora ainda precisemos verificar alguns casos de borda.` : `Yesterday I wrapped up the initial implementation, though we still need to verify a couple of edge cases.`,
          tip: isPt ? 'Phrasal verb natural: "wrapped up" soa como /ræpt ʌp/.' : 'Natural phrasal verb: "wrapped up" sounds like /ræpt ʌp/.',
          level: 'intermediate',
        },
        {
          id: `${themeId}-en-p3`,
          stepIndex: 3,
          stage: isPt ? '2:30 - 4:00 • Aprofundamento & Perguntas' : '2:30 - 4:00 • Deepening & Collaboration',
          phaseRole: isPt ? 'Aprofundamento & Dependências' : 'Collaboration & Next Focus',
          phrase: `Today my focus is collaborating with design so we can prevent any downstream bottlenecks.`,
          meaning: isPt ? `Hoje meu foco é colaborar com design para prevenir qualquer gargalo adiante.` : `Today my focus is collaborating with design so we can prevent any downstream bottlenecks.`,
          tip: isPt ? 'Mantenha o ritmo relaxado ao pronunciar "downstream bottlenecks".' : 'Keep a relaxed rhythm pronouncing "downstream bottlenecks".',
          level: 'intermediate',
        },
        {
          id: `${themeId}-en-p4`,
          stepIndex: 4,
          stage: isPt ? '4:00 - 5:00 • Conclusão & Próximos Passos' : '4:00 - 5:00 • Wrap-up & Next Steps',
          phaseRole: isPt ? 'Conclusão & Suporte' : 'Next Steps & Support',
          phrase: `Everything is right on track. Feel free to ping me if anyone needs an extra hand!`,
          meaning: isPt ? `Tudo está correndo dentro do prazo. Fiquem à vontade para me chamar se precisarem de uma ajuda extra!` : `Everything is right on track. Feel free to ping me if anyone needs an extra hand!`,
          tip: isPt ? 'Expressão idiomática casual: "Feel free to ping me" com entonação amigável.' : 'Casual idiom: "Feel free to ping me" with a warm tone.',
          level: 'intermediate',
        },
      ];
    }

    // beginner (en)
    return [
      {
        id: `${themeId}-en-p1`,
        stepIndex: 1,
        stage: isPt ? '0:00 - 1:00 • Abertura & Saudação' : '0:00 - 1:00 • Warm-up & Greeting',
        phaseRole: isPt ? 'Abertura Simples' : 'Simple Greeting',
        phrase: `Good morning everyone! I am ready to talk about this topic today.`,
        meaning: isPt ? `Bom dia a todos! Estou pronto para conversar sobre este tema hoje.` : `Good morning everyone! I am ready to talk about this topic today.`,
        tip: isPt ? 'Conecte "Good morning" com clareza e ritmo suave.' : 'Connect "Good morning" clearly with a smooth rhythm.',
        level: 'beginner',
      },
      {
        id: `${themeId}-en-p2`,
        stepIndex: 2,
        stage: isPt ? '1:00 - 2:30 • Ponto Central & Atualização' : '1:00 - 2:30 • Core Discussion & Update',
        phaseRole: isPt ? 'Ponto Central' : 'Core Statement',
        phrase: `Yesterday I completed my main task on time.`,
        meaning: isPt ? `Ontem concluí minha tarefa principal no prazo.` : `Yesterday I completed my main task on time.`,
        tip: isPt ? 'Pronuncie o final "-ed" em "completed" de forma limpa: /kəmˈpliːtɪd/.' : 'Clear pronunciation of "-ed" in "completed": /kəmˈpliːtɪd/.',
        level: 'beginner',
      },
      {
        id: `${themeId}-en-p3`,
        stepIndex: 3,
        stage: isPt ? '2:30 - 4:00 • Aprofundamento & Perguntas' : '2:30 - 4:00 • Deepening & Collaboration',
        phaseRole: isPt ? 'Status Atual' : 'Current Status',
        phrase: `Today I am working on the next feature with my team.`,
        meaning: isPt ? `Hoje estou trabalhando na próxima funcionalidade com minha equipe.` : `Today I am working on the next feature with my team.`,
        tip: isPt ? 'Enfatize "next feature" com clareza.' : 'Stress "next feature" clearly.',
        level: 'beginner',
      },
      {
        id: `${themeId}-en-p4`,
        stepIndex: 4,
        stage: isPt ? '4:00 - 5:00 • Conclusão & Próximos Passos' : '4:00 - 5:00 • Wrap-up & Next Steps',
        phaseRole: isPt ? 'Fechamento' : 'Wrap-up',
        phrase: `I do not have any blockers today. Thank you everyone!`,
        meaning: isPt ? `Não tenho impedimentos hoje. Muito obrigado a todos!` : `I do not have any blockers today. Thank you everyone!`,
        tip: isPt ? 'Entonação amigável e descendente no agradecimento final.' : 'Friendly falling intonation on the final thank you.',
        level: 'beginner',
      },
    ];
  }

  // Multilingual / Other languages 5-minute template
  const exp = getThemeExperience(themeId, languageID, meaningLanguage, level, tone);
  const vocab = getThemeVocabulary(themeId, languageID, meaningLanguage, level, tone);

  return [
    {
      id: `${themeId}-p1`,
      stepIndex: 1,
      stage: isPt ? '0:00 - 1:00 • Abertura & Saudação' : '0:00 - 1:00 • Warm-up & Greeting',
      phaseRole: isPt ? 'Abertura' : 'Warm-up',
      phrase: exp.starterAssistant,
      meaning: exp.starterMeaning,
      tip: isPt ? 'Pratique a entonação natural da saudação.' : 'Practice the natural greeting intonation.',
      level: 'beginner',
    },
    {
      id: `${themeId}-p2`,
      stepIndex: 2,
      stage: isPt ? '1:00 - 2:30 • Ponto Central & Atualização' : '1:00 - 2:30 • Core Discussion & Update',
      phaseRole: isPt ? 'Ponto Central' : 'Core Update',
      phrase: exp.starterUser,
      meaning: isPt ? 'Sua fala principal no tema' : 'Your central response on the topic',
      tip: isPt ? 'Conecte as palavras com ritmo fluído.' : 'Connect words with fluid rhythm.',
      level: 'intermediate',
    },
    {
      id: `${themeId}-p3`,
      stepIndex: 3,
      stage: isPt ? '2:30 - 4:00 • Aprofundamento & Perguntas' : '2:30 - 4:00 • Deepening & Collaboration',
      phaseRole: isPt ? 'Aprofundamento' : 'Deepening',
      phrase: vocab[0]?.example || `I am focusing on our next milestone today.`,
      meaning: `${vocab[0]?.term}: ${vocab[0]?.meaning}`,
      tip: isPt ? `Enfatize o termo chave: "${vocab[0]?.term}".` : `Emphasize key term: "${vocab[0]?.term}".`,
      level: 'intermediate',
    },
    {
      id: `${themeId}-p4`,
      stepIndex: 4,
      stage: isPt ? '4:00 - 5:00 • Conclusão & Próximos Passos' : '4:00 - 5:00 • Wrap-up & Next Steps',
      phaseRole: isPt ? 'Conclusão' : 'Wrap-up',
      phrase: vocab[1]?.example || `Everything is progressing smoothly. Thank you!`,
      meaning: `${vocab[1]?.term}: ${vocab[1]?.meaning}`,
      tip: isPt ? 'Entonação conclusiva firme e natural.' : 'Firm and natural concluding intonation.',
      level: 'natural',
    },
  ];
}

export function getThemeWritingExercises(
  themeId: string,
  languageID: string,
  meaningLanguage: string = 'Portuguese',
  level: UserProficiencyLevel = 'beginner',
  tone: ConversationTone = 'casual'
): ThematicWritingExercise[] {
  const langKey = languageID?.split('-')[0]?.toLowerCase() || 'en';
  const isPt = meaningLanguage === 'Portuguese';

  const vocab = getThemeVocabulary(themeId, languageID, meaningLanguage, level, tone);
  const exp = getThemeExperience(themeId, languageID, meaningLanguage, level, tone);
  const foundTheme = SHARED_THEMES.find(t => t.id === themeId);

  const w1 = vocab[0];
  const w2 = vocab[1];

  if (langKey === 'de') {
    if (level === 'advanced') {
      return [
        {
          id: `${themeId}-de-w1`,
          type: 'translate',
          prompt: isPt
            ? `Como se diz em alemão a expressão executiva: "${w1.meaning}"?`
            : `How do you translate the executive German term: "${w1.meaning}"?`,
          hint: isPt
            ? `Começa com "${w1.term.charAt(0)}" (${w1.term.length} letras).`
            : `Starts with "${w1.term.charAt(0)}" (${w1.term.length} letters).`,
          acceptedAnswers: [w1.term.toLowerCase().trim()],
          explanation: isPt
            ? `"${w1.term}" é o termo em alemão para "${w1.meaning}". Exemplo: "${w1.example}".`
            : `"${w1.term}" is the German term for "${w1.meaning}". Example: "${w1.example}".`,
          level: 'advanced',
        },
        {
          id: `${themeId}-de-w2`,
          type: 'fill-blank',
          prompt: isPt
            ? `Complete a declaração estratégica com o termo correto: "${(w2.example || w2.term).replace(new RegExp(w2.term, 'gi'), '___')}"`
            : `Complete the strategic statement with the missing term: "${(w2.example || w2.term).replace(new RegExp(w2.term, 'gi'), '___')}"`,
          hint: isPt ? `Significa "${w2.meaning}".` : `Means "${w2.meaning}".`,
          acceptedAnswers: [w2.term.toLowerCase().trim()],
          explanation: isPt
            ? `O termo correto é "${w2.term}" (${w2.meaning}).`
            : `The correct term is "${w2.term}" (${w2.meaning}).`,
          level: 'advanced',
        },
        {
          id: `${themeId}-de-w3`,
          type: 'reply',
          prompt: isPt
            ? `Responda com postura executiva à pergunta: "${exp.starterAssistant}"`
            : `Reply with executive presence to: "${exp.starterAssistant}"`,
          context: isPt ? `Contexto: ${foundTheme?.situation || 'Discussão executiva de alto nível.'}` : `Context: ${foundTheme?.situation || 'High-level executive discussion.'}`,
          hint: isPt ? `Sugestão: "${exp.starterUser}"` : `Suggested: "${exp.starterUser}"`,
          acceptedAnswers: [
            exp.starterUser.toLowerCase().trim().replace(/[.!?]/g, ''),
            exp.starterUser.toLowerCase().trim(),
            "wir liegen voll im zeitplan",
            "alles lauft nach plan",
          ],
          explanation: isPt
            ? `Uma resposta excelente e diplomática é: "${exp.starterUser}".`
            : `An excellent, diplomatic response is: "${exp.starterUser}".`,
          level: 'advanced',
        },
      ];
    }

    if (level === 'intermediate') {
      return [
        {
          id: `${themeId}-de-w1`,
          type: 'translate',
          prompt: isPt
            ? `Como se diz em alemão: "${w1.meaning}"?`
            : `How do you say in German: "${w1.meaning}"?`,
          hint: isPt ? `Termo de ${w1.term.length} letras. Começa com "${w1.term.charAt(0)}".` : `Starts with "${w1.term.charAt(0)}" (${w1.term.length} letters).`,
          acceptedAnswers: [w1.term.toLowerCase().trim()],
          explanation: isPt ? `"${w1.term}" significa "${w1.meaning}". Exemplo: "${w1.example}".` : `"${w1.term}" means "${w1.meaning}". Example: "${w1.example}".`,
          level: 'intermediate',
        },
        {
          id: `${themeId}-de-w2`,
          type: 'fill-blank',
          prompt: isPt
            ? `Complete a frase de trabalho: "${(w2.example || w2.term).replace(new RegExp(w2.term, 'gi'), '___')}"`
            : `Complete the workplace phrase: "${(w2.example || w2.term).replace(new RegExp(w2.term, 'gi'), '___')}"`,
          hint: isPt ? `Significa "${w2.meaning}".` : `Means "${w2.meaning}".`,
          acceptedAnswers: [w2.term.toLowerCase().trim()],
          explanation: isPt ? `A palavra correta é "${w2.term}" (${w2.meaning}).` : `The correct word is "${w2.term}" (${w2.meaning}).`,
          level: 'intermediate',
        },
        {
          id: `${themeId}-de-w3`,
          type: 'reply',
          prompt: isPt
            ? `Como você responderia em alemão a: "${exp.starterAssistant}"?`
            : `How would you reply in German to: "${exp.starterAssistant}"?`,
          context: isPt ? `Cenário: ${foundTheme?.situation || 'Conversa profissional em alemão.'}` : `Scenario: ${foundTheme?.situation || 'Professional German conversation.'}`,
          hint: isPt ? `Resposta sugerida: "${exp.starterUser}"` : `Suggested reply: "${exp.starterUser}"`,
          acceptedAnswers: [
            exp.starterUser.toLowerCase().trim().replace(/[.!?]/g, ''),
            exp.starterUser.toLowerCase().trim(),
            "alles lauft nach plan",
            "sehr gerne",
          ],
          explanation: isPt ? `Uma resposta natural em alemão é: "${exp.starterUser}".` : `A natural German reply is: "${exp.starterUser}".`,
          level: 'intermediate',
        },
      ];
    }

    // beginner (de)
    return [
      {
        id: `${themeId}-de-w1`,
        type: 'translate',
        prompt: isPt
          ? `Como se diz em alemão a palavra básica: "${w1.meaning}"?`
          : `How do you say in German: "${w1.meaning}"?`,
        hint: isPt ? `Começa com "${w1.term.charAt(0)}" (${w1.term.length} letras).` : `Starts with "${w1.term.charAt(0)}" (${w1.term.length} letters).`,
        acceptedAnswers: [w1.term.toLowerCase().trim()],
        explanation: isPt ? `"${w1.term}" é o termo em alemão para "${w1.meaning}".` : `"${w1.term}" is the German word for "${w1.meaning}".`,
        level: 'beginner',
      },
      {
        id: `${themeId}-de-w2`,
        type: 'fill-blank',
        prompt: isPt
          ? `Complete a palavra que falta: "${(w2.example || w2.term).replace(new RegExp(w2.term, 'gi'), '___')}"`
          : `Complete with the German word: "${(w2.example || w2.term).replace(new RegExp(w2.term, 'gi'), '___')}"`,
        hint: isPt ? `Significa "${w2.meaning}".` : `Means "${w2.meaning}".`,
        acceptedAnswers: [w2.term.toLowerCase().trim()],
        explanation: isPt ? `A palavra é "${w2.term}" (${w2.meaning}).` : `The word is "${w2.term}" (${w2.meaning}).`,
        level: 'beginner',
      },
      {
        id: `${themeId}-de-w3`,
        type: 'reply',
        prompt: isPt
          ? `Escreva uma saudação simples para responder a: "${exp.starterAssistant}"`
          : `Write a simple greeting to reply to: "${exp.starterAssistant}"`,
        hint: isPt ? `Por exemplo: "Hallo! Ich freue mich auf das Gespräch."` : `For example: "Hallo! Ich freue mich auf das Gespräch."`,
        acceptedAnswers: [
          exp.starterUser.toLowerCase().trim().replace(/[.!?]/g, ''),
          exp.starterUser.toLowerCase().trim(),
          "guten tag",
          "hallo",
          "sehr gerne",
        ],
        explanation: isPt ? `Responder com empatia como "${exp.starterUser}" cria um ótimo início de diálogo.` : `Replying with warm empathy like "${exp.starterUser}" sets a great start.`,
        level: 'beginner',
      },
    ];
  }

  if (langKey === 'en') {
    if (level === 'advanced') {
      return [
        {
          id: `${themeId}-en-w1`,
          type: 'translate',
          prompt: isPt
            ? `Como se traduz em inglês o termo executivo: "${w1.meaning}"?`
            : `Translate the strategic term into English: "${w1.meaning}"?`,
          hint: isPt ? `Começa com "${w1.term.charAt(0)}" (${w1.term.length} letras).` : `Starts with "${w1.term.charAt(0)}" (${w1.term.length} letters).`,
          acceptedAnswers: [w1.term.toLowerCase().trim()],
          explanation: isPt ? `"${w1.term}" significa "${w1.meaning}". Exemplo: "${w1.example}".` : `"${w1.term}" means "${w1.meaning}". Example: "${w1.example}".`,
          level: 'advanced',
        },
        {
          id: `${themeId}-en-w2`,
          type: 'fill-blank',
          prompt: isPt
            ? `Preencha com a expressão corporativa correta: "${(w2.example || w2.term).replace(new RegExp(w2.term, 'gi'), '___')}"`
            : `Fill in the corporate phrasing: "${(w2.example || w2.term).replace(new RegExp(w2.term, 'gi'), '___')}"`,
          hint: isPt ? `Significa "${w2.meaning}".` : `Means "${w2.meaning}".`,
          acceptedAnswers: [w2.term.toLowerCase().trim()],
          explanation: isPt ? `O termo correto em inglês é "${w2.term}".` : `The correct term is "${w2.term}".`,
          level: 'advanced',
        },
        {
          id: `${themeId}-en-w3`,
          type: 'reply',
          prompt: isPt
            ? `Formule uma resposta executiva de alto nível a: "${exp.starterAssistant}"`
            : `Formulate a high-impact executive response to: "${exp.starterAssistant}"`,
          context: isPt ? `Cenário: ${foundTheme?.situation || 'Reunião executiva de alinhamento.'}` : `Scenario: ${foundTheme?.situation || 'Executive leadership meeting.'}`,
          hint: isPt ? `Sugestão: "${exp.starterUser}"` : `Suggested: "${exp.starterUser}"`,
          acceptedAnswers: [
            exp.starterUser.toLowerCase().trim().replace(/[.!?]/g, ''),
            exp.starterUser.toLowerCase().trim(),
            "everything is on track",
            "we are right on schedule",
          ],
          explanation: isPt ? `Uma resposta executiva de impacto: "${exp.starterUser}".` : `High-impact executive answer: "${exp.starterUser}".`,
          level: 'advanced',
        },
      ];
    }

    if (level === 'intermediate') {
      return [
        {
          id: `${themeId}-en-w1`,
          type: 'translate',
          prompt: isPt
            ? `Como se diz em inglês: "${w1.meaning}"?`
            : `How do you say in English: "${w1.meaning}"?`,
          hint: isPt ? `Começa com a letra "${w1.term.charAt(0)}" (${w1.term.length} letras).` : `Starts with "${w1.term.charAt(0)}" (${w1.term.length} letters).`,
          acceptedAnswers: [w1.term.toLowerCase().trim()],
          explanation: isPt ? `"${w1.term}" significa "${w1.meaning}". Exemplo: "${w1.example}".` : `"${w1.term}" means "${w1.meaning}". Example: "${w1.example}".`,
          level: 'intermediate',
        },
        {
          id: `${themeId}-en-w2`,
          type: 'fill-blank',
          prompt: isPt
            ? `Complete a frase em inglês: "${(w2.example || w2.term).replace(new RegExp(w2.term, 'gi'), '___')}"`
            : `Complete the English sentence: "${(w2.example || w2.term).replace(new RegExp(w2.term, 'gi'), '___')}"`,
          hint: isPt ? `Significa "${w2.meaning}".` : `Means "${w2.meaning}".`,
          acceptedAnswers: [w2.term.toLowerCase().trim()],
          explanation: isPt ? `A expressão é "${w2.term}" (${w2.meaning}).` : `The expression is "${w2.term}" (${w2.meaning}).`,
          level: 'intermediate',
        },
        {
          id: `${themeId}-en-w3`,
          type: 'reply',
          prompt: isPt
            ? `Como você responderia em inglês a: "${exp.starterAssistant}"?`
            : `How would you reply in English to: "${exp.starterAssistant}"?`,
          hint: isPt ? `Resposta sugerida: "${exp.starterUser}"` : `Suggested reply: "${exp.starterUser}"`,
          acceptedAnswers: [
            exp.starterUser.toLowerCase().trim().replace(/[.!?]/g, ''),
            exp.starterUser.toLowerCase().trim(),
            "sounds great",
            "everything is on track",
          ],
          explanation: isPt ? `Uma resposta fluida e natural é: "${exp.starterUser}".` : `A fluid and natural response is: "${exp.starterUser}".`,
          level: 'intermediate',
        },
      ];
    }

    // beginner (en)
    return [
      {
        id: `${themeId}-en-w1`,
        type: 'translate',
        prompt: isPt
          ? `Como se escreve em inglês a palavra básica: "${w1.meaning}"?`
          : `How do you write in English: "${w1.meaning}"?`,
        hint: isPt ? `Começa com "${w1.term.charAt(0)}" (${w1.term.length} letras).` : `Starts with "${w1.term.charAt(0)}" (${w1.term.length} letters).`,
        acceptedAnswers: [w1.term.toLowerCase().trim()],
        explanation: isPt ? `"${w1.term}" significa "${w1.meaning}".` : `"${w1.term}" means "${w1.meaning}".`,
        level: 'beginner',
      },
      {
        id: `${themeId}-en-w2`,
        type: 'fill-blank',
        prompt: isPt
          ? `Complete a palavra que falta: "${(w2.example || w2.term).replace(new RegExp(w2.term, 'gi'), '___')}"`
          : `Complete the missing word: "${(w2.example || w2.term).replace(new RegExp(w2.term, 'gi'), '___')}"`,
        hint: isPt ? `Significa "${w2.meaning}".` : `Means "${w2.meaning}".`,
        acceptedAnswers: [w2.term.toLowerCase().trim()],
        explanation: isPt ? `A palavra é "${w2.term}".` : `The word is "${w2.term}".`,
        level: 'beginner',
      },
      {
        id: `${themeId}-en-w3`,
        type: 'reply',
        prompt: isPt
          ? `Escreva uma saudação inicial amigável para este tema:`
          : `Write a friendly opening greeting for this topic:`,
        hint: isPt ? `Por exemplo: "Good morning! Ready when you are."` : `For example: "Good morning! Ready when you are."`,
        acceptedAnswers: [
          exp.starterUser.toLowerCase().trim().replace(/[.!?]/g, ''),
          exp.starterUser.toLowerCase().trim(),
          "good morning",
          "hello",
          "hi there",
        ],
        explanation: isPt ? `Começar com segurança estabelece um ritmo positivo na conversa.` : `Starting confidently sets a positive rhythm.`,
        level: 'beginner',
      },
    ];
  }

  // Multilingual fallback
  return [
    {
      id: `${themeId}-w1`,
      type: 'translate',
      prompt: isPt ? `Como se escreve "${w1?.meaning || 'perspectiva'}" neste tema?` : `How do you write "${w1?.meaning || 'perspective'}"?`,
      hint: isPt ? `Começa com "${(w1?.term || 'p').charAt(0)}".` : `Starts with "${(w1?.term || 'p').charAt(0)}".`,
      acceptedAnswers: [(w1?.term || 'perspective').toLowerCase().trim()],
      explanation: isPt ? `Termo importante do tema.` : `Important topic term.`,
      level,
    },
    {
      id: `${themeId}-w2`,
      type: 'fill-blank',
      prompt: isPt ? `Complete a frase: "${(w2?.example || 'We reached a milestone').replace(w2?.term || 'milestone', '___')}"` : `Complete the sentence: "${(w2?.example || 'We reached a milestone').replace(w2?.term || 'milestone', '___')}"`,
      hint: isPt ? `Significa "${w2?.meaning || 'marco'}".` : `Means "${w2?.meaning || 'milestone'}".`,
      acceptedAnswers: [(w2?.term || 'milestone').toLowerCase().trim()],
      explanation: isPt ? `A palavra correta é "${w2?.term || 'milestone'}".` : `The correct word is "${w2?.term || 'milestone'}".`,
      level,
    },
    {
      id: `${themeId}-w3`,
      type: 'reply',
      prompt: isPt ? `Responda ao diálogo: "${exp.starterAssistant}"` : `Reply to: "${exp.starterAssistant}"`,
      hint: isPt ? `Sugestão: "${exp.starterUser}"` : `Suggested: "${exp.starterUser}"`,
      acceptedAnswers: [exp.starterUser.toLowerCase().trim().replace(/[.!?]/g, '')],
      explanation: isPt ? `Resposta sugerida: "${exp.starterUser}".` : `Suggested response: "${exp.starterUser}".`,
      level,
    },
  ];
}
