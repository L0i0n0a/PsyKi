import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  const { code } = await req.json();

  if (!code) {
    return NextResponse.json({ exists: false }, { status: 400 });
  }

  const dir = fs.existsSync('/app/data') ? '/app/data' : path.join(process.cwd(), 'data');
  const filename = `participant_${code}.json`;
  const filePath = path.join(dir, filename);

  const exists = fs.existsSync(filePath);

  return NextResponse.json({ exists });
}
