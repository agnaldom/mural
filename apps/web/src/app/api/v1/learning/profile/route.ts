import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory session for dev environment
const DEV_SESSIONS: Record<string, { token?: string }> = {};

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('mural_token')?.value;

    if (!token && process.env.NEXT_PUBLIC_SKIP_AUTH !== 'true') {
      return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId') || 'default-user';

    // Dev mode: return mock profile
    if (process.env.NEXT_PUBLIC_SKIP_AUTH === 'true') {
      return NextResponse.json({
        userId,
        languageId: 'en',
        createdAt: Date.now() / 1000,
        updatedAt: Date.now() / 1000,
        preferences: {
          correctionStyle: 'balanced',
          pace: 'normal',
          nativeLanguage: 'Portuguese',
          targetLanguage: 'English',
        },
        level: 'A1',
        capabilities: [],
        nextGoal: 'Start with a greeting and one small question.',
      });
    }

    // Production: call backend API
    const baseUrl = process.env.MURAL_API_URL || 'http://localhost:8080';
    const response = await fetch(`${baseUrl}/v1/learning/profile?userId=${userId}`, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        // Return default profile for new users
        return NextResponse.json({
          userId,
          languageId: 'en',
          createdAt: Date.now() / 1000,
          updatedAt: Date.now() / 1000,
          preferences: {
            correctionStyle: 'balanced',
            pace: 'normal',
            nativeLanguage: 'Portuguese',
            targetLanguage: 'English',
          },
          level: 'A1',
          capabilities: [],
          nextGoal: 'Start with a greeting and one small question.',
        });
      }
      return NextResponse.json({ error: 'Failed to get profile' }, { status: response.status });
    }

    return NextResponse.json(await response.json());
  } catch (error) {
    console.error('Profile API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const token = req.cookies.get('mural_token')?.value;

    if (!token && process.env.NEXT_PUBLIC_SKIP_AUTH !== 'true') {
      return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
    }

    const body = await req.json();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId parameter' }, { status: 400 });
    }

    const baseUrl = process.env.MURAL_API_URL || 'http://localhost:8080';
    const response = await fetch(`${baseUrl}/v1/learning/profile?userId=${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to update profile' }, { status: response.status });
    }

    return NextResponse.json(await response.json());
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}