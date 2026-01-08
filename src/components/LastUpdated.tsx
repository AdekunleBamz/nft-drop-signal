'use client';

import { useState, useEffect } from 'react';

interface LastUpdatedProps {
  lastUpdated: Date | null;
  isLoading: boolean;
  onRefresh: () => void;
}

export function LastUpdated({ lastUpdated, isLoading, onRefresh }: LastUpdatedProps) {
  const [timeAgo, setTimeAgo] = useState<string>('');

  useEffect(() => {
    if (!lastUpdated) return;

    const updateTimeAgo = () => {
      const seconds = Math.floor((Date.now() - lastUpdated.getTime()) / 1000);
      
      if (seconds < 60) {
        setTimeAgo('Just now');
      } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        setTimeAgo(`${minutes}m ago`);
      } else {
        const hours = Math.floor(seconds / 3600);
        setTimeAgo(`${hours}h ago`);
      }
    };

    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 30000); // Update every 30s

    return () => clearInterval(interval);
  }, [lastUpdated]);

  if (!lastUpdated) return null;

  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="text-choco-300">
        Updated: <span className="font-semibold text-green-300">{timeAgo}</span>
      </span>
      <button
        onClick={onRefresh}
        disabled={isLoading}
        className="flex items-center gap-1 px-3 py-1 bg-green-600/20 hover:bg-green-600/40 border border-green-600/30 rounded-lg text-green-300 text-xs font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg 
          className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
          />
        </svg>
        {isLoading ? 'Refreshing...' : 'Refresh'}
      </button>
    </div>
  );
}
