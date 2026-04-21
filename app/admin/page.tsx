import { redirect } from 'next/navigation';
import AdminDashboard from '@/components/AdminDashboard';
import ContentManager from '@/components/ContentManager';
import { isAdminAuthenticated } from '@/lib/auth';

export default function AdminPage() {
  if (!isAdminAuthenticated()) {
    redirect('/admin/login');
  }

  return (
    <>
      <section>
        <h1>Админ-панель</h1>
        <p>Управляйте заявками: меняйте статусы, финальную цену и отслеживайте поток обращений.</p>
        <AdminDashboard />
      </section>
      <ContentManager />
    </>
  );
}
