'use client'

import Link from 'next/link'

export function Header() {
  return (
    <header className="bg-black/40 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📡</span>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              NFT Drop Signal
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#" className="text-gray-300 hover:text-white transition-colors">
              Drops
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white transition-colors">
              Signals
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white transition-colors">
              Trending
            </Link>
          </nav>

          <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg text-white font-semibold transition-all glow-effect">
            Connect Wallet
          </button>
        </div>
      </div>
    </header>
  )
}
