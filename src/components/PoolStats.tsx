'use client';

import { useEffect, useState } from 'react';
import { PoolInfo } from '@/types/game';

interface PoolStatsProps {
  poolInfo: PoolInfo | null;
  isLoading: boolean;
}

export default function PoolStats({ poolInfo, isLoading }: PoolStatsProps) {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    if (!poolInfo) return;

    const updateTimer = () => {
      const remaining = poolInfo.timeRemaining * 1000;
      const hours = Math.floor(remaining / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [poolInfo]);

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-green-900/60 to-green-800/60 rounded-2xl p-6 border-2 border-green-500/50 shadow-2xl backdrop-blur-sm animate-pulse">
        <div className="h-24 bg-green-700/30 rounded"></div>
      </div>
    );
  }

  if (!poolInfo) return null;

  const formatAddress = (addr: string) => {
    if (addr === '0x0000000000000000000000000000000000000000') return 'No leader yet';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="bg-gradient-to-br from-green-900/60 to-green-800/60 rounded-2xl p-6 border-2 border-green-500/50 shadow-2xl backdrop-blur-sm">
      <h2 className="text-2xl font-bold mb-4 metallic-text text-green-300 text-center">
        🏆 Prize Pool
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-black/30 rounded-lg p-4 border border-green-600/30">
          <div className="text-green-400 text-sm mb-1">Pool Balance</div>
          <div className="text-2xl font-bold metallic-text text-green-200">
            ${poolInfo.poolBalance}
          </div>
        </div>

        <div className="bg-black/30 rounded-lg p-4 border border-green-600/30">
          <div className="text-green-400 text-sm mb-1">Time Left</div>
          <div className="text-xl font-bold metallic-text text-green-200">
            {timeLeft}
          </div>
        </div>

        <div className="bg-black/30 rounded-lg p-4 border border-green-600/30 col-span-2">
          <div className="text-green-400 text-sm mb-1">Current Leader</div>
          <div className="text-lg font-bold metallic-text text-green-200 truncate">
            {formatAddress(poolInfo.currentLeader)}
          </div>
          <div className="text-sm text-green-300 mt-1">
            {poolInfo.highestWins} wins
          </div>
        </div>
      </div>

      <div className="mt-4 text-center text-sm text-green-300 bg-black/20 rounded-lg p-3 border border-green-600/20">
        Round #{poolInfo.roundId} • Entry: $0.30 USDC
      </div>
    </div>
  );
}
