"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface NFTDrop {
  id: string
  name: string
  collection: string
  time?: string
  floor_price?: string
  image_url?: string
  collection_url?: string
  contract_address?: string
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
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="flex-shrink-0">
                <Image
                  src={drop.image_url ?? '/placeholder.png'}
                  alt={drop.collection ?? drop.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-md object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">{drop.name}</h3>
                <p className="text-sm text-choco-200 mt-1">
                  {drop.collection}{' '}
                  {drop.collection_url ? (
                    <a
                      href={drop.collection_url}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-2 text-sm underline text-choco-100"
                    >
                      View collection
                    </a>
                  ) : null}
                </p>
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
            </div>
            <div className="flex items-center gap-3">
              {drop.contract_address ? (
                <a
                  href={`https://etherscan.io/address/${drop.contract_address}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 bg-choco-600 hover:bg-choco-700 rounded-lg text-white text-sm font-semibold transition-colors"
                >
                  Contract
                </a>
              ) : null}
              {drop.collection_url ? (
                <a
                  href={drop.collection_url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-choco-600 hover:bg-choco-700 rounded-lg text-white text-sm font-semibold transition-colors"
                >
                  Open
                </a>
              ) : (
                <button className="px-4 py-2 bg-choco-600 hover:bg-choco-700 rounded-lg text-white text-sm font-semibold transition-colors">
                  View
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
