import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('mural_token')?.value;

    if (!token && process.env.NEXT_PUBLIC_SKIP_AUTH !== 'true') {
      return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId') || 'default-user';
    const limit = parseInt(searchParams.get('limit') || '20');

    if (process.env.NEXT_PUBLIC_SKIP_AUTH === 'true') {
      return NextResponse.json({
        reviews: [],
        total: 0,
        limit,
      });
    }

    const baseUrl = process.env.MURAL_API_URL || 'http://localhost:8080';
    const query = new URLSearchParams({
      userId,
      limit: limit.toString(),
      due: 'true',
    }).toString();

    const response = await fetch(`${baseUrl}/v1/learning/reviews/due?${query}`, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to get reviews' }, { status: response.status });
    }

    return NextResponse.json(await response.json());
  } catch (error) {
    console.error('Reviews API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}