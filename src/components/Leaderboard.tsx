'use client';

interface LeaderboardEntry {
  address: string;
  wins: number;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  isLoading: boolean;
  currentPlayerAddress?: string;
}

export default function Leaderboard({ entries, isLoading, currentPlayerAddress }: LeaderboardProps) {
  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-green-900/60 to-green-800/60 rounded-2xl p-6 border-2 border-green-500/50 shadow-2xl backdrop-blur-sm animate-pulse">
        <div className="h-64 bg-green-700/30 rounded"></div>
      </div>
    );
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const getMedalEmoji = (rank: number) => {
    if (rank === 0) return '🥇';
    if (rank === 1) return '🥈';
    if (rank === 2) return '🥉';
    return `#${rank + 1}`;
  };

  return (
    <div className="bg-gradient-to-br from-green-900/60 to-green-800/60 rounded-2xl p-6 border-2 border-green-500/50 shadow-2xl backdrop-blur-sm">
      <h2 className="text-2xl font-bold mb-4 metallic-text text-green-300 text-center">
        📊 Leaderboard
      </h2>

      {entries.length === 0 ? (
        <div className="text-center text-green-300 py-8">
          No players yet. Be the first to play!
        </div>
      ) : (
        <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
          {entries.map((entry, index) => {
            const isCurrentPlayer = currentPlayerAddress && 
              entry.address.toLowerCase() === currentPlayerAddress.toLowerCase();

            return (
              <div
                key={entry.address}
                className={`
                  flex items-center justify-between
                  bg-black/30 rounded-lg p-4
                  border transition-all duration-200
                  ${isCurrentPlayer 
                    ? 'border-green-400 bg-green-900/40 shadow-lg shadow-green-500/30 scale-[1.02]' 
                    : 'border-green-600/30 hover:border-green-500/50'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl w-8">
                    {getMedalEmoji(index)}
                  </span>
                  <div>
                    <div className={`font-bold metallic-text ${isCurrentPlayer ? 'text-green-300' : 'text-green-200'}`}>
                      {formatAddress(entry.address)}
                      {isCurrentPlayer && <span className="ml-2 text-xs">(You)</span>}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold metallic-text text-green-300">
                    {entry.wins}
                  </div>
                  <div className="text-xs text-green-400">wins</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
