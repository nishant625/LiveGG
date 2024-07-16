import { MatchesResponse, MatchType } from "./types";

export async function fetchMatches(type: MatchType = 'results'): Promise<MatchesResponse> {
  
  const response = await fetch(`/api/matches?type=${type}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${type} matches`);
  }
  const data = await response.json();
  
  return data;
}