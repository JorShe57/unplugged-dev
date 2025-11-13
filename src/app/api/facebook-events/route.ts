import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch from SociableKit API (AccentAPI endpoint)
    const nocache = Date.now(); // Add nocache parameter to prevent caching
    const response = await fetch(`https://data.accentapi.com/feed/25589029.json?nocache=${nocache}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0',
      },
      // Add cache to reduce API calls
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`SociableKit API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Log for debugging
    console.log('SociableKit API Response Status:', response.status);
    console.log('Events count:', data.events?.length || 0);
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error fetching Facebook events:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json(
      { error: 'Failed to fetch events', events: [] },
      { status: 500 }
    );
  }
}

