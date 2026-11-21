import { NextRequest, NextResponse } from 'next/server';

// Fluency skill definitions per the Universal Language Learning Intelligence spec
const FLUENCY_SKILLS = [
  { id: 'introduce_self', description: 'Introduce myself', prerequisites: [] },
  { id: 'ask_answer_questions', description: 'Ask and answer questions', prerequisites: ['introduce_self'] },
  { id: 'describe_routines', description: 'Describe routines', prerequisites: ['ask_answer_questions'] },
  { id: 'describe_people_places', description: 'Describe people and places', prerequisites: ['describe_routines'] },
  { id: 'narrate_past_experiences', description: 'Narrate past experiences', prerequisites: ['describe_routines', 'describe_people_places'] },
  { id: 'explain_plans', description: 'Explain plans', prerequisites: ['narrate_past_experiences'] },
  { id: 'express_preferences', description: 'Express preferences', prerequisites: ['explain_plans'] },
  { id: 'express_opinions', description: 'Express opinions', prerequisites: ['express_preferences'] },
  { id: 'explain_reasons', description: 'Explain reasons', prerequisites: ['express_opinions'] },
  { id: 'clarify_misunderstandings', description: 'Clarify misunderstandings', prerequisites: ['explain_reasons'] },
  { id: 'ask_for_help', description: 'Ask for help', prerequisites: ['clarify_misunderstandings'] },
  { id: 'handle_unexpected_questions', description: 'Handle unexpected questions', prerequisites: ['ask_for_help'] },
  { id: 'participate_meetings', description: 'Participate in meetings', prerequisites: ['handle_unexpected_questions'] },
  { id: 'present_an_idea', description: 'Present an idea', prerequisites: ['participate_meetings'] },
  { id: 'negotiate', description: 'Negotiate', prerequisites: ['present_an_idea'] },
  { id: 'summarize_information', description: 'Summarize information', prerequisites: ['negotiate'] },
  { id: 'explain_technical_concepts', description: 'Explain technical concepts', prerequisites: ['explain_reasons', 'summarize_information'] },
  { id: 'understand_natural_speech', description: 'Understand natural speech', prerequisites: ['narrate_past_experiences'] },
];

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
      // Dev mode: return skills with not_assessed state
      return NextResponse.json(
        FLUENCY_SKILLS.map(skill => ({
          id: skill.id,
          languageId,
          description: skill.description,
          prerequisites: skill.prerequisites,
          state: 'not_assessed',
          confidence: 0,
        }))
      );
    }

    const baseUrl = process.env.MURAL_API_URL || 'http://localhost:8080';
    const query = new URLSearchParams({ userId, languageId }).toString();

    const response = await fetch(`${baseUrl}/v1/learning/fluency-graph?${query}`, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to get fluency graph' }, { status: response.status });
    }

    return NextResponse.json(await response.json());
  } catch (error) {
    console.error('Fluency graph API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
