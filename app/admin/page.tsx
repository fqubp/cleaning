const columns = ['ID', 'Клиент', 'Услуга', 'Статус', 'Расчёт', 'Финал'];
const sampleRows = [
  ['101', 'Ирина / +7...', 'Генеральная уборка', 'Новая', '6 500 ₽', '—'],
  ['102', 'ООО Ромашка / +7...', 'Уборка офиса', 'В обработке', '18 000 ₽', '—'],
  ['103', 'Мария / +7...', 'После ремонта', 'Подтверждена', '12 300 ₽', '11 900 ₽']
];

export default function AdminPage() {
  return (
    <section>
      <h1>Админ-панель (контентный MVP)</h1>
      <p>Единая точка для обработки заявок, контроля бонусов и управления контентом.</p>

      <div className="card" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>{columns.map((c) => <th key={c} style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>{c}</th>)}</tr>
          </thead>
          <tbody>
            {sampleRows.map((row) => (
              <tr key={row[0]}>{row.map((v, i) => <td key={`${row[0]}-${i}`} style={{ borderBottom: '1px solid #eee', padding: 8 }}>{v}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Возможности</h2>
      <ul>
        <li>Фильтрация заявок по статусам и датам.</li>
        <li>Просмотр медиа и карточки клиента.</li>
        <li>Изменение статуса, финальной цены и исполнителя.</li>
        <li>Управление FAQ/блогом/прайсом.</li>
      </ul>
    </section>
  );
}
