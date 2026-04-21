const domestic = [
  ['Уборка квартиры', 'от 120 ₽/м²'],
  ['Генеральная уборка', 'от 180 ₽/м²'],
  ['После ремонта', 'от 220 ₽/м²'],
  ['Мойка окон', 'от 80 ₽/м²'],
  ['Химчистка мебели', 'от 1500 ₽/изделие']
];

const commercial = [
  ['Офис до 100 м²', 'от 12 000 ₽/мес'],
  ['Офис 100–300 м²', 'от 28 000 ₽/мес'],
  ['Разовая уборка', 'от 140 ₽/м²'],
  ['Генеральная для бизнеса', 'от 200 ₽/м²']
];

export default function PricingPage() {
  return (
    <section>
      <h1>Прайс-лист</h1>
      <p className="small">Цены ориентировочные. Итог зависит от площади, сложности и дополнительных услуг.</p>
      <div className="grid">
        <article className="card">
          <h2>Домашний клининг</h2>
          <ul>{domestic.map(([s, p]) => <li key={s}><strong>{s}</strong> — {p}</li>)}</ul>
        </article>
        <article className="card">
          <h2>Коммерческий клининг</h2>
          <ul>{commercial.map(([s, p]) => <li key={s}><strong>{s}</strong> — {p}</li>)}</ul>
        </article>
      </div>
    </section>
  );
}
