'use client';

import { useState, useEffect } from 'react';
import SudokuBoard from '@/components/SudokuBoard';
import PoolStats from '@/components/PoolStats';
import Leaderboard from '@/components/Leaderboard';
import { SudokuGrid } from '@/lib/sudoku';
import { PoolInfo, Difficulty } from '@/types/game';

export default function Home() {
  const [puzzle, setPuzzle] = useState<SudokuGrid | null>(null);
  const [sessionId, setSessionId] = useState<string>('');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [wins, setWins] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [poolInfo, setPoolInfo] = useState<PoolInfo | null>(null);
  const [leaderboard, setLeaderboard] = useState<{ address: string; wins: number }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [showPayment, setShowPayment] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  useEffect(() => {
    fetchPoolInfo();
    fetchLeaderboard();
    const interval = setInterval(() => {
      fetchPoolInfo();
      fetchLeaderboard();
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const fetchPoolInfo = async () => {
    try {
      const response = await fetch('/api/contract?action=round');
      if (response.ok) {
        const data = await response.json();
        setPoolInfo(data);
      }
    } catch (error) {
      console.error('Error fetching pool info:', error);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('/api/contract?action=leaderboard');
      if (response.ok) {
        const data = await response.json();
        setLeaderboard(data.leaderboard);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  const startNewGame = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/game', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'new',
          difficulty,
          playerAddress: walletAddress,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setPuzzle(data.puzzle);
        setSessionId(data.sessionId);
        setIsPlaying(true);
        setGameCompleted(false);
        setShowPayment(false);
      }
    } catch (error) {
      console.error('Error starting game:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGridChange = async (grid: SudokuGrid) => {
    if (!sessionId) return;

    try {
      await fetch('/api/game', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'save',
          sessionId,
          grid,
        }),
      });
    } catch (error) {
      console.error('Error saving grid:', error);
    }
  };

  const handleComplete = async () => {
    if (!sessionId || !puzzle) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/game', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'validate',
          sessionId,
          grid: puzzle,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.solved) {
          setWins(data.wins);
          setGameCompleted(true);
          // Here you would trigger the smart contract call
          // For now, we'll just show the completion message
        }
      }
    } catch (error) {
      console.error('Error validating puzzle:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayAndPlay = () => {
    setShowPayment(true);
    // This will be implemented with x402 payment flow
  };

  const connectWallet = async () => {
    // Placeholder for wallet connection
    // Will be implemented with actual wallet connector
    const mockAddress = '0x' + Math.random().toString(16).slice(2, 42);
    setWalletAddress(mockAddress);
  };

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 metallic-text">
            🎮 MiniSudoku
          </h1>
          <p className="text-green-300 text-lg md:text-xl">
            Play Sudoku • Win USDC • Compete for the Prize Pool
          </p>
        </div>

        {/* Wallet Connection */}
        {!walletAddress && (
          <div className="max-w-md mx-auto mb-8">
            <button
              onClick={connectWallet}
              className="w-full py-4 px-6 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 rounded-xl font-bold text-lg metallic-text border-2 border-green-400/50 shadow-lg hover:shadow-green-500/50 transition-all duration-200 hover:scale-105"
            >
              Connect Wallet
            </button>
          </div>
        )}

        {walletAddress && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Game Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Game Controls */}
              {!isPlaying && (
                <div className="bg-gradient-to-br from-green-900/60 to-green-800/60 rounded-2xl p-6 border-2 border-green-500/50 shadow-2xl backdrop-blur-sm">
                  <h2 className="text-2xl font-bold mb-4 metallic-text text-green-300">
                    Start New Game
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-green-300 mb-2 font-semibold">
                        Select Difficulty
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['easy', 'medium', 'hard'] as Difficulty[]).map(diff => (
                          <button
                            key={diff}
                            onClick={() => setDifficulty(diff)}
                            className={`
                              py-3 px-4 rounded-lg font-bold capitalize
                              border-2 transition-all duration-200
                              ${difficulty === diff
                                ? 'bg-green-600 border-green-400 text-white shadow-lg shadow-green-500/50'
                                : 'bg-green-900/40 border-green-600/30 text-green-300 hover:border-green-500/50'
                              }
                            `}
                          >
                            {diff}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handlePayAndPlay}
                      disabled={isLoading}
                      className="w-full py-4 px-6 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 disabled:from-gray-700 disabled:to-gray-800 rounded-xl font-bold text-lg metallic-text border-2 border-green-400/50 shadow-lg hover:shadow-green-500/50 transition-all duration-200 hover:scale-105 disabled:hover:scale-100 disabled:opacity-50"
                    >
                      {isLoading ? 'Loading...' : 'Pay $0.30 USDC & Play'}
                    </button>

                    <div className="bg-black/30 rounded-lg p-4 border border-green-600/30 text-sm text-green-300">
                      <div className="flex justify-between mb-1">
                        <span>Entry Fee:</span>
                        <span className="font-bold">$0.30 USDC</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span>To Prize Pool:</span>
                        <span className="font-bold text-green-400">$0.10</span>
                      </div>
                      <div className="flex justify-between">
                        <span>To Creator:</span>
                        <span className="font-bold">$0.20</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sudoku Board */}
              {isPlaying && puzzle && (
                <div>
                  {gameCompleted && (
                    <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-4 mb-4 border-2 border-green-400 shadow-lg text-center">
                      <p className="text-xl font-bold metallic-text">
                        🎉 Puzzle Solved! Total Wins: {wins}
                      </p>
                      <button
                        onClick={startNewGame}
                        className="mt-3 py-2 px-6 bg-white/20 hover:bg-white/30 rounded-lg font-bold transition-all"
                      >
                        Play Again ($0.30)
                      </button>
                    </div>
                  )}
                  
                  <SudokuBoard
                    puzzle={puzzle}
                    onGridChange={handleGridChange}
                    onComplete={handleComplete}
                    disabled={gameCompleted}
                  />

                  <div className="mt-4 text-center">
                    <button
                      onClick={() => setIsPlaying(false)}
                      className="py-2 px-6 bg-red-600/80 hover:bg-red-600 rounded-lg font-bold transition-all"
                    >
                      Exit Game
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Stats */}
            <div className="space-y-6">
              <PoolStats poolInfo={poolInfo} isLoading={false} />
              <Leaderboard 
                entries={leaderboard} 
                isLoading={false}
                currentPlayerAddress={walletAddress}
              />
            </div>
          </div>
        )}

        {/* Payment Modal Placeholder */}
        {showPayment && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-2xl p-8 max-w-md w-full border-2 border-green-500 shadow-2xl">
              <h3 className="text-2xl font-bold mb-4 metallic-text text-center">
                Payment via x402
              </h3>
              <p className="text-green-200 text-center mb-6">
                x402 payment integration will be implemented here
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowPayment(false);
                    startNewGame();
                  }}
                  className="flex-1 py-3 bg-green-600 hover:bg-green-500 rounded-lg font-bold transition-all"
                >
                  Simulate Payment
                </button>
                <button
                  onClick={() => setShowPayment(false)}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-500 rounded-lg font-bold transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
