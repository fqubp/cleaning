import { NextRequest, NextResponse } from 'next/server';

type Post = { id: number; title: string; slug: string; content: string; publishedAt: string };
const posts: Post[] = [];

export async function GET() {
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const post: Post = {
    id: posts.length + 1,
    title: body.title,
    slug: body.slug,
    content: body.content,
    publishedAt: new Date().toISOString()
  };
  posts.unshift(post);
  return NextResponse.json(post, { status: 201 });
}
