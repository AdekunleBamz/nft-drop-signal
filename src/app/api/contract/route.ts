import { NextRequest, NextResponse } from 'next/server';
import { createPublicClient, http, formatUnits } from 'viem';
import { base } from 'viem/chains';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_MINISUDOKU_CONTRACT as `0x${string}`;

const CONTRACT_ABI = [
  {
    inputs: [],
    name: 'getCurrentRound',
    outputs: [
      { name: 'roundId', type: 'uint256' },
      { name: 'startTime', type: 'uint256' },
      { name: 'endTime', type: 'uint256' },
      { name: 'poolBalance', type: 'uint256' },
      { name: 'currentLeader', type: 'address' },
      { name: 'highestWins', type: 'uint256' },
      { name: 'timeRemaining', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getLeaderboard',
    outputs: [
      { name: 'players', type: 'address[]' },
      { name: 'wins', type: 'uint256[]' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'player', type: 'address' }],
    name: 'getPlayerWins',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

const publicClient = createPublicClient({
  chain: base,
  transport: http(),
});

export async function GET(request: NextRequest) {
  try {
    const action = request.nextUrl.searchParams.get('action');

    if (!CONTRACT_ADDRESS) {
      return NextResponse.json({ error: 'Contract not deployed' }, { status: 500 });
    }

    switch (action) {
      case 'round': {
        const result = await publicClient.readContract({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: 'getCurrentRound',
        });

        const [roundId, startTime, endTime, poolBalance, currentLeader, highestWins, timeRemaining] = result;

        return NextResponse.json({
          roundId: Number(roundId),
          startTime: Number(startTime),
          endTime: Number(endTime),
          poolBalance: formatUnits(poolBalance, 6), // USDC has 6 decimals
          currentLeader,
          highestWins: Number(highestWins),
          timeRemaining: Number(timeRemaining),
        });
      }

      case 'leaderboard': {
        const result = await publicClient.readContract({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: 'getLeaderboard',
        });

        const [players, wins] = result;

        const leaderboard = players.map((player, index) => ({
          address: player,
          wins: Number(wins[index]),
        })).sort((a, b) => b.wins - a.wins);

        return NextResponse.json({ leaderboard });
      }

      case 'player': {
        const playerAddress = request.nextUrl.searchParams.get('address');
        
        if (!playerAddress) {
          return NextResponse.json({ error: 'Missing player address' }, { status: 400 });
        }

        const wins = await publicClient.readContract({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: 'getPlayerWins',
          args: [playerAddress as `0x${string}`],
        });

        return NextResponse.json({ wins: Number(wins) });
      }

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Contract API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
