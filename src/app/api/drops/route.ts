// API Routes for NFT Drops

import { NextResponse } from 'next/server'

// Mock data - replace with real database
const mockDrops = [
  {
    id: '1',
    name: 'Pudgy Penguins',
    collection: 'Pudgy Penguins Official',
    floor_price: '2.5 ETH',
    blockchain: 'Ethereum',
    timestamp: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Cool Cats',
    collection: 'Cool Cats Official',
    floor_price: '1.8 ETH',
    blockchain: 'Ethereum',
    timestamp: new Date().toISOString(),
  },
]

export async function GET() {
  try {
    // Return mock drops
    return NextResponse.json(mockDrops)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
