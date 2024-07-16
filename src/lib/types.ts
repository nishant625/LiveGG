export interface Match {
  team1: string;
  team2: string;
  score1: string;
  score2: string;
  flag1: string;
  flag2: string;
  time_completed: string;
  round_info: string;
  tournament_name: string;
  match_page: string;
  tournament_icon: string;
}

export interface MatchesResponse {
  data: {
    status: number;
    segments: Match[];
  };
}

export type MatchType = 'upcoming' | 'live_score' | 'results';

export interface Event {
  id: string;
  name: string;
  status: string;
  prizepool: string;
  dates: string;
  country: string;
  img: string; // Image URL
}

export interface EventsResponse {
  status: string;
  data: Event[];
}

export interface NewsArticle {
  title: string;
  description: string;
  url_path: string;
  date: string;
  author: string;
  img: string;
}

export interface NewsResponse {
  data: {
    status: number;
    segments: NewsArticle[];
  };
}

export interface NewsListProps {
  page?: number;
}

export interface Team {
  id: string;
  url: string;
  name: string;
  img: string;
  country: string;
}

export interface TeamsResponse {
  status: string;
  region: string;
  size: number;
  pagination: {
    page: number;
    limit: number;
    totalElements: number;
    totalPages: number;
    hasNextPage: boolean;
  };
  data: Team[];
}