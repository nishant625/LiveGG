"use client";
import AllEvent from '@/components/AllEvent';

export default function EventsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Events</h1>
        <AllEvent region="all" title="All Events" />
    </div>
  );
}
