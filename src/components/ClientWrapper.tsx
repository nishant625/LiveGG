"use client";

import React from 'react';
import { TeamProvider } from './TeamProvider';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return <TeamProvider>{children}</TeamProvider>;
}