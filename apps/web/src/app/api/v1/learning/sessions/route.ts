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
    const languageId = searchParams.get('languageId');

    if (process.env.NEXT_PUBLIC_SKIP_AUTH === 'true') {
      // Dev mode: return mock sessions from localStorage
      return NextResponse.json({
        sessions: [],
        total: 0,
        limit,
        offset,
      });
    }

    // Production: call backend API
    const baseUrl = process.env.MURAL_API_URL || 'http://localhost:8080';
    const query = new URLSearchParams({
      userId,
      limit: limit.toString(),
      offset: offset.toString(),
      ...(languageId && { languageId }),
    }).toString();

    const response = await fetch(`${baseUrl}/v1/learning/sessions?${query}`, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to get sessions' }, { status: response.status });
    }

    return NextResponse.json(await response.json());
  } catch (error) {
    console.error('Sessions API error:', error);
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
    const { userId = 'default-user', ...sessionData } = body;

    if (process.env.NEXT_PUBLIC_SKIP_AUTH === 'true') {
      // Dev mode: return created session with generated ID
      return NextResponse.json({
        id: `session-${Date.now()}`,
        userId,
        ...sessionData,
        createdAt: Date.now() / 1000,
      }, { status: 201 });
    }

    // Production: call backend API
    const baseUrl = process.env.MURAL_API_URL || 'http://localhost:8080';
    const response = await fetch(`${baseUrl}/v1/learning/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify({ userId, ...sessionData }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to create session' }, { status: response.status });
    }

    return NextResponse.json(await response.json(), { status: 201 });
  } catch (error) {
    console.error('Create session error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}