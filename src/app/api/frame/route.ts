// Farcaster Frame Handler for MiniSudoku

import { NextRequest, NextResponse } from 'next/server'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://your-app.vercel.app');

// GET returns Frame metadata required by Farcaster when registering a Frame.
export async function GET() {
  try {
    const frame = {
      name: 'MiniSudoku',
      short_description: 'Play Sudoku, Win USDC',
      description:
        'Competitive Sudoku game on Base chain. Pay $0.30 USDC to play, compete for the 24-hour prize pool. Powered by x402 Farcaster payments.',
      url: APP_URL,
      icons: [
        `${APP_URL}/logo.png`,
        `${APP_URL}/logo.svg`,
        `${APP_URL}/favicon.ico`,
        `${APP_URL}/logo192.png`
      ],
      author: {
        name: 'MiniSudoku',
        url: APP_URL
      },
      frame: {
        version: 'next',
        imageUrl: `${APP_URL}/api/og`,
        button: {
          title: 'Play MiniSudoku',
          action: {
            type: 'launch_frame',
            name: 'MiniSudoku',
            url: `${APP_URL}/api/frame`,
            splashImageUrl: `${APP_URL}/api/og`,
            splashBackgroundColor: '#022c22'
          }
        }
      }
    }

    return NextResponse.json(frame)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to return frame metadata' }, { status: 500 })
  }
}

// POST handles Frame interactions from Farcaster
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { untrustedData } = body
    const buttonIndex = untrustedData?.buttonIndex

    // Base frame image
    const imageUrl = `${APP_URL}/api/og`

    if (!buttonIndex || buttonIndex === 1) {
      // Initial frame - Show game info
      return NextResponse.json({
        type: 'frame',
        version: 'next',
        image: {
          url: imageUrl,
          aspectRatio: '1:1',
        },
        buttons: [
          {
            label: 'Play Game ($0.30)',
            action: 'post',
            target: `${APP_URL}/api/frame/play`,
          },
          {
            label: 'View Pool',
            action: 'post',
          },
          {
            label: 'Leaderboard',
            action: 'post',
          },
          {
            label: 'Open App',
            action: 'link',
            target: APP_URL,
          },
        ],
        postUrl: `${APP_URL}/api/frame`,
      })
    }

    if (buttonIndex === 2) {
      // Show pool information
      const poolResponse = await fetch(`${APP_URL}/api/contract?action=round`)
      const poolData = await poolResponse.json()

      return NextResponse.json({
        type: 'frame',
        version: 'next',
        image: {
          url: `${APP_URL}/api/og/pool?balance=${poolData.poolBalance}&leader=${poolData.currentLeader}`,
          aspectRatio: '1:1',
        },
        buttons: [
          {
            label: 'Back',
            action: 'post',
          },
          {
            label: 'Play Now',
            action: 'post',
            target: `${APP_URL}/api/frame/play`,
          },
        ],
        postUrl: `${APP_URL}/api/frame`,
      })
    }

    if (buttonIndex === 3) {
      // Show leaderboard
      return NextResponse.json({
        type: 'frame',
        version: 'next',
        image: {
          url: `${APP_URL}/api/og/leaderboard`,
          aspectRatio: '1:1',
        },
        buttons: [
          {
            label: 'Back',
            action: 'post',
          },
          {
            label: 'Play Now',
            action: 'post',
            target: `${APP_URL}/api/frame/play`,
          },
        ],
        postUrl: `${APP_URL}/api/frame`,
      })
    }

    return NextResponse.json({ success: true, message: 'Frame interaction processed' })
  } catch (error) {
    console.error('Frame API error:', error)
    return NextResponse.json({ error: 'Failed to process frame' }, { status: 400 })
  }
}
