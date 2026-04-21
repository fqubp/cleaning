import './globals.css';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Клининг Калининград',
  description: 'Премиальный клининговый сервис в Калининграде'
};

const navItems = [
  ['/', 'Главная'],
  ['/domestic', 'Домашний клининг'],
  ['/commercial', 'Коммерческий'],
  ['/pricing', 'Цены'],
  ['/before-after', 'До/После'],
  ['/reviews', 'Отзывы'],
  ['/blog', 'Блог'],
  ['/contacts', 'Контакты'],
  ['/admin', 'Админ']
] as const;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <header className="header">
          <div className="container bar">
            <p className="logo">KLG Clean</p>
            <nav>
              {navItems.map(([href, label]) => (
                <Link key={href} href={href} className="nav-link">
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main className="container">{children}</main>
        <footer className="footer container">
          <p>© 2026 KLG Clean</p>
          <p>
            <Link href="/privacy">Политика конфиденциальности</Link>
          </p>
        </footer>
      </body>
    </html>
  );
}
