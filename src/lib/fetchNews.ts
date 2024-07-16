import { NewsResponse } from './types';

export async function fetchNews(page: number = 1): Promise<NewsResponse> {
  const response = await fetch(`/api/news?page=${page}`);
  if (!response.ok) {
    throw new Error('Failed to fetch news');
  }
  return response.json();
}