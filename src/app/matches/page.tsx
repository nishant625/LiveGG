"use client";

import AllMatchList from '@/components/AllMatchList';
import React from 'react';


export default function MatchesPage() {
  return (

    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Matches</h1>
      <div className="space-y-8">
        <AllMatchList type="results" title="Results" />
        <AllMatchList type="upcoming" title="Upcoming Matches" />
        <AllMatchList type="live_score" title="Live Matches" />
      </div>
    </div>
  );
}
