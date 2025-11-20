import { SudokuGrid } from '../lib/sudoku';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface GameSession {
  id: string;
  puzzle: SudokuGrid;
  solution: number[][];
  currentGrid: SudokuGrid;
  difficulty: Difficulty;
  startTime: number;
  endTime?: number;
  wins: number;
  isCompleted: boolean;
  playerAddress?: string;
}

export interface LeaderboardEntry {
  address: string;
  wins: number;
  rank: number;
}

export interface PoolInfo {
  roundId: number;
  poolBalance: string;
  currentLeader: string;
  highestWins: number;
  timeRemaining: number;
  endTime: number;
}

export interface ContractInfo {
  address: string;
  abi: any[];
}

export interface GameStats {
  totalGamesPlayed: number;
  totalWins: number;
  currentStreak: number;
  bestTime?: number;
}
