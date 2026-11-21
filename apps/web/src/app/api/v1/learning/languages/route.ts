import { NextRequest, NextResponse } from 'next/server';

// Language pack definitions from registry
const LANGUAGE_PACKS = [
  { id: 'nb', name: 'Norwegian Bokmål', nativeName: 'Norsk bokmål', script: 'Latin', supported: true },
  { id: 'es', name: 'Spanish', nativeName: 'Español', script: 'Latin', supported: true },
  { id: 'en', name: 'English', nativeName: 'English', script: 'Latin', supported: true },
  { id: 'fr', name: 'French', nativeName: 'Français', script: 'Latin', supported: true },
  { id: 'de', name: 'German', nativeName: 'Deutsch', script: 'Latin', supported: true },
  { id: 'it', name: 'Italian', nativeName: 'Italiano', script: 'Latin', supported: true },
  { id: 'pt-BR', name: 'Brazilian Portuguese', nativeName: 'Português', script: 'Latin', supported: true },
  { id: 'zh-CN', name: 'Mandarin Chinese', nativeName: '普通话', script: 'Han', supported: true },
  { id: 'sr-Latn-RS', name: 'Serbian', nativeName: 'Srpski', script: 'Latin', supported: true },
  { id: 'el', name: 'Greek', nativeName: 'Ελληνικά', script: 'Greek', supported: true },
  { id: 'tl-PH', name: 'Tagalog', nativeName: 'Tagalog', script: 'Latin', supported: true },
];

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('mural_token')?.value;

    // This endpoint is public - no auth required

    const supportedLanguages = LANGUAGE_PACKS.filter(l => l.supported);
    
    return NextResponse.json({
      languages: supportedLanguages,
      total: supportedLanguages.length,
    });
  } catch (error) {
    console.error('Languages API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
