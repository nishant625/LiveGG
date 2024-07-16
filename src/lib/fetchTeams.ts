import { TeamsResponse } from './types';

export async function fetchTeams(page: number = 1): Promise<TeamsResponse | null> {
  try {
    const response = await fetch(`/api/teams?page=${page}`);
    if (!response.ok) {
      
      return null;
    }
    return response.json();
  } catch (error) {
   
    return null;
  }
}