import { NextRequest, NextResponse } from 'next/server';
import { deleteBlogPost, updateBlogPost } from '@/lib/content-store';
import { isAdminAuthenticated } from '@/lib/auth';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const patch = await req.json();
  const updated = updateBlogPost(Number(params.id), patch);
  return updated ? NextResponse.json(updated) : NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const ok = deleteBlogPost(Number(params.id));
  return ok ? NextResponse.json({ success: true }) : NextResponse.json({ error: 'Not found' }, { status: 404 });
}
