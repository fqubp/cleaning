import { cookies } from 'next/headers';

const SESSION_COOKIE = 'admin_session';

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || 'admin123';
}

export function isAdminAuthenticated(): boolean {
  const store = cookies();
  return store.get(SESSION_COOKIE)?.value === getAdminPassword();
}

export function setAdminSession() {
  const store = cookies();
  store.set(SESSION_COOKIE, getAdminPassword(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 12
  });
}

export function clearAdminSession() {
  const store = cookies();
  store.delete(SESSION_COOKIE);
}
