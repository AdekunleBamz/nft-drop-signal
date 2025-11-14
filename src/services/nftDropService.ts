// NFT Drop Signal API Service
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

export interface NFTDrop {
  id: string
  name: string
  collection: string
  floor_price: string
  blockchain: string
  timestamp: string
}

export const nftDropService = {
  async getDrops(): Promise<NFTDrop[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/drops`)
      if (!response.ok) throw new Error('Failed to fetch drops')
      return await response.json()
    } catch (error) {
      console.error('Error fetching drops:', error)
      return []
    }
  },

  async getDropById(id: string): Promise<NFTDrop | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/drops/${id}`)
      if (!response.ok) throw new Error('Drop not found')
      return await response.json()
    } catch (error) {
      console.error('Error fetching drop:', error)
      return null
    }
  },

  async trackDrop(dropId: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/drops/${dropId}/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      return response.ok
    } catch (error) {
      console.error('Error tracking drop:', error)
      return false
    }
  },
}
