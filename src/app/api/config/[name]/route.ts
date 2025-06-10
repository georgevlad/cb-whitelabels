// src/app/api/config/[name]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    // Await the params object before destructuring
    const { name } = await params;
    
    // Validate the config name to prevent directory traversal
    if (!name || !/^[a-zA-Z0-9_-]+$/.test(name)) {
      return NextResponse.json(
        { error: 'Invalid configuration name' },
        { status: 400 }
      );
    }

    // Path to the configuration file
    const configPath = path.join(process.cwd(), 'src', 'config', `${name}.json`);
    
    // Check if file exists
    if (!fs.existsSync(configPath)) {
      return NextResponse.json(
        { error: 'Configuration not found' },
        { status: 404 }
      );
    }

    // Read and parse the configuration file
    const configData = fs.readFileSync(configPath, 'utf8');
    const config = JSON.parse(configData);

    return NextResponse.json(config);
  } catch (error) {
    console.error('Error loading configuration:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}