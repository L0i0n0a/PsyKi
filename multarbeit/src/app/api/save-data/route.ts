import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

/**
 * Secret token for authenticating data save requests
 * Should be set in environment variables for security
 */
const SECRET = process.env.SAVE_DATA_TOKEN;

/**
 * API Route: Save participant response data
 *
 * This endpoint saves participant responses to their individual JSON file.
 * It requires a secret token for authentication and appends new responses
 * to existing data for the same participant.
 *
 * Authentication:
 * - Requires x-secret-token header matching SAVE_DATA_TOKEN environment variable
 *
 * Request body should contain:
 * - code: Participant identifier
 * - responses: Array of response data to append
 *
 * @param req - Request object with headers and JSON body
 * @returns JSON response confirming save or error details
 */
export async function POST(req: Request) {
  // Extract and validate authentication token
  const clientToken = req.headers.get('x-secret-token');

  if (SECRET && clientToken !== SECRET) {
    console.warn('❌ Invalid or missing secret token');
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  try {
    // Parse request body to extract participant data
    const requestData = await req.json();
    const { code, responses } = requestData;

    // Validate required participant code
    if (!code || typeof code !== 'string') {
      return NextResponse.json({ message: 'Missing or invalid participant code' }, { status: 400 });
    }

    // Determine the correct data directory path
    // Check for Docker environment first, then fall back to local development
    const dataDirectory = fs.existsSync('/app/data') ? '/app/data' : path.join(process.cwd(), 'data');

    const filename = `participant_${code}.json`;
    const filePath = path.join(dataDirectory, filename);

    // Ensure the data directory exists (create if necessary)
    fs.mkdirSync(dataDirectory, { recursive: true });

    // Read existing participant data if the file already exists
    let existingResponses: unknown[] = [];
    if (fs.existsSync(filePath)) {
      try {
        const existingContent = fs.readFileSync(filePath, 'utf8');
        existingResponses = JSON.parse(existingContent);
      } catch (parseError) {
        console.error(`❌ Error parsing existing data for participant ${code}:`, parseError);
        // Continue with empty array if existing file is corrupted
        existingResponses = [];
      }
    }

    // Merge existing responses with new responses
    const newResponses = Array.isArray(responses) ? responses : [];
    const mergedResponses = [...existingResponses, ...newResponses];

    // Save the merged data to the participant's file
    fs.writeFileSync(filePath, JSON.stringify(mergedResponses, null, 2));

    console.log(`✅ Data saved for participant ${code}: ${newResponses.length} new responses`);

    return NextResponse.json(
      {
        message: 'Data saved successfully',
        file: filename,
        totalResponses: mergedResponses.length,
        newResponses: newResponses.length,
      },
      { status: 200 }
    );
  } catch (error) {
    // Handle any unexpected errors during processing
    console.error('❌ Error saving participant data:', error);
    return NextResponse.json({ message: 'Failed to save data' }, { status: 500 });
  }
}
