import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const AUTH_USER = process.env.DOWNLOAD_USER;
const AUTH_PASS = process.env.DOWNLOAD_PASS;

function parseBasicAuth(authHeader: string | null) {
  if (!authHeader?.startsWith('Basic ')) return null;
  const base64 = authHeader.split(' ')[1];
  const [user, pass] = Buffer.from(base64, 'base64').toString().split(':');
  return { user, pass };
}

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  const creds = parseBasicAuth(authHeader);

  if (!creds || creds.user !== AUTH_USER || creds.pass !== AUTH_PASS) {
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Restricted Area"' },
    });
  }

  const dir = '/app/data';

  try {
    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'));

    if (files.length === 0) {
      return NextResponse.json({ message: 'No data found' }, { status: 404 });
    }

    const mergedData: Record<string, unknown> = {};

    for (const file of files) {
      const content = fs.readFileSync(path.join(dir, file), 'utf-8');
      mergedData[file] = JSON.parse(content);
    }

    const output = JSON.stringify(mergedData, null, 2);
    const filename = `all_participants_${Date.now()}.json`;

    return new NextResponse(output, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (err) {
    console.error('❌ Error reading files:', err);
    return NextResponse.json({ message: 'Read failed' }, { status: 500 });
  }
}
