import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

/**
 * Authentication credentials for data download endpoint
 * These should be set in environment variables for security
 */
const AUTH_USER = process.env.DOWNLOAD_USER;
const AUTH_PASS = process.env.DOWNLOAD_PASS;

/**
 * Parses Basic Authentication header to extract username and password
 *
 * @param authHeader - The Authorization header from the request
 * @returns Object with user and pass properties, or null if invalid
 */
function parseBasicAuth(authHeader: string | null): { user: string; pass: string } | null {
  // Check if header exists and starts with 'Basic '
  if (!authHeader?.startsWith('Basic ')) {
    return null;
  }

  try {
    // Extract and decode the base64 encoded credentials
    const base64 = authHeader.split(' ')[1];
    const decoded = Buffer.from(base64, 'base64').toString();
    const [user, pass] = decoded.split(':');

    return { user, pass };
  } catch {
    // Return null if decoding fails
    return null;
  }
}

/**
 * API Route: Download all participant data
 *
 * This endpoint requires Basic Authentication and returns all participant data
 * as a single JSON file download. Used by researchers to export study results.
 *
 * Authentication required:
 * - Username and password must match DOWNLOAD_USER and DOWNLOAD_PASS environment variables
 *
 * @param req - Request object with Authorization header
 * @returns JSON file download with all participant data or error response
 */
export async function GET(req: Request) {
  // Extract Authorization header from the request
  const authHeader = req.headers.get('authorization');
  const credentials = parseBasicAuth(authHeader);

  // Validate authentication credentials
  if (!credentials || credentials.user !== AUTH_USER || credentials.pass !== AUTH_PASS) {
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Restricted Area"' },
    });
  }

  // Define the data directory path (assumes Docker environment)
  const dataDirectory = '/app/data';

  try {
    // Read all JSON files from the data directory
    const jsonFiles = fs.readdirSync(dataDirectory).filter((filename) => filename.endsWith('.json'));

    // Check if any data files exist
    if (jsonFiles.length === 0) {
      return NextResponse.json({ message: 'No participant data found' }, { status: 404 });
    }

    // Merge all participant data into a single object
    const mergedParticipantData: Record<string, unknown> = {};

    for (const filename of jsonFiles) {
      const filePath = path.join(dataDirectory, filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');

      try {
        mergedParticipantData[filename] = JSON.parse(fileContent);
      } catch (parseError) {
        console.error(`❌ Error parsing JSON file ${filename}:`, parseError);
        // Continue processing other files even if one fails
        mergedParticipantData[filename] = { error: 'Failed to parse JSON' };
      }
    }

    // Convert merged data to formatted JSON string
    const jsonOutput = JSON.stringify(mergedParticipantData, null, 2);

    // Generate timestamp-based filename for the download
    const downloadFilename = `all_participants_${Date.now()}.json`;

    // Return the merged data as a downloadable file
    return new NextResponse(jsonOutput, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="${downloadFilename}"`,
      },
    });
  } catch (error) {
    // Handle any file system or processing errors
    console.error('❌ Error processing participant data:', error);
    return NextResponse.json({ message: 'Failed to process participant data' }, { status: 500 });
  }
}
