import React from 'react';
import EventList from '../components/EventList';
import MatchList from '../components/MatchList';
import NewsHeadlines from '../components/NewsHeadlines';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="col-span-1 md:col-span-2 p-4 border border-gray-600 rounded">
          <EventList region="all" title="Featured Events" />
        </div>
        <div className="col-span-1 p-4 border border-gray-600 rounded">
          <NewsHeadlines />
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        <div className="col-span-1 p-4 border border-gray-600 rounded">
          <MatchList type="live_score" title="Live Matches" />
        </div>
        <div className="col-span-1 p-4 border border-gray-600 rounded">
          <MatchList type="upcoming" title="Upcoming Matches" />
        </div>
        <div className="col-span-1 p-4 border border-gray-600 rounded">
          <MatchList type="results" title="Match Results" />
        </div>
      </div>
    </div>
  );
}