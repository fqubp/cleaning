import { NextRequest, NextResponse } from 'next/server';
import { getRequest, removeRequest, updateRequest } from '@/lib/store';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const found = getRequest(Number(params.id));
  return found ? NextResponse.json(found) : NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const patch = await req.json();
  const updated = updateRequest(Number(params.id), patch);
  return updated ? NextResponse.json({ success: true, request: updated }) : NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const ok = removeRequest(Number(params.id));
  return ok ? NextResponse.json({ success: true }) : NextResponse.json({ error: 'Not found' }, { status: 404 });
}
