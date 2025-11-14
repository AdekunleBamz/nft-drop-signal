// Example component showing how to create a shareable signal
'use client'

import { useState } from 'react'

interface ShareSignalProps {
  dropName: string
  floorPrice: string
  sentiment: 'bullish' | 'neutral' | 'bearish'
}

export function ShareSignal({ dropName, floorPrice, sentiment }: ShareSignalProps) {
  const [shared, setShared] = useState(false)

  const handleShare = async () => {
    try {
      const text = `🎯 NFT Drop Signal: ${dropName}\n💰 Floor: ${floorPrice}\n📊 Sentiment: ${sentiment}\n\nCheck the latest signals on NFT Drop Signal! 🚀`
      
      if (navigator.share) {
        await navigator.share({
          title: 'NFT Drop Signal',
          text: text,
        })
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(text)
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      }
    } catch (error) {
      console.error('Share error:', error)
    }
  }

  return (
    <button
      onClick={handleShare}
      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-colors"
    >
      {shared ? '✓ Copied!' : '📤 Share Signal'}
    </button>
  )
}
