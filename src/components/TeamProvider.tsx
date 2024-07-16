"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchTeams } from '../lib/fetchTeams';
import { Team } from '../lib/types';

interface TeamContextType {
  teams: { [key: string]: Team };
  getTeamIcon: (teamName: string) => string | undefined;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export function TeamProvider({ children }: { children: React.ReactNode }) {
  const [teams, setTeams] = useState<{ [key: string]: Team }>({});

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await fetchTeams();
        if (response && response.data) {
          const teamMap = response.data.reduce((acc, team) => {
            acc[team.name.toLowerCase()] = team;
            return acc;
          }, {} as { [key: string]: Team });
          setTeams(teamMap);
        }
      } catch (error) {
        // Handle error if needed
      }
    };
  
    loadTeams();
  }, []);

  const getTeamIcon = (teamName: string): string | undefined => {
    return teams[teamName.toLowerCase()]?.img;
  };

  return (
    <TeamContext.Provider value={{ teams, getTeamIcon }}>
      {children}
    </TeamContext.Provider>
  );
}

export function useTeams() {
  const context = useContext(TeamContext);
  if (context === undefined) {
    throw new Error('useTeams must be used within a TeamProvider');
  }
  return context;
}