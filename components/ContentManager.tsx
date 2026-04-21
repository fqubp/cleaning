'use client';

import { useEffect, useState } from 'react';

type BlogPost = { id: number; title: string; slug: string; excerpt: string; content: string };
type FaqItem = { id: number; question: string; answer: string; order: number };

export default function ContentManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [faq, setFaq] = useState<FaqItem[]>([]);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  async function load() {
    const [p, f] = await Promise.all([fetch('/api/blog'), fetch('/api/faq')]);
    setPosts(await p.json());
    setFaq(await f.json());
  }

  useEffect(() => {
    void load();
  }, []);

  async function addPost(e: React.FormEvent) {
    e.preventDefault();
    await fetch('/api/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, slug, excerpt, content })
    });
    setTitle(''); setSlug(''); setExcerpt(''); setContent('');
    await load();
  }

  async function removePost(id: number) {
    await fetch(`/api/blog/${id}`, { method: 'DELETE' });
    await load();
  }

  async function addFaq(e: React.FormEvent) {
    e.preventDefault();
    await fetch('/api/faq', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, answer, order: faq.length + 1 })
    });
    setQuestion(''); setAnswer('');
    await load();
  }

  async function removeFaq(id: number) {
    await fetch(`/api/faq/${id}`, { method: 'DELETE' });
    await load();
  }

  return (
    <section>
      <h2>Управление контентом</h2>
      <div className="grid">
        <article className="card">
          <h3>Новая статья</h3>
          <form onSubmit={addPost}>
            <label>Заголовок</label><input value={title} onChange={(e) => setTitle(e.target.value)} required />
            <label>Slug</label><input value={slug} onChange={(e) => setSlug(e.target.value)} required />
            <label>Короткое описание</label><input value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
            <label>Контент</label><textarea rows={4} value={content} onChange={(e) => setContent(e.target.value)} required />
            <button type="submit">Добавить статью</button>
          </form>
          <ul>{posts.map((p) => <li key={p.id}>{p.title} <button onClick={() => removePost(p.id)}>Удалить</button></li>)}</ul>
        </article>

        <article className="card">
          <h3>FAQ</h3>
          <form onSubmit={addFaq}>
            <label>Вопрос</label><input value={question} onChange={(e) => setQuestion(e.target.value)} required />
            <label>Ответ</label><textarea rows={3} value={answer} onChange={(e) => setAnswer(e.target.value)} required />
            <button type="submit">Добавить вопрос</button>
          </form>
          <ul>{faq.map((f) => <li key={f.id}>{f.question} <button onClick={() => removeFaq(f.id)}>Удалить</button></li>)}</ul>
        </article>
      </div>
    </section>
  );
}
