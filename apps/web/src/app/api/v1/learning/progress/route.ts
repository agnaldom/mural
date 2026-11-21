import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('mural_token')?.value;

    if (!token && process.env.NEXT_PUBLIC_SKIP_AUTH !== 'true') {
      return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId') || 'default-user';
    const languageId = searchParams.get('languageId') || 'en';

    if (process.env.NEXT_PUBLIC_SKIP_AUTH === 'true') {
      // Dev mode: return default progress
      return NextResponse.json({
        level: 'A1',
        capabilities: [],
        nextMilestone: 'Get comfortable with greetings and basic questions',
        nextRecommendation: 'coffee',
      });
    }

    const baseUrl = process.env.MURAL_API_URL || 'http://localhost:8080';
    const query = new URLSearchParams({ userId, languageId }).toString();

    const response = await fetch(`${baseUrl}/v1/learning/progress?${query}`, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to get progress' }, { status: response.status });
    }

    return NextResponse.json(await response.json());
  } catch (error) {
    console.error('Progress API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
