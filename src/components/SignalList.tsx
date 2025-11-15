'use client'

import { useEffect, useState } from 'react'

interface NFTDrop {
  id: string
  name: string
  collection: string
  time?: string
  floor_price?: string
  image_url?: string
  blockchain?: string
}

export function SignalList() {
  const [drops, setDrops] = useState<NFTDrop[]>([])
  const [loading, setLoading] = useState(true)

  async function fetchDrops() {
    try {
      setLoading(true)
      const res = await fetch('/api/drops')
      if (!res.ok) {
        throw new Error('Failed to fetch')
      }
      const data = await res.json()
      setDrops(data)
    } catch (err) {
      console.error('Error fetching drops:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDrops()
    // Poll every 30 seconds for near-real-time updates
    const id = setInterval(fetchDrops, 30_000)
    return () => clearInterval(id)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-brown-400"></div>
      </div>
    )
  }

  if (drops.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-choco-200">No NFT drops found yet.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="glass p-4 rounded-lg hover:bg-white/10 transition-all cursor-pointer border-l-4 border-choco-500"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">{drop.name}</h3>
              <p className="text-sm text-choco-200 mt-1">{drop.collection}</p>
              <div className="flex items-center gap-4 mt-3">
                <span className="text-xs bg-choco-500/30 text-choco-50 px-2 py-1 rounded">
                  {drop.blockchain ?? 'Ethereum'}
                </span>
                <span className="text-sm text-choco-200">{drop.time ?? ''}</span>
                <span className="text-sm font-semibold text-green-400">
                  Floor: {drop.floor_price ?? '—'}
                </span>
              </div>
            </div>
            <button className="px-4 py-2 bg-choco-600 hover:bg-choco-700 rounded-lg text-white text-sm font-semibold transition-colors">
              View
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
