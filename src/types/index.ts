// Types for NFT Drop data
export interface NFTDrop {
  id: string
  name: string
  collection: string
  floor_price: string
  blockchain: 'Ethereum' | 'Polygon' | 'Arbitrum' | 'Base' | 'Optimism'
  timestamp: string
  contract_address?: string
  image_url?: string
  metadata?: Record<string, unknown>
}

export interface FarcasterUser {
  fid: number
  username: string
  display_name: string
  pfp_url?: string
  follower_count: number
  following_count: number
}

export interface Signal {
  id: string
  user: FarcasterUser
  drop: NFTDrop
  sentiment: 'bullish' | 'neutral' | 'bearish'
  timestamp: string
  engagement: {
    likes: number
    recasts: number
    replies: number
  }
}
