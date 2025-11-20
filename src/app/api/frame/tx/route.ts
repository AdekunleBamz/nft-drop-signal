import { NextRequest, NextResponse } from 'next/server';

const USDC_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'; // Base mainnet USDC

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { untrustedData } = body;
    const address = untrustedData?.address;

    if (!address) {
      return NextResponse.json({ error: 'No address provided' }, { status: 400 });
    }

    // Return transaction data for x402 payment
    // This follows the Farcaster frame transaction specification
    return NextResponse.json({
      chainId: 'eip155:8453', // Base mainnet
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
        data: '', // Will be encoded by the client
        value: '0',
      },
      attribution: false,
    });
  } catch (error) {
    console.error('Transaction frame error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
