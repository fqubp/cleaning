import Link from 'next/link';
import { services } from '@/lib/data';

export default function HomePage() {
  return (
    <>
      <section>
        <h1>Премиальный клининг в Калининграде</h1>
        <p>Без регистрации. Учёт по номеру телефона. До 4 фото и 1 видео в заявке.</p>
        <Link href="#request-form" className="cta">Заказать уборку</Link>
      </section>

      <section>
        <h2>Калькулятор</h2>
        <div className="grid">
          {services.map((s) => (
            <article key={s.id} className="card">
              <h3>{s.name}</h3>
              <p className="small">от {s.basePrice} ₽ / ед.</p>
            </article>
          ))}
        </div>
      </section>

      <section id="request-form">
        <h2>Оформить заявку</h2>
        <form action="/api/request" method="post">
          <label htmlFor="name">Имя</label>
          <input id="name" name="name" required />
          <label htmlFor="phone">Телефон</label>
          <input id="phone" name="phone" required placeholder="+7..." />
          <label htmlFor="serviceId">Услуга</label>
          <select id="serviceId" name="serviceId" required>
            {services.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <label htmlFor="area">Площадь (м²)</label>
          <input id="area" name="area" type="number" min={1} defaultValue={30} />
          <label htmlFor="address">Адрес</label>
          <input id="address" name="address" required />
          <label htmlFor="desiredDate">Желаемые дата и время</label>
          <input id="desiredDate" name="desiredDate" type="datetime-local" required />
          <label htmlFor="comment">Комментарий</label>
          <textarea id="comment" name="comment" rows={4} />
          <label htmlFor="media">Фото/видео (в MVP только ссылки)</label>
          <textarea id="media" name="media" placeholder='[{"type":"photo","url":"https://...","filename":"1.jpg","size":123}]' />
          <p className="small">Лимиты: до 4 фото (JPEG/PNG) и 1 видео (MP4). Загрузка через presigned URL в S3/Supabase.</p>
          <label><input type="checkbox" required /> Согласен на обработку персональных данных</label>
          <button type="submit">Отправить заявку</button>
        </form>
      </section>
    </>
  );
}
