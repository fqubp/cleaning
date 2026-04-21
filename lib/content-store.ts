export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  publishedAt: string;
};

export type FaqItem = {
  id: number;
  question: string;
  answer: string;
  order: number;
};

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Чек-лист генеральной уборки квартиры',
    slug: 'general-cleaning-checklist',
    excerpt: 'Пошаговый план, чтобы ничего не забыть.',
    content: 'Разделите уборку на зоны: кухня, санузел, комнаты. Начинайте сверху вниз и завершайте влажной уборкой.',
    publishedAt: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Как убрать квартиру после ремонта',
    slug: 'after-renovation-tips',
    excerpt: 'С чего начинать и какие средства использовать.',
    content: 'Сначала уберите строительный мусор, затем удалите пыль пылесосом с HEPA-фильтром и завершите мойкой поверхностей.',
    publishedAt: new Date().toISOString()
  }
];

const faqItems: FaqItem[] = [
  { id: 1, question: 'Сколько длится уборка?', answer: 'Обычно от 2 до 6 часов, зависит от площади и типа услуги.', order: 1 },
  { id: 2, question: 'Можно ли добавить фото и видео?', answer: 'Да, до 4 фото и 1 видео через защищённую загрузку.', order: 2 },
  { id: 3, question: 'Как начисляются бонусы?', answer: '10% от финальной суммы после выполнения заказа.', order: 3 }
];

export function listBlogPosts() {
  return [...blogPosts].sort((a, b) => b.id - a.id);
}

export function createBlogPost(input: Omit<BlogPost, 'id' | 'publishedAt'>): BlogPost {
  const post: BlogPost = { id: blogPosts.length + 1, publishedAt: new Date().toISOString(), ...input };
  blogPosts.unshift(post);
  return post;
}

export function updateBlogPost(id: number, patch: Partial<BlogPost>): BlogPost | null {
  const item = blogPosts.find((p) => p.id === id);
  if (!item) return null;
  Object.assign(item, patch);
  return item;
}

export function deleteBlogPost(id: number): boolean {
  const idx = blogPosts.findIndex((p) => p.id === id);
  if (idx === -1) return false;
  blogPosts.splice(idx, 1);
  return true;
}

export function listFaq() {
  return [...faqItems].sort((a, b) => a.order - b.order);
}

export function createFaq(input: Omit<FaqItem, 'id'>): FaqItem {
  const item: FaqItem = { id: faqItems.length + 1, ...input };
  faqItems.push(item);
  return item;
}

export function updateFaq(id: number, patch: Partial<FaqItem>): FaqItem | null {
  const item = faqItems.find((x) => x.id === id);
  if (!item) return null;
  Object.assign(item, patch);
  return item;
}

export function deleteFaq(id: number): boolean {
  const idx = faqItems.findIndex((x) => x.id === id);
  if (idx === -1) return false;
  faqItems.splice(idx, 1);
  return true;
}
