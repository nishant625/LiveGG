"use client";

import { useEffect, useState, useRef } from 'react';
import { fetchMatches } from '../lib/fetchMatches'; // Adjust the import path based on your project structure
import { Match, MatchType } from '../lib/types';
import { useTeams } from '../components/TeamProvider';
import Image from 'next/image';

interface MatchListProps {
  type: MatchType;
  title: string;
}

export default function AllMatchList({ type, title }: MatchListProps) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { getTeamIcon } = useTeams();

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchMatches(type)
      .then(data => {
        if (data && data.data && Array.isArray(data.data.segments)) {
          setMatches(data.data.segments);
        } else {
          setError('Received invalid data structure');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(`Error fetching ${type} matches:`, err);
        setError(err.message);
        setLoading(false);
      });
  }, [type]);

  if (loading) return <p>Loading {title}...</p>;
  if (error) return <p>Error loading {title}: {error}</p>;
  if (matches.length === 0) return <p>No {title} available</p>;

  return (
    <div className="relative bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
      <div ref={scrollContainerRef} className="flex overflow-x-auto gap-4 pb-4">
        {matches.map((match, index) => {
          const team1Icon = getTeamIcon(match.team1);
          const team2Icon = getTeamIcon(match.team2);
          
          return (
            <div key={index} className="flex-none w-80 bg-gray-200 border border-black rounded-lg shadow-md p-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2">
                  {team1Icon ? (
                    <Image 
                      src={team1Icon} 
                      alt={match.team1} 
                      width={24} 
                      height={24} 
                      onError={() => console.error(`Failed to load image for ${match.team1}: ${team1Icon}`)}
                    />
                  ) : (
                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-xs text-gray-800">{match.team1.charAt(0)}</span>
                    </div>
                  )}
                  <span className="font-bold text-gray-800">{match.team1}</span>
                </div>
                <span className="text-xl font-bold text-gray-800">{match.score1}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  {team2Icon ? (
                    <Image 
                      src={team2Icon} 
                      alt={match.team2} 
                      width={24} 
                      height={24} 
                      onError={() => console.error(`Failed to load image for ${match.team2}: ${team2Icon}`)}
                    />
                  ) : (
                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-xs text-gray-800">{match.team2.charAt(0)}</span>
                    </div>
                  )}
                  <span className="font-bold text-gray-800">{match.team2}</span>
                </div>
                <span className="text-xl font-bold text-gray-800">{match.score2}</span>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                {match.tournament_name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}