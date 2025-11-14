// Farcaster integration utilities
export const farcasterConfig = {
  HUB_URL: process.env.NEXT_PUBLIC_FARCASTER_HUB_URL || 'https://hub.farcaster.cast',
}

export function getFarcasterUserUrl(username: string): string {
  return `https://warpcast.com/${username}`
}

export function getFarcasterCastUrl(hash: string): string {
  return `https://warpcast.com/?castHash=${hash}`
}
