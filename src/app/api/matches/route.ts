import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'results';

  const endpoints = {
    upcoming: 'https://vlrggapi.vercel.app/match?q=upcoming',
    live_score: 'https://vlrggapi.vercel.app/match?q=live_score',
    results: 'https://vlrggapi.vercel.app/match?q=results'
  };

  console.log(`Fetching ${type} matches`);
  const response = await fetch(endpoints[type as keyof typeof endpoints]);
  const data = await response.json();
  console.log(`Received data:`, data);
  return NextResponse.json(data);
}