import { listFaq } from '@/lib/content-store';

export default function FAQPage() {
  const faq = listFaq();

  return (
    <section>
      <h1>FAQ</h1>
      {faq.map((item) => (
        <details key={item.id} className="card" style={{ marginBottom: 10 }}>
          <summary><strong>{item.question}</strong></summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </section>
  );
}
