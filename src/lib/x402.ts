/**
 * x402 Payment Integration for Farcaster Frames
 * 
 * x402 is Farcaster's native payment protocol for frames
 * It enables seamless USDC payments on Base chain within frames
 */

export interface X402PaymentRequest {
  chainId: string; // e.g., "eip155:8453" for Base
  method: string; // "eth_sendTransaction"
  params: {
    abi: any[];
    to: string;
    value: string;
    data?: string;
  };
  attribution?: boolean;
}

export interface X402PaymentResponse {
  transactionHash: string;
  status: 'pending' | 'success' | 'failed';
}

/**
 * Create an x402 payment request for USDC approval
 */
export function createApprovalRequest(
  spender: string,
  amount: string
): X402PaymentRequest {
  const USDC_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'; // Base mainnet

  return {
    chainId: 'eip155:8453',
    method: 'eth_sendTransaction',
    params: {
      abi: [
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
      ],
      to: USDC_ADDRESS,
      value: '0',
    },
    attribution: false,
  };
}

/**
 * Create an x402 payment request for playing the game
 */
export function createPlayGameRequest(
  contractAddress: string,
  wins: number
): X402PaymentRequest {
  return {
    chainId: 'eip155:8453',
    method: 'eth_sendTransaction',
    params: {
      abi: [
        {
          inputs: [{ name: 'wins', type: 'uint256' }],
          name: 'playGame',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
      to: contractAddress,
      value: '0',
    },
    attribution: false,
  };
}

/**
 * Process x402 payment in a Farcaster frame
 * This is called from the frame transaction endpoint
 */
export async function processX402Payment(
  frameMessage: any
): Promise<X402PaymentRequest> {
  // Verify the frame message (in production, verify signature)
  const { untrustedData } = frameMessage;
  const address = untrustedData?.address;

  if (!address) {
    throw new Error('No address provided');
  }

  const contractAddress = process.env.NEXT_PUBLIC_MINISUDOKU_CONTRACT!;
  
  // First, create approval request
  // Note: In x402, we can chain transactions or handle them separately
  // For simplicity, we'll return the approval request first
  return createApprovalRequest(contractAddress, '300000'); // 0.30 USDC (6 decimals)
}

/**
 * Verify x402 payment completion
 */
export async function verifyPayment(
  transactionHash: string,
  expectedAmount: string
): Promise<boolean> {
  // In production, verify the transaction on-chain
  // Check that it matches the expected parameters
  // This is a placeholder
  return true;
}

/**
 * x402 Payment Flow for MiniSudoku:
 * 
 * 1. User clicks "Pay & Play" button in frame
 * 2. Frame returns x402 transaction request (USDC approval)
 * 3. User approves in Farcaster wallet
 * 4. Frame returns second x402 request (playGame call)
 * 5. User confirms game transaction
 * 6. Game starts, wins are tracked on-chain
 * 
 * This enables seamless USDC payments within the Farcaster experience
 */
