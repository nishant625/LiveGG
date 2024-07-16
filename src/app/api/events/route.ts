import { NextResponse } from 'next/server';
import axios from 'axios';
import cheerio from 'cheerio';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const region = searchParams.get('region') || 'all';

    try {
      const apiResponse = await axios.get(`https://vlr.orlandomm.net/api/v1/events`);
      const apiData = apiResponse.data;

      if (apiData.status === "OK") {
        return NextResponse.json({ data: apiData.data });
      } else {
        throw new Error('API returned non-OK status');
      }
    } catch (apiError) {
      console.log('API failed, resorting to scraping...');
      const { data } = await axios.get('https://www.vlr.gg/events');
      const $ = cheerio.load(data);
      
      const events: { name: string }[] = [];

      $('.events-container .event-item').each((index, element) => {
        const name = $(element).find('.event-item-title').text().trim() || 'Unknown';
        events.push({ name });
      });

      return NextResponse.json({ data: events });
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}