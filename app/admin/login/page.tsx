'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });

    if (!res.ok) {
      setError('Неверный пароль администратора');
      setLoading(false);
      return;
    }

    router.push('/admin');
    router.refresh();
  }

  return (
    <section style={{ maxWidth: 480, margin: '40px auto' }}>
      <h1>Вход в админ-панель</h1>
      <p className="small">Введите пароль администратора (переменная окружения <code>ADMIN_PASSWORD</code>).</p>
      <form onSubmit={onSubmit}>
        <label htmlFor="pass">Пароль</label>
        <input id="pass" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" disabled={loading}>{loading ? 'Проверка...' : 'Войти'}</button>
        {error && <p className="error">{error}</p>}
      </form>
    </section>
  );
}
