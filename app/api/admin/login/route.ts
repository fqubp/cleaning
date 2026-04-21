import { NextRequest, NextResponse } from 'next/server';
import { getAdminPassword, setAdminSession } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  if (String(password) !== getAdminPassword()) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  setAdminSession();
  return NextResponse.json({ success: true });
}
