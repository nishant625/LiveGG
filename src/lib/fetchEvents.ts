export async function fetchEvents(region: string = 'all'): Promise<any> {
  const response = await fetch(`/api/events?region=${region}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch events for region: ${region}`);
  }
  const data = await response.json();
  return data;
}