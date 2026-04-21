export default function BonusesPage() {
  return (
    <section>
      <h1>Акции и бонусы</h1>
      <div className="grid">
        <article className="card">
          <h3>Начисление 10%</h3>
          <p>После выполнения заказа возвращаем 10% бонусами на номер телефона.</p>
        </article>
        <article className="card">
          <h3>Списание до 10%</h3>
          <p>Следующую заявку можно частично оплатить бонусами (до 10% суммы).</p>
        </article>
        <article className="card">
          <h3>Прозрачная история</h3>
          <p>В боте и админке отображаются операции начисления и списания.</p>
        </article>
      </div>
    </section>
  );
}
