export default function ContactsPage() {
  return (
    <section>
      <h1>Контакты</h1>
      <p>Калининград, ул. Примерная, 10</p>
      <p>Телефон: <a href="tel:+74012000000">+7 (4012) 00-00-00</a></p>
      <p>Email: <a href="mailto:hello@klgclean.ru">hello@klgclean.ru</a></p>
      <p>
        Карта: <a href="https://maps.google.com/?q=Kaliningrad" target="_blank" rel="noreferrer">Открыть Google Maps</a>
      </p>

      <h2>Форма обратной связи</h2>
      <form>
        <label htmlFor="contact-name">Имя</label>
        <input id="contact-name" name="name" required />
        <label htmlFor="contact-phone">Телефон или Email</label>
        <input id="contact-phone" name="contact" required />
        <label htmlFor="contact-msg">Сообщение</label>
        <textarea id="contact-msg" name="message" rows={4} required />
        <button type="submit">Отправить</button>
      </form>
    </section>
  );
}
