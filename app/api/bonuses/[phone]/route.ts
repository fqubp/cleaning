import { NextResponse } from 'next/server';
import { getBonuses } from '@/lib/store';

export async function GET(_req: Request, { params }: { params: { phone: string } }) {
  return NextResponse.json({ balance: getBonuses(params.phone), history: [] });
}
