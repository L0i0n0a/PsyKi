import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

/**
 * API Route: Check if a participant code exists
 *
 * This endpoint checks whether a participant file exists in the data directory.
 * It's used to validate participant codes before allowing access to the study.
 *
 * @param req - Request object containing the participant code
 * @returns JSON response with exists boolean flag
 */
export async function POST(req: Request) {
  try {
    // Extract the participant code from the request body
    const { code } = await req.json();

    // Validate that a code was provided
    if (!code || typeof code !== 'string') {
      return NextResponse.json({ exists: false, error: 'Invalid or missing participant code' }, { status: 400 });
    }

    // Determine the correct data directory path
    // Check for Docker environment first, then fall back to local development
    const dataDir = fs.existsSync('/app/data') ? '/app/data' : path.join(process.cwd(), 'data');

    // Construct the expected filename for the participant
    const filename = `participant_${code}.json`;
    const filePath = path.join(dataDir, filename);

    // Check if the participant file exists in the data directory
    const exists = fs.existsSync(filePath);

    return NextResponse.json({ exists });
  } catch (error) {
    // Handle any unexpected errors during processing
    console.error('Error checking participant code:', error);
    return NextResponse.json({ exists: false, error: 'Internal server error' }, { status: 500 });
  }
}
