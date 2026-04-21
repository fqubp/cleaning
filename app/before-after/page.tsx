const works = [
  {
    title: 'Квартира 52 м²',
    before: 'Пыль после ремонта',
    after: 'Готово к заселению за 1 день',
    beforeLabel: 'Фото1 — квартира до ремонта',
    afterLabel: 'Фото2 — квартира после уборки'
  },
  {
    title: 'Офис 180 м²',
    before: 'Следы эксплуатации',
    after: 'Чистые рабочие зоны и переговорные',
    beforeLabel: 'Фото3 — офис до клининга',
    afterLabel: 'Фото4 — офис после клининга'
  },
  {
    title: 'Кухня в студии',
    before: 'Жир и налёт',
    after: 'Глубокая очистка поверхностей',
    beforeLabel: 'Фото5 — кухня до уборки',
    afterLabel: 'Фото6 — кухня после уборки'
  }
];

export default function BeforeAfterPage() {
  return (
    <section>
      <h1>До/После уборки</h1>
      <p>Примеры кейсов: реальные задачи и результат после работы команды KLG Clean.</p>
      <div className="grid">
        {works.map((w) => (
          <article key={w.title} className="card">
            <h3>{w.title}</h3>
            <div className="photo-placeholder">{w.beforeLabel}</div>
            <p><strong>До:</strong> {w.before}</p>
            <div className="photo-placeholder">{w.afterLabel}</div>
            <p><strong>После:</strong> {w.after}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
