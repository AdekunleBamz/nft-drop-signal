'use client'

import { useEffect, useState } from 'react'

interface NFTDrop {
  id: string
  name: string
  collection: string
  time: string
  floor_price: string
  image_url: string
  blockchain: string
}

export function SignalList() {
  const [drops, setDrops] = useState<NFTDrop[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching NFT drops data
    const mockDrops: NFTDrop[] = [
      {
        id: '1',
        name: 'Pudgy Penguins',
        collection: 'Pudgy Penguins Official',
        time: '2 hours ago',
        floor_price: '2.5 ETH',
        image_url: '/placeholder.png',
        blockchain: 'Ethereum',
      },
      {
        id: '2',
        name: 'Cool Cats',
        collection: 'Cool Cats Official',
        time: '4 hours ago',
        floor_price: '1.8 ETH',
        image_url: '/placeholder.png',
        blockchain: 'Ethereum',
      },
      {
        id: '3',
        name: 'Arbitrum Odyssey',
        collection: 'Arbitrum NFT',
        time: '6 hours ago',
        floor_price: '0.5 ARB',
        image_url: '/placeholder.png',
        blockchain: 'Arbitrum',
      },
    ]
    
    setDrops(mockDrops)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-purple-500"></div>
      </div>
    )
  }

  if (drops.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No NFT drops found yet.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="glass p-4 rounded-lg hover:bg-white/20 transition-all cursor-pointer border-l-4 border-purple-500"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">{drop.name}</h3>
              <p className="text-sm text-gray-400 mt-1">{drop.collection}</p>
              <div className="flex items-center gap-4 mt-3">
                <span className="text-xs bg-purple-500/30 text-purple-200 px-2 py-1 rounded">
                  {drop.blockchain}
                </span>
                <span className="text-sm text-gray-300">{drop.time}</span>
                <span className="text-sm font-semibold text-green-400">
                  Floor: {drop.floor_price}
                </span>
              </div>
            </div>
            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-sm font-semibold transition-colors">
              View
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
