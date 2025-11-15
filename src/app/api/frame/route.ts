// Farcaster Frame Handler

import { NextRequest, NextResponse } from 'next/server'

// GET returns Frame metadata required by Farcaster when registering a Frame.
export async function GET() {
  try {
    const siteUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_BASE_URL || 'https://nft-drop-signal.vercel.app'

    const frame = {
      name: 'NFT Drop Signal',
      short_description: 'Real-time NFT drop signals',
      description:
        'NFT Drop Signal aggregates and surfaces new NFT drops in near real-time, with collection links and floor price context.',
      url: siteUrl,
      icons: [
        `${siteUrl}/favicon.ico`,
        `${siteUrl}/logo192.png`
      ],
      // recommended contact / author metadata
      author: {
        name: 'NFT Drop Signal',
        url: siteUrl
      }
    }

    return NextResponse.json(frame)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to return frame metadata' }, { status: 500 })
  }
}

// POST handles Frame interactions from Farcaster (keep existing basic handler)
export async function POST(request: NextRequest) {
  try {
    // Parse the frame message from request (not implemented: depends on Frame usage)
    await request.json()

    // For now, acknowledge receipt
    return NextResponse.json({ success: true, message: 'Frame interaction processed' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process frame' }, { status: 400 })
  }
}
