import { services } from './data';
import { CleaningRequest, CreateRequestInput, RequestStatus } from './types';

interface IRepository {
  createRequest(payload: CreateRequestInput): Promise<CleaningRequest>;
  listRequests(): Promise<CleaningRequest[]>;
  getRequest(id: number): Promise<CleaningRequest | null>;
  updateRequest(id: number, patch: Partial<CleaningRequest>): Promise<CleaningRequest | null>;
  removeRequest(id: number): Promise<boolean>;
  getBonuses(phone: string): Promise<number>;
  useBonuses(phone: string, amount: number): Promise<{ ok: boolean; balance: number }>;
}

function calcPrice(serviceId: number, area: number): number {
  const svc = services.find((s) => s.id === serviceId);
  if (!svc) return 0;
  return Math.round((svc.basePrice * Math.max(1, area)) / 10);
}

class MemoryRepository implements IRepository {
  private requests: CleaningRequest[] = [];
  private bonuses = new Map<string, number>();

  async createRequest(payload: CreateRequestInput): Promise<CleaningRequest> {
    const area = Math.max(1, Number(payload.area || 30));
    const now = new Date().toISOString();
    const request: CleaningRequest = {
      id: this.requests.length + 1,
      name: payload.name,
      phone: payload.phone,
      serviceId: payload.serviceId,
      params: payload.params || { area },
      calcPrice: calcPrice(payload.serviceId, area),
      finalPrice: null,
      status: 'Новая',
      address: payload.address,
      desiredDate: payload.desiredDate,
      comment: payload.comment || '',
      media: payload.media || [],
      createdAt: now,
      updatedAt: now
    };
    this.requests.unshift(request);
    if (!this.bonuses.has(request.phone)) this.bonuses.set(request.phone, 0);
    return request;
  }

  async listRequests(): Promise<CleaningRequest[]> {
    return this.requests;
  }

  async getRequest(id: number): Promise<CleaningRequest | null> {
    return this.requests.find((x) => x.id === id) ?? null;
  }

  async updateRequest(id: number, patch: Partial<CleaningRequest>): Promise<CleaningRequest | null> {
    const req = this.requests.find((x) => x.id === id);
    if (!req) return null;
    Object.assign(req, patch, { updatedAt: new Date().toISOString() });
    if (patch.status === 'Выполнена' && req.finalPrice) {
      const accrual = Math.floor(req.finalPrice * 0.1);
      this.bonuses.set(req.phone, (this.bonuses.get(req.phone) || 0) + accrual);
    }
    return req;
  }

  async removeRequest(id: number): Promise<boolean> {
    const idx = this.requests.findIndex((x) => x.id === id);
    if (idx === -1) return false;
    this.requests.splice(idx, 1);
    return true;
  }

  async getBonuses(phone: string): Promise<number> {
    return this.bonuses.get(phone) || 0;
  }

  async useBonuses(phone: string, amount: number): Promise<{ ok: boolean; balance: number }> {
    const balance = this.bonuses.get(phone) || 0;
    if (amount <= 0 || amount > balance) return { ok: false, balance };
    const newBalance = balance - amount;
    this.bonuses.set(phone, newBalance);
    return { ok: true, balance: newBalance };
  }
}

class SupabaseRepository implements IRepository {
  constructor(private url: string, private key: string) {}

  private async req(path: string, init: RequestInit = {}) {
    const response = await fetch(`${this.url}/rest/v1/${path}`, {
      ...init,
      headers: {
        apikey: this.key,
        Authorization: `Bearer ${this.key}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
        ...(init.headers || {})
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Supabase error: ${response.status} ${text}`);
    }

    if (response.status === 204) return null;
    return response.json();
  }

  async createRequest(payload: CreateRequestInput): Promise<CleaningRequest> {
    const area = Math.max(1, Number(payload.area || 30));
    const calc = calcPrice(payload.serviceId, area);

    await this.req('clients', {
      method: 'POST',
      headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
      body: JSON.stringify({ phone: payload.phone, name: payload.name })
    });

    await this.req('bonuses', {
      method: 'POST',
      headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
      body: JSON.stringify({ client_phone: payload.phone, balance: 0 })
    });

    const rows = await this.req('requests', {
      method: 'POST',
      body: JSON.stringify({
        client_phone: payload.phone,
        service_id: payload.serviceId,
        params: payload.params || { area },
        calc_price: calc,
        final_price: null,
        status: 'Новая',
        address: payload.address,
        desired_date: payload.desiredDate,
        comment: payload.comment || ''
      })
    });

    const row = rows[0];
    return {
      id: row.id,
      name: payload.name,
      phone: payload.phone,
      serviceId: row.service_id,
      params: row.params,
      calcPrice: row.calc_price,
      finalPrice: row.final_price,
      status: row.status as RequestStatus,
      address: row.address,
      desiredDate: row.desired_date,
      comment: row.comment,
      media: payload.media || [],
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }

  async listRequests(): Promise<CleaningRequest[]> {
    const rows = await this.req('requests?select=*&order=created_at.desc');
    return rows.map((r: any) => ({
      id: r.id,
      name: 'Клиент',
      phone: r.client_phone,
      serviceId: r.service_id,
      params: r.params || {},
      calcPrice: Number(r.calc_price || 0),
      finalPrice: r.final_price,
      status: r.status,
      address: r.address || '',
      desiredDate: r.desired_date || '',
      comment: r.comment || '',
      media: [],
      createdAt: r.created_at,
      updatedAt: r.updated_at
    }));
  }

  async getRequest(id: number): Promise<CleaningRequest | null> {
    const rows = await this.req(`requests?id=eq.${id}&select=*`);
    const r = rows[0];
    if (!r) return null;
    return {
      id: r.id,
      name: 'Клиент',
      phone: r.client_phone,
      serviceId: r.service_id,
      params: r.params || {},
      calcPrice: Number(r.calc_price || 0),
      finalPrice: r.final_price,
      status: r.status,
      address: r.address || '',
      desiredDate: r.desired_date || '',
      comment: r.comment || '',
      media: [],
      createdAt: r.created_at,
      updatedAt: r.updated_at
    };
  }

  async updateRequest(id: number, patch: Partial<CleaningRequest>): Promise<CleaningRequest | null> {
    const rows = await this.req(`requests?id=eq.${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        status: patch.status,
        final_price: patch.finalPrice,
        updated_at: new Date().toISOString()
      })
    });

    const r = rows[0];
    if (!r) return null;
    return this.getRequest(r.id);
  }

  async removeRequest(id: number): Promise<boolean> {
    await this.req(`requests?id=eq.${id}`, { method: 'DELETE', headers: { Prefer: 'return=minimal' } });
    return true;
  }

  async getBonuses(phone: string): Promise<number> {
    const rows = await this.req(`bonuses?client_phone=eq.${encodeURIComponent(phone)}&select=balance`);
    return Number(rows[0]?.balance || 0);
  }

  async useBonuses(phone: string, amount: number): Promise<{ ok: boolean; balance: number }> {
    const balance = await this.getBonuses(phone);
    if (amount <= 0 || amount > balance) return { ok: false, balance };
    const newBalance = balance - amount;
    await this.req(`bonuses?client_phone=eq.${encodeURIComponent(phone)}`, {
      method: 'PATCH',
      body: JSON.stringify({ balance: newBalance })
    });
    return { ok: true, balance: newBalance };
  }
}

const memory = new MemoryRepository();

export function getRepository(): IRepository {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (url && key) return new SupabaseRepository(url, key);
  return memory;
}
