import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { filename, contentType } = await req.json();

  const key = `${Date.now()}-${String(filename || 'file')}`;
  return NextResponse.json({
    key,
    uploadUrl: process.env.MOCK_UPLOAD_URL || 'https://example-storage.local/upload',
    headers: { 'Content-Type': contentType || 'application/octet-stream' }
  });
}
