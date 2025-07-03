import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req) {
  try {
    const body = await req.json();

    const dir = '/app/data';
    const filename = `participant_${Date.now()}.json`;
    const filepath = path.join(dir, filename);

    fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(filepath, JSON.stringify(body, null, 2));

    return NextResponse.json({ message: 'Data saved', file: filename }, { status: 200 });
  } catch (err) {
    console.error('Failed to save data:', err);
    return NextResponse.json({ message: 'Save failed' }, { status: 500 });
  }
}
