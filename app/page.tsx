import Link from 'next/link';
import RequestForm from '@/components/RequestForm';
import { services } from '@/lib/data';

const steps = [
  'Оставляете заявку на сайте или в боте',
  'Менеджер уточняет детали и подтверждает стоимость',
  'Команда приезжает в удобное время',
  'Принимаете результат и получаете бонусы'
];

const benefits = [
  ['Скорость', 'Запуск работ в день обращения или на удобную дату.'],
  ['Контроль качества', 'Чек-листы и фото-отчёты по ключевым зонам.'],
  ['Безопасность', 'Согласие на обработку ПДн, HTTPS и защищённые API.']
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div>
          <p className="badge">Клининг-сервис • Калининград</p>
          <h1>Премиальная уборка квартир и офисов</h1>
          <p>Полноценный сервис с бонусами, админкой, ботами и прозрачным расчётом стоимости.</p>
          <div className="hero-actions">
            <Link href="#request-form" className="cta">Оставить заявку</Link>
            <Link href="/pricing" className="ghost-btn">Смотреть прайс</Link>
          </div>
        </div>
        <div className="hero-stats">
          <p><strong>24/7</strong><br />приём заявок</p>
          <p><strong>10%</strong><br />начисление бонусов</p>
          <p><strong>до 4+1</strong><br />фото/видео в заявке</p>
        </div>
      </section>

      <section>
        <h2>Услуги</h2>
        <div className="grid">
          {services.map((s) => (
            <article key={s.id} className="card">
              <h3>{s.name}</h3>
              <p className="small">от {s.basePrice} ₽ / ед.</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>Почему выбирают KLG Clean</h2>
        <div className="grid">
          {benefits.map(([title, text]) => (
            <article key={title} className="card">
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>Как мы работаем</h2>
        <ol>
          {steps.map((step) => <li key={step}>{step}</li>)}
        </ol>
      </section>


      <section>
        <h2>Портфолио (заполнители под реальные фото)</h2>
        <div className="grid">
          <article className="card"><div className="photo-placeholder">Фото1 — квартира до ремонта</div></article>
          <article className="card"><div className="photo-placeholder">Фото2 — квартира после уборки</div></article>
          <article className="card"><div className="photo-placeholder">Фото3 — офис до клининга</div></article>
          <article className="card"><div className="photo-placeholder">Фото4 — офис после клининга</div></article>
        </div>
      </section>

      <section id="request-form">
        <h2>Оформить заявку</h2>
        <RequestForm />
      </section>
    </>
  );
}
