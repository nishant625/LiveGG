"use client";
import { useState, useEffect } from 'react';
import { fetchEvents } from '../lib/fetchEvents';

interface Event {
  name: string;
  img?: string; // Optional for cases where only name is scraped
}

export default function EventList({ region, title }: { region: string; title: string; }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchEvents(region)
      .then(data => {
        if (data && Array.isArray(data.data)) {
          setEvents(data.data);
        } else {
          setError('Received invalid data structure');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(`Error fetching events for ${region}:`, err);
        setError(err.message);
        setLoading(false);
      });
  }, [region]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Use filter to get the top 4 events
  const topEvents = events.filter((_, index) => index < 4);

  return (
    <div className="h-full">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <ul className="space-y-4">
        {topEvents.map((event, index) => (
          <li key={event.name} className="flex items-center p-4 bg-gray-100 rounded shadow">
            {event.img && (
              <img src={event.img} alt={event.name} className="w-12 h-12 object-cover rounded-md mr-4" />
            )}
            <div>{event.name}</div>
          </li>
        ))}
      </ul>
      
      {events.length > 4 && (
        <div className="text-center mt-4">
          <button 
            onClick={() => {
              // Handle logic to fetch and show all events here
            }} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            View More
          </button>
        </div>
      )}
    </div>
  );
}