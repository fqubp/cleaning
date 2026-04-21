const works = [
  { title: 'Квартира 52 м²', before: 'Пыль после ремонта', after: 'Готово к заселению за 1 день' },
  { title: 'Офис 180 м²', before: 'Следы эксплуатации', after: 'Чистые рабочие зоны и переговорные' },
  { title: 'Кухня в студии', before: 'Жир и налёт', after: 'Глубокая очистка поверхностей' }
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
            <p><strong>До:</strong> {w.before}</p>
            <p><strong>После:</strong> {w.after}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
