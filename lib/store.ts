import { services } from './data';

export type RequestStatus = 'Новая' | 'В обработке' | 'Подтверждена' | 'Выполнена' | 'Отменена';

export type Req = {
  id: number;
  name: string;
  phone: string;
  serviceId: number;
  params: Record<string, unknown>;
  calcPrice: number;
  finalPrice: number | null;
  status: RequestStatus;
  address: string;
  desiredDate: string;
  comment: string;
  media: { type: 'photo' | 'video'; url: string; filename: string; size: number }[];
  createdAt: string;
  updatedAt: string;
};

const requests: Req[] = [];
const bonuses = new Map<string, number>();

export function calcPrice(serviceId: number, area: number): number {
  const svc = services.find((s) => s.id === serviceId);
  if (!svc) return 0;
  return Math.round((svc.basePrice * Math.max(1, area)) / 10);
}

export function createRequest(payload: Omit<Req, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Req {
  const now = new Date().toISOString();
  const req: Req = {
    ...payload,
    id: requests.length + 1,
    status: 'Новая',
    createdAt: now,
    updatedAt: now
  };
  requests.unshift(req);
  if (!bonuses.has(req.phone)) bonuses.set(req.phone, 0);
  return req;
}

export function listRequests(): Req[] {
  return requests;
}

export function getRequest(id: number): Req | undefined {
  return requests.find((r) => r.id === id);
}

export function updateRequest(id: number, patch: Partial<Req>): Req | undefined {
  const item = getRequest(id);
  if (!item) return undefined;
  Object.assign(item, patch, { updatedAt: new Date().toISOString() });
  if (patch.status === 'Выполнена' && item.finalPrice) {
    const bonusAdd = Math.floor(item.finalPrice * 0.1);
    bonuses.set(item.phone, (bonuses.get(item.phone) || 0) + bonusAdd);
  }
  return item;
}

export function removeRequest(id: number): boolean {
  const idx = requests.findIndex((r) => r.id === id);
  if (idx === -1) return false;
  requests.splice(idx, 1);
  return true;
}

export function getBonuses(phone: string): number {
  return bonuses.get(phone) || 0;
}

export function useBonuses(phone: string, amount: number): { ok: boolean; balance: number } {
  const balance = bonuses.get(phone) || 0;
  if (amount <= 0 || amount > balance) return { ok: false, balance };
  const newBalance = balance - amount;
  bonuses.set(phone, newBalance);
  return { ok: true, balance: newBalance };
}
