import { NextRequest, NextResponse } from 'next/server';
import { getRepository } from '@/lib/repository';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const repo = getRepository();
  const found = await repo.getRequest(Number(params.id));
  return found ? NextResponse.json(found) : NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const patch = await req.json();
  const repo = getRepository();
  const updated = await repo.updateRequest(Number(params.id), patch);
  return updated ? NextResponse.json({ success: true, request: updated }) : NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const repo = getRepository();
  const ok = await repo.removeRequest(Number(params.id));
  return ok ? NextResponse.json({ success: true }) : NextResponse.json({ error: 'Not found' }, { status: 404 });
}
