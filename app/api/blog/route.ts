import { NextRequest, NextResponse } from 'next/server';
import { createBlogPost, listBlogPosts } from '@/lib/content-store';
import { isAdminAuthenticated } from '@/lib/auth';

export async function GET() {
  return NextResponse.json(listBlogPosts());
}

export async function POST(req: NextRequest) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  if (!body.title || !body.slug || !body.content) {
    return NextResponse.json({ error: 'title, slug, content required' }, { status: 400 });
  }

  const post = createBlogPost({
    title: String(body.title),
    slug: String(body.slug),
    excerpt: String(body.excerpt || ''),
    content: String(body.content)
  });

  return NextResponse.json(post, { status: 201 });
}
