export default function AdminPage() {
  return (
    <section>
      <h1>Админ-панель (MVP)</h1>
      <p>Доступ только для администратора. Здесь будет список заявок, статусы, бонусы и медиа.</p>
      <ul>
        <li>GET /api/requests (в MVP: GET /api/request)</li>
        <li>GET/PUT/DELETE /api/request/:id</li>
        <li>GET /api/bonuses/:phone</li>
      </ul>
    </section>
  );
}
