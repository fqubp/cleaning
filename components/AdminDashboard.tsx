'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

type RequestItem = {
  id: number;
  phone: string;
  address: string;
  status: string;
  calcPrice: number;
  finalPrice: number | null;
  desiredDate: string;
};

const statuses = ['Все', 'Новая', 'В обработке', 'Подтверждена', 'Выполнена', 'Отменена'];

export default function AdminDashboard() {
  const [items, setItems] = useState<RequestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('Все');
  const router = useRouter();

  async function load() {
    setLoading(true);
    setError('');
    const res = await fetch('/api/request', { cache: 'no-store' });
    const json = await res.json();
    setItems(json);
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  async function update(id: number, status: string, finalPrice: number | null) {
    setError('');
    const res = await fetch(`/api/request/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, finalPrice })
    });

    if (res.status === 401) {
      setError('Сессия истекла. Войдите заново.');
      router.push('/admin/login');
      return;
    }

    await load();
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  const visibleItems = useMemo(
    () => (filter === 'Все' ? items : items.filter((item) => item.status === filter)),
    [items, filter]
  );

  if (loading) return <p>Загрузка заявок...</p>;

  return (
    <>
      <div className="admin-toolbar">
        <label>
          Фильтр статуса
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
        <button type="button" className="ghost-btn" onClick={logout}>Выйти</button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="admin-grid">
        {visibleItems.length === 0 && <p className="small">Пока нет заявок с выбранным фильтром.</p>}
        {visibleItems.map((item) => (
          <article key={item.id} className="card">
            <h3>Заявка #{item.id}</h3>
            <p><strong>Телефон:</strong> {item.phone}</p>
            <p><strong>Адрес:</strong> {item.address}</p>
            <p><strong>Дата:</strong> {item.desiredDate || '—'}</p>
            <p><strong>Расчёт:</strong> {item.calcPrice} ₽</p>
            <div className="two-col">
              <select value={item.status} onChange={(e) => update(item.id, e.target.value, item.finalPrice)}>
                {statuses.filter((s) => s !== 'Все').map((s) => <option key={s} value={s}>{s}</option>)}
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
    </>
  );
}
