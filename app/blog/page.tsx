import { listBlogPosts } from '@/lib/content-store';

export default function BlogPage() {
  const posts = listBlogPosts();

  return (
    <section>
      <h1>Блог</h1>
      <div className="grid">
        {posts.map((post) => (
          <article key={post.id} className="card">
            <h3>{post.title}</h3>
            <p>{post.excerpt || post.content.slice(0, 120) + '...'}</p>
            <p className="small">{new Date(post.publishedAt).toLocaleDateString('ru-RU')}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
