import Link from 'next/link';

const posts = [
  { slug: 'general-cleaning-checklist', title: 'Чек-лист генеральной уборки квартиры', excerpt: 'Пошаговый план, чтобы ничего не забыть.' },
  { slug: 'after-renovation-tips', title: 'Как убрать квартиру после ремонта', excerpt: 'С чего начинать и какие средства использовать.' },
  { slug: 'office-cleaning-frequency', title: 'Как часто делать уборку в офисе', excerpt: 'Рекомендации для малого и среднего бизнеса.' }
];

export default function BlogPage() {
  return (
    <section>
      <h1>Блог</h1>
      <div className="grid">
        {posts.map((post) => (
          <article key={post.slug} className="card">
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <Link href={`/blog#${post.slug}`}>Читать</Link>
          </article>
        ))}
      </div>
    </section>
  );
}
