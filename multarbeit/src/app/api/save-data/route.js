import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const SECRET = process.env.SAVE_DATA_TOKEN;

export async function POST(req) {
  console.log('📥 POST /api/save-data called');

  const clientToken = req.headers.get('x-secret-token');
  if (SECRET && clientToken !== SECRET) {
    console.warn('❌ Invalid or missing secret token');
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  try {
    const data = await req.json();

    const dir = '/app/data';
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `participant_${timestamp}.json`;
    const filePath = path.join(dir, filename);

    fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`✅ Data written to ${filePath}`);

    return NextResponse.json({ message: 'Data saved', file: filename }, { status: 200 });
  } catch (err) {
    console.error('❌ Error saving data:', err);
    return NextResponse.json({ message: 'Failed to save' }, { status: 500 });
  }
}
