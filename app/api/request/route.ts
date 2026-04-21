import { NextRequest, NextResponse } from 'next/server';
import { getRepository } from '@/lib/repository';
import { CreateRequestInput } from '@/lib/types';
import { validateCreateRequest } from '@/lib/validation';

async function parseRequest(req: NextRequest): Promise<CreateRequestInput> {
  const ctype = req.headers.get('content-type') || '';

  if (ctype.includes('application/json')) {
    return req.json();
  }

  const fd = await req.formData();
  return {
    name: String(fd.get('name') || ''),
    phone: String(fd.get('phone') || ''),
    serviceId: Number(fd.get('serviceId') || 0),
    area: Number(fd.get('area') || 30),
    desiredDate: String(fd.get('desiredDate') || ''),
    comment: String(fd.get('comment') || ''),
    address: String(fd.get('address') || ''),
    media: JSON.parse(String(fd.get('media') || '[]'))
  };
}

export async function GET(req: NextRequest) {
  const repo = getRepository();
  const requests = await repo.listRequests();

  const status = req.nextUrl.searchParams.get('status');
  const phone = req.nextUrl.searchParams.get('phone');

  const filtered = requests.filter((r) => {
    if (status && r.status !== status) return false;
    if (phone && !r.phone.includes(phone)) return false;
    return true;
  });

  return NextResponse.json(filtered);
}

export async function POST(req: NextRequest) {
  const payload = await parseRequest(req);
  const errors = validateCreateRequest(payload);

  if (errors.length) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const repo = getRepository();
  const created = await repo.createRequest(payload);
  return NextResponse.json({ request_id: created.id, status: created.status, calc_price: created.calcPrice }, { status: 201 });
}
