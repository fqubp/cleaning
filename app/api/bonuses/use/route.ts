import { NextRequest, NextResponse } from 'next/server';
import { useBonuses } from '@/lib/store';

export async function POST(req: NextRequest) {
  const { phone, amount } = await req.json();
  const result = useBonuses(String(phone), Number(amount));
  if (!result.ok) return NextResponse.json({ error: 'Недостаточно бонусов' }, { status: 400 });
  return NextResponse.json({ new_balance: result.balance });
}
