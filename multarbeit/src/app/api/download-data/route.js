import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const AUTH_USER = process.env.DOWNLOAD_USER;
const AUTH_PASS = process.env.DOWNLOAD_PASS;

// 🔐 Basic Auth parser
function parseBasicAuth(authHeader) {
  if (!authHeader?.startsWith('Basic ')) return null;
  const base64 = authHeader.split(' ')[1];
  const [user, pass] = Buffer.from(base64, 'base64').toString().split(':');
  return { user, pass };
}

export async function GET(req) {
  const authHeader = req.headers.get('authorization');
  const creds = parseBasicAuth(authHeader);

  // 🔒 Auth check
  if (!creds || creds.user !== AUTH_USER || creds.pass !== AUTH_PASS) {
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Restricted Area"' },
    });
  }

  const dir = '/app/data'; // must match your Coolify volume mount

  try {
    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'));
    const latest = files.sort().pop(); // get newest file

    if (!latest) {
      return NextResponse.json({ message: 'No data found' }, { status: 404 });
    }

    const filePath = path.join(dir, latest);
    const content = fs.readFileSync(filePath, 'utf-8');

    return new NextResponse(content, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="${latest}"`,
      },
    });
  } catch (err) {
    console.error('❌ Error reading file:', err);
    return NextResponse.json({ message: 'Read failed' }, { status: 500 });
  }
}
