'use client';

import { useMemo, useState } from 'react';
import { services } from '@/lib/data';

type MediaLink = { type: 'photo' | 'video'; url: string; filename: string; size: number };

const initial = {
  name: '',
  phone: '',
  serviceId: 1,
  area: 30,
  address: '',
  desiredDate: '',
  comment: '',
  agree: false,
  mediaJson: '[]'
};

export default function RequestForm() {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const selectedService = useMemo(() => services.find((s) => s.id === Number(form.serviceId)), [form.serviceId]);
  const roughPrice = useMemo(() => Math.round((selectedService?.basePrice || 0) * Number(form.area || 1) / 10), [selectedService, form.area]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    let media: MediaLink[] = [];
    try {
      media = JSON.parse(form.mediaJson);
    } catch {
      setError('Поле медиа должно быть корректным JSON массивом.');
      setLoading(false);
      return;
    }

    const res = await fetch('/api/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        phone: form.phone,
        serviceId: Number(form.serviceId),
        area: Number(form.area),
        address: form.address,
        desiredDate: form.desiredDate,
        comment: form.comment,
        media
      })
    });

    const json = await res.json();
    if (!res.ok) {
      setError(Array.isArray(json.errors) ? json.errors.join('; ') : json.error || 'Ошибка при отправке заявки');
      setLoading(false);
      return;
    }

    setSuccess(`Заявка №${json.request_id} принята. Предварительная стоимость: ${json.calc_price} ₽.`);
    setForm(initial);
    setLoading(false);
  }

  return (
    <form onSubmit={onSubmit} className="request-form">
      <label htmlFor="name">Имя</label>
      <input id="name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required />

      <label htmlFor="phone">Телефон</label>
      <input id="phone" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} required placeholder="+7..." />

      <label htmlFor="service">Услуга</label>
      <select id="service" value={form.serviceId} onChange={(e) => setForm((p) => ({ ...p, serviceId: Number(e.target.value) }))} required>
        {services.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
      </select>

      <div className="two-col">
        <div>
          <label htmlFor="area">Площадь (м²)</label>
          <input id="area" type="number" min={1} value={form.area} onChange={(e) => setForm((p) => ({ ...p, area: Number(e.target.value) }))} />
        </div>
        <div className="price-hint">Ориентировочно: <strong>{roughPrice} ₽</strong></div>
      </div>

      <label htmlFor="address">Адрес</label>
      <input id="address" value={form.address} onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))} required />

      <label htmlFor="date">Желаемые дата и время</label>
      <input id="date" type="datetime-local" value={form.desiredDate} onChange={(e) => setForm((p) => ({ ...p, desiredDate: e.target.value }))} required />

      <label htmlFor="comment">Комментарий</label>
      <textarea id="comment" rows={4} value={form.comment} onChange={(e) => setForm((p) => ({ ...p, comment: e.target.value }))} />

      <label htmlFor="media">Фото/видео (JSON ссылок)</label>
      <textarea id="media" rows={3} value={form.mediaJson} onChange={(e) => setForm((p) => ({ ...p, mediaJson: e.target.value }))} placeholder='[{"type":"photo","url":"https://...","filename":"1.jpg","size":120000}]' />
      <p className="small">В production: загрузка через presigned URL (до 4 фото и 1 видео).</p>

      <label className="checkline">
        <input type="checkbox" checked={form.agree} onChange={(e) => setForm((p) => ({ ...p, agree: e.target.checked }))} required />
        Согласен на обработку персональных данных
      </label>

      <button type="submit" disabled={loading}>{loading ? 'Отправляем...' : 'Отправить заявку'}</button>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </form>
  );
}
