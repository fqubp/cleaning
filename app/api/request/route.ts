import { NextRequest, NextResponse } from 'next/server';
import { calcPrice, createRequest, listRequests } from '@/lib/store';

type Payload = {
  name: string;
  phone: string;
  serviceId: number;
  area?: number;
  params?: Record<string, unknown>;
  desiredDate: string;
  comment?: string;
  address: string;
  media?: { type: 'photo' | 'video'; url: string; filename: string; size: number }[];
};

export async function GET() {
  return NextResponse.json(listRequests());
}

export async function POST(req: NextRequest) {
  const ctype = req.headers.get('content-type') || '';
  let body: Payload;

  if (ctype.includes('application/json')) {
    body = await req.json();
  } else {
    const fd = await req.formData();
    body = {
      name: String(fd.get('name') || ''),
      phone: String(fd.get('phone') || ''),
      serviceId: Number(fd.get('serviceId') || 1),
      area: Number(fd.get('area') || 30),
      desiredDate: String(fd.get('desiredDate') || ''),
      comment: String(fd.get('comment') || ''),
      address: String(fd.get('address') || ''),
      media: JSON.parse(String(fd.get('media') || '[]'))
    };
  }

  const area = Math.max(1, Number(body.area || 30));
  const calc = calcPrice(body.serviceId, area);

  const created = createRequest({
    name: body.name,
    phone: body.phone,
    serviceId: body.serviceId,
    params: body.params || { area },
    calcPrice: calc,
    finalPrice: null,
    address: body.address,
    desiredDate: body.desiredDate,
    comment: body.comment || '',
    media: body.media || []
  });

  return NextResponse.json({ request_id: created.id, status: created.status, calc_price: created.calcPrice });
}
