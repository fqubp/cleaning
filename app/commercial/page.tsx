import Link from 'next/link';

export default function CommercialPage() {
  return (
    <section>
      <h1>Коммерческий клининг</h1>
      <p>Сервис для офисов, шоурумов и коммерческих помещений в Калининграде.</p>

      <div className="grid">
        <article className="card">
          <h3>Уборка офисов</h3>
          <p>Утренняя или вечерняя уборка без остановки бизнес-процессов.</p>
        </article>
        <article className="card">
          <h3>Регулярное обслуживание</h3>
          <p>Фиксированный график и закреплённая команда клинеров.</p>
        </article>
        <article className="card">
          <h3>Гибкие SLA</h3>
          <p>Согласовываем KPI по чистоте, срокам и отчётности.</p>
        </article>
      </div>

      <h2>Почему компании выбирают нас</h2>
      <ul>
        <li>Работаем по договору и актам.</li>
        <li>Контроль качества через фото-отчёты.</li>
        <li>Быстрый запуск за 24 часа.</li>
      </ul>

      <Link className="cta" href="/#request-form">Заказать коммерческую уборку</Link>
    </section>
  );
}
