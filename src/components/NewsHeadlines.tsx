"use client"

import { useState, useEffect } from 'react';
import { fetchNews } from '../lib/fetchNews';
import { NewsArticle } from '../lib/types';

export default function NewsHeadlines() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchNews()
      .then((data) => {
        setNews(data.data.segments.slice(0, 4)); // Get first 4 news articles
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch news');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading news...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Latest News</h2>
      <ul>
        {news.map((article, index) => (
          <li key={index} className="mb-4">
            <a href={article.url_path} className="text-blue-600 hover:underline font-semibold">
              {article.title}
            </a>
            <p className="text-sm text-gray-600 mt-1">{article.description}</p>
            <p className="text-xs text-gray-500 mt-1">
              {article.date} • By {article.author}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}