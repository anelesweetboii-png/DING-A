import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'The AI service has not been configured yet. Add OPENAI_API_KEY in your Vercel environment variables.' }, { status: 503 });
    }
    const body = await request.json();
    if (!Array.isArray(body.messages)) return NextResponse.json({ error: 'Please send a valid chat message.' }, { status: 400 });
    const messages = body.messages.slice(-20).filter((m: { role?: string; content?: string }) =>
      (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string'
    ).map((m: { role: 'user' | 'assistant'; content: string }) => ({ role: m.role, content: m.content.slice(0, 6000) }));
    if (!messages.length) return NextResponse.json({ error: 'Type a message to get started.' }, { status: 400 });

    const upstream = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-5.4',
        instructions: 'You are Nova AI, a friendly, practical, thoughtful assistant. Be clear and helpful. If a request is ambiguous, ask a concise follow-up question. Do not claim to have performed actions you have not performed.',
        input: messages.map((m: { role: 'user' | 'assistant'; content: string }) => ({ role: m.role, content: m.content })),
        max_output_tokens: 1200
      }),
      cache: 'no-store'
    });
    const result = await upstream.json();
    if (!upstream.ok) {
      const message = result?.error?.message || 'The AI provider could not complete the request.';
      return NextResponse.json({ error: message }, { status: upstream.status === 429 ? 429 : 502 });
    }
    const reply = typeof result.output_text === 'string' ? result.output_text.trim() : '';
    if (!reply) return NextResponse.json({ error: 'The AI returned an empty response. Please try again.' }, { status: 502 });
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: 'Could not process your message. Please try again.' }, { status: 500 });
  }
}
