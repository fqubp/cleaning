import { NextResponse } from 'next/server';
import { getRepository } from '@/lib/repository';

export async function GET(_req: Request, { params }: { params: { phone: string } }) {
  const repo = getRepository();
  const balance = await repo.getBonuses(params.phone);
  return NextResponse.json({ balance, history: [] });
}
