"use client"

import { useEffect, useState } from 'react';
import { fetchNews } from '../lib/fetchNews';
import { NewsArticle } from '../lib/types';
import Link from 'next/link';

export default function NewsList() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string |null>(null);

  useEffect(() => {
    setLoading(true);
    fetchNews()
      .then(data => {
        if (data && data.data && Array.isArray(data.data.segments)) {
          setNews(data.data.segments);
        } else {
          setError('Received invalid data structure');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching news:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading news...</p>;
  if (error) return <p>Error loading news: {error}</p>;
  if (news.length === 0) return <p>No news available</p>;

  return (
    <div>
      <ul>
        {news.map((article, index) => (
          <li key={index}>
            <h2 className="text-xl font-bold mb-2">{article.title}</h2>
            <p className="text-gray-600 mb-4">{article.description}</p>
            <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
              <span>{article.date}</span>
              <span>By {article.author}</span>
            </div>
            <Link 
              href={article.url_path}
              className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Read More
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}