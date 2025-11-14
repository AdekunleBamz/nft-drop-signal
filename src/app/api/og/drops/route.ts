// Example Farcaster Frame for NFT Drops
// This demonstrates how to structure a frame that displays NFT drop signals

import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const baseUrl = new URL(request.url).origin
  
  // Frame metadata for Farcaster
  const frameMetadata = {
    'fc:frame': 'vNext',
    'fc:frame:image': `${baseUrl}/api/og/drops`,
    'fc:frame:post_url': `${baseUrl}/api/frame/interact`,
    'fc:frame:button:1': 'View Drops',
    'fc:frame:button:1:action': 'post',
    'fc:frame:button:2': 'Share',
    'fc:frame:button:2:action': 'post',
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>NFT Drop Signal</title>
      <meta property="og:title" content="NFT Drop Signal" />
      <meta property="og:description" content="Real-time NFT drop notifications on Farcaster" />
      <meta property="og:image" content="${baseUrl}/api/og/drops" />
      ${Object.entries(frameMetadata)
        .map(([key, value]) => `<meta property="${key}" content="${value}" />`)
        .join('\n')}
    </head>
    <body>
      <h1>NFT Drop Signal</h1>
      <p>Real-time NFT drop signals and notifications</p>
    </body>
    </html>
  `

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  })
}
