import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('mural_token')?.value;

    if (!token && process.env.NEXT_PUBLIC_SKIP_AUTH !== 'true') {
      return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId') || 'default-user';
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const dueOnly = searchParams.get('due') === 'true';

    if (process.env.NEXT_PUBLIC_SKIP_AUTH === 'true') {
      return NextResponse.json({
        vocabulary: [],
        total: 0,
        limit,
        offset,
      });
    }

    const baseUrl = process.env.MURAL_API_URL || 'http://localhost:8080';
    const query = new URLSearchParams({
      userId,
      limit: limit.toString(),
      offset: offset.toString(),
      ...(dueOnly && { due: 'true' }),
    }).toString();

    const response = await fetch(`${baseUrl}/v1/learning/vocabulary?${query}`, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to get vocabulary' }, { status: response.status });
    }

    return NextResponse.json(await response.json());
  } catch (error) {
    console.error('Vocabulary API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('mural_token')?.value;

    if (!token && process.env.NEXT_PUBLIC_SKIP_AUTH !== 'true') {
      return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
    }

    const body = await req.json();
    const { userId = 'default-user', ...vocabData } = body;

    if (process.env.NEXT_PUBLIC_SKIP_AUTH === 'true') {
      return NextResponse.json({
        id: `${vocabData.language}|${vocabData.lemma}|${vocabData.meaning}`,
        userId,
        ...vocabData,
        createdAt: Date.now() / 1000,
        lastSeen: Date.now() / 1000,
        dueAt: Date.now() / 1000 + 86400, // Due in 1 day
        recallCount: 0,
        independentCount: 0,
        understandingCount: 0,
        level: 'new',
      }, { status: 201 });
    }

    const baseUrl = process.env.MURAL_API_URL || 'http://localhost:8080';
    const response = await fetch(`${baseUrl}/v1/learning/vocabulary`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify({ userId, ...vocabData }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to add vocabulary' }, { status: response.status });
    }

    return NextResponse.json(await response.json(), { status: 201 });
  } catch (error) {
    console.error('Add vocabulary error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}