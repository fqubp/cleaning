import { NextRequest, NextResponse } from 'next/server';
import { createFaq, listFaq } from '@/lib/content-store';
import { isAdminAuthenticated } from '@/lib/auth';

export async function GET() {
  return NextResponse.json(listFaq());
}

export async function POST(req: NextRequest) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  if (!body.question || !body.answer) {
    return NextResponse.json({ error: 'question and answer required' }, { status: 400 });
  }

  const item = createFaq({
    question: String(body.question),
    answer: String(body.answer),
    order: Number(body.order || 100)
  });

  return NextResponse.json(item, { status: 201 });
}
