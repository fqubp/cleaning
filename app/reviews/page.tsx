const reviews = [
  { name: 'Ирина, Ленинградский район', text: 'Очень аккуратно и быстро. Удобно, что можно приложить фото сразу в заявке.', rating: 5 },
  { name: 'Алексей, офис на Театральной', text: 'Подключили регулярную уборку, стало сильно проще контролировать порядок.', rating: 5 },
  { name: 'Мария, Центральный район', text: 'После ремонта отмыли всё до блеска. Спасибо за пунктуальность.', rating: 5 }
];

export default function ReviewsPage() {
  return (
    <section>
      <h1>Отзывы клиентов</h1>
      <div className="grid">
        {reviews.map((r) => (
          <article key={r.name} className="card">
            <p>{'★'.repeat(r.rating)}</p>
            <p>{r.text}</p>
            <p className="small">— {r.name}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
