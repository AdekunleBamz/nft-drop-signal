'use client';

import { useState } from 'react';

interface DropFiltersProps {
  onFilterChange: (filters: { search: string; blockchain: string });
  totalDrops: number;
}

export function DropFilters({ onFilterChange, totalDrops }: DropFiltersProps) {
  const [search, setSearch] = useState('');
  const [blockchain, setBlockchain] = useState('all');

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onFilterChange({ search: value, blockchain });
  };

  const handleBlockchainChange = (value: string) => {
    setBlockchain(value);
    onFilterChange({ search, blockchain: value });
  };

  return (
    <div className="glass p-4 rounded-lg mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search collections..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full px-4 py-2 bg-black/30 border border-green-600/30 rounded-lg text-white placeholder-choco-200 focus:outline-none focus:border-green-400 transition-colors"
          />
        </div>

        {/* Blockchain Filter */}
        <div className="flex gap-2 flex-wrap">
          {['all', 'Ethereum', 'Base', 'Polygon', 'Solana'].map((chain) => (
            <button
              key={chain}
              onClick={() => handleBlockchainChange(chain)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                blockchain === chain
                  ? 'bg-green-500 text-white border-2 border-green-300'
                  : 'bg-black/30 text-choco-200 border border-green-600/30 hover:bg-green-900/40'
              }`}
            >
              {chain === 'all' ? '🌐 All' : chain}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-green-600/20">
        <span className="text-sm text-choco-200">
          Showing <span className="font-semibold text-green-300">{totalDrops}</span> drops
        </span>
        <div className="flex items-center gap-2 text-xs text-choco-300">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          Auto-refresh every 30s
        </div>
      </div>
    </div>
  );
}
