import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const SECRET = process.env.SAVE_DATA_TOKEN;

function getUniqueFilename(dir: string, code: string) {
  let trial = 1;
  let filename = `participant_${code}.json`;
  let filePath = path.join(dir, filename);

  while (fs.existsSync(filePath)) {
    trial += 1;
    filename = `participant_${code}_trial_${trial}.json`;
    filePath = path.join(dir, filename);
  }
  return { filename, filePath };
}

export async function POST(req: Request) {
  console.log('📥 POST /api/save-data called');

  const clientToken = req.headers.get('x-secret-token');
  if (SECRET && clientToken !== SECRET) {
    console.warn('❌ Invalid or missing secret token');
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  try {
    const data = await req.json();
    const { code, responses } = data;

    if (!code) {
      return NextResponse.json({ message: 'Missing code' }, { status: 400 });
    }

    const dir = fs.existsSync('/app/data') ? '/app/data' : path.join(process.cwd(), 'data');
    fs.mkdirSync(dir, { recursive: true });

    // Find a unique filename for this code
    const { filename, filePath } = getUniqueFilename(dir, code);

    let existing = [];
    if (fs.existsSync(filePath)) {
      existing = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }

    const merged = [...existing, ...(responses || [])];
    fs.writeFileSync(filePath, JSON.stringify(merged, null, 2));
    console.log(`✅ Data written to ${filePath}`);

    return NextResponse.json({ message: 'Data saved', file: filename }, { status: 200 });
  } catch (err) {
    console.error('❌ Error saving data:', err);
    return NextResponse.json({ message: 'Failed to save' }, { status: 500 });
  }
}
