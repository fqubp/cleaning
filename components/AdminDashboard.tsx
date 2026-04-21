'use client';

import { useEffect, useState } from 'react';

type RequestItem = {
  id: number;
  phone: string;
  address: string;
  status: string;
  calcPrice: number;
  finalPrice: number | null;
  desiredDate: string;
};

const statuses = ['Новая', 'В обработке', 'Подтверждена', 'Выполнена', 'Отменена'];

export default function AdminDashboard() {
  const [items, setItems] = useState<RequestItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch('/api/request', { cache: 'no-store' });
    const json = await res.json();
    setItems(json);
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  async function update(id: number, status: string, finalPrice: number | null) {
    await fetch(`/api/request/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, finalPrice })
    });
    await load();
  }

  if (loading) return <p>Загрузка заявок...</p>;

  return (
    <div className="admin-grid">
      {items.length === 0 && <p className="small">Пока нет заявок. Создайте первую на главной странице.</p>}
      {items.map((item) => (
        <article key={item.id} className="card">
          <h3>Заявка #{item.id}</h3>
          <p><strong>Телефон:</strong> {item.phone}</p>
          <p><strong>Адрес:</strong> {item.address}</p>
          <p><strong>Дата:</strong> {item.desiredDate || '—'}</p>
          <p><strong>Расчёт:</strong> {item.calcPrice} ₽</p>
          <div className="two-col">
            <select defaultValue={item.status} onChange={(e) => update(item.id, e.target.value, item.finalPrice)}>
              {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <input
              type="number"
              defaultValue={item.finalPrice ?? item.calcPrice}
              onBlur={(e) => update(item.id, item.status, Number(e.target.value || 0))}
            />
          </div>
        </article>
      ))}
    </div>
  );
}
