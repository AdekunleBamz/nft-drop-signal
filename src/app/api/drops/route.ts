// API Routes for NFT Drops

import { NextResponse } from 'next/server'

// Mock data - used as fallback
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

const NANSEN_API_BASE = process.env.NANSEN_API_BASE || 'https://api.nansen.ai'
const NANSEN_API_KEY = process.env.NANSEN_API_KEY || process.env.NEXT_PUBLIC_NANSEN_API_KEY || '[REDACTED_NANSEN_API_KEY]'

export async function GET() {
  try {
    // Attempt to fetch latest drops from Nansen (server-side)
    // The exact Nansen endpoint may vary; this attempt uses a common pattern and falls back to mock data.
    const url = `${NANSEN_API_BASE}/v1/nft/drops?limit=20`
    const resp = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': NANSEN_API_KEY,
      },
      // no-store ensures we always try to get fresh data
      cache: 'no-store',
    })

    if (resp.ok) {
      const data = await resp.json()

      // Try to normalize Nansen response to our frontend shape.
      // If `data.drops` exists use it, otherwise try to map the root response.
      const raw = data?.drops ?? data ?? []
      const drops = Array.isArray(raw)
        ? raw.map((d: any, i: number) => {
            // Normalize several possible fields Nansen or other providers may return
            const image = d.image_url ?? d.image ?? d.logo ?? d.thumbnail ?? d.collectionImage ?? '/placeholder.png'
            const external = d.collection_url ?? d.opensea_url ?? d.external_url ?? d.url ?? d.detail_url ?? null
            const contract = d.contract_address ?? d.contract ?? d.address ?? null

            return {
              id: d.id ?? d.collectionId ?? contract ?? String(i),
              name: d.name ?? d.collectionName ?? d.collection ?? 'Unknown',
              collection: d.collection ?? d.collectionName ?? d.name ?? 'Unknown',
              floor_price: d.floor_price ?? d.floor ?? d.floorPrice ?? 'N/A',
              image_url: image,
              collection_url: external,
              contract_address: contract,
              blockchain: d.blockchain ?? d.chain ?? 'Ethereum',
              time: d.timestamp ?? d.time ?? new Date().toISOString(),
            }
          })
        : []

      if (drops.length > 0) return NextResponse.json(drops)
    }
  } catch (err) {
    // swallow and return mock data below
    // console.error('Nansen fetch error:', err)
  }

  // Fallback to mock drops
  return NextResponse.json(mockDrops)
}
