"use client";
import { useState, useEffect } from 'react';
import { fetchEvents } from '../lib/fetchEvents';

interface Event {
  id: string;
  name: string;
  img?: string; // Optional for cases where only name is scraped
}

export default function AllEvent({ region, title }: { region: string; title: string; }) {
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

  return (
    <div className="h-full">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <ul className="space-y-4">
        {events.map((event) => (
          <li key={event.id} className="flex items-center p-4 bg-gray-100 rounded shadow">
            <img src={event.img} alt={event.name} className="w-12 h-12 object-cover rounded-md mr-4" />
            <div>{event.name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}