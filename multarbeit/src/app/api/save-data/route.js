import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req) {
  try {
    const body = await req.json();

    // Test-Datei schreiben (um File Browser auszulösen)
    fs.writeFileSync('/app/data/test.txt', 'Coolify File Browser Test');

    // JSON-Datei schreiben
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `participant_${timestamp}.json`;
    const filePath = path.join('/app/data', fileName);

    fs.writeFileSync(filePath, JSON.stringify(body, null, 2));

    return NextResponse.json({ message: 'Data saved', file: fileName }, { status: 200 });
  } catch (err) {
    console.error('Fehler beim Speichern:', err);
    return NextResponse.json({ message: 'Fehler beim Speichern' }, { status: 500 });
  }
}
