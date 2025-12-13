import { createPublicClient, createWalletClient, http, parseUnits } from 'viem';
import { base } from 'viem/chains';

export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_MINISUDOKU_CONTRACT as `0x${string}`;
export const USDC_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' as `0x${string}`; // Base mainnet

export const CONTRACT_ABI = [
  {
    inputs: [{ name: 'wins', type: 'uint256' }],
    name: 'playGame',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'finalizeRound',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
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

export const USDC_ABI = [
  {
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export const publicClient = createPublicClient({
  chain: base,
  transport: http(),
});

export const ENTRY_FEE = parseUnits('0.30', 6); // USDC has 6 decimals

/**
 * x402 Payment Configuration for Farcaster Frames
 */
export const x402Config = {
  chainId: 'eip155:8453', // Base mainnet
  token: 'USDC',
  amount: '0.30',
  recipient: CONTRACT_ADDRESS,
};

/**
 * Approve USDC spending for the contract
 */
export async function approveUSDC(walletClient: any, amount: bigint) {
  const { request } = await publicClient.simulateContract({
    address: USDC_ADDRESS,
    abi: USDC_ABI,
    functionName: 'approve',
    args: [CONTRACT_ADDRESS, amount],
    account: walletClient.account,
  });

  return await walletClient.writeContract(request);
}

/**
 * Play game by calling the smart contract
 */
export async function playGame(walletClient: any, wins: number) {
  const { request } = await publicClient.simulateContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'playGame',
    args: [BigInt(wins)],
    account: walletClient.account,
  });

  return await walletClient.writeContract(request);
}

/**
 * Get current round information
 */
export async function getCurrentRound() {
  return await publicClient.readContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getCurrentRound',
  });
}

/**
 * Get leaderboard
 */
export async function getLeaderboard() {
  return await publicClient.readContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getLeaderboard',
  });
}

/**
 * Get player wins
 */
export async function getPlayerWins(playerAddress: `0x${string}`) {
  return await publicClient.readContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getPlayerWins',
    args: [playerAddress],
  });
}
