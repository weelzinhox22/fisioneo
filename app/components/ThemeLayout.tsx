'use client';

import React from 'react';
import { ThemeInfoCard } from './ThemeInfoCard';

interface ThemeLayoutProps {
  children: React.ReactNode;
  topicId?: string;
  readTime?: number;
}

export function ThemeLayout({ children, topicId, readTime }: ThemeLayoutProps) {
  return (
    <div className="theme-layout">
      <ThemeInfoCard topicId={topicId} readTime={readTime} />
      {children}
    </div>
  );
} 