import AdminDashboard from '@/components/AdminDashboard';

export default function AdminPage() {
  return (
    <section>
      <h1>Админ-панель</h1>
      <p>Управляйте заявками: меняйте статусы, финальную цену и отслеживайте поток обращений.</p>
      <AdminDashboard />
    </section>
  );
}
