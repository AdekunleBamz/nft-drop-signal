"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { connectInjectedWallet } from '../lib/web3'

export function Header() {
  const [showMenu, setShowMenu] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [address, setAddress] = useState<string | null>(null)

  const openMenu = () => setShowMenu(true)
  const closeMenu = () => setShowMenu(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('connectedAddress')
      if (saved) setAddress(saved)
    } catch (e) {
      // ignore
    }
  }, [])

  const handleConnectInjected = async (type: 'metamask' | 'rabby') => {
    try {
      setConnecting(true)
      const addr = await connectInjectedWallet(type)
      setAddress(addr)
      try { localStorage.setItem('connectedAddress', addr ?? '') } catch (e) {}
      setShowMenu(false)
    } catch (err: any) {
      alert(err?.message || 'Failed to connect')
    } finally {
      setConnecting(false)
    }
  }

  const handleWalletConnect = async () => {
    try {
      setConnecting(true)
      // call helper in web3.ts which dynamically imports and initializes the provider
      const { connectWalletConnect } = await import('../lib/web3')
      const addr = await connectWalletConnect()
      setAddress(addr ?? null)
      try { localStorage.setItem('connectedAddress', addr ?? '') } catch (e) {}
      setShowMenu(false)
    } catch (err: any) {
      console.error(err)
      alert(
        'WalletConnect failed. Ensure @walletconnect/ethereum-provider is installed and NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is set if required.'
      )
    } finally {
      setConnecting(false)
    }
  }

  return (
    <header className="bg-black/40 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="NFT Drop Signal logo"
              className="w-10 h-10 rounded-md object-cover"
              onError={(e) => {
                const t = e.currentTarget as HTMLImageElement
                if (t.src.endsWith('/logo.png')) t.src = '/logo.svg'
              }}
            />
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

          <div>
            {address ? (
              <button onClick={openMenu} className="px-4 py-2 bg-green-600 rounded-lg text-white font-semibold">
                {address.slice(0, 6)}...{address.slice(-4)}
              </button>
            ) : (
              <button onClick={openMenu} className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg text-white font-semibold transition-all glow-effect">
                {connecting ? 'Connecting...' : 'Connect Wallet'}
              </button>
            )}
          </div>
        </div>
      </div>

      {showMenu && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Connect Wallet</h3>
              <div className="flex flex-col gap-3">
              {address && (
                <div className="mb-2">
                  <div className="text-sm text-gray-600 mb-2">Connected: {address.slice(0,6)}...{address.slice(-4)}</div>
                  <button
                    onClick={async () => {
                      const mod = await import('../lib/web3')
                      mod.disconnectWallet()
                      setAddress(null)
                      setShowMenu(false)
                    }}
                    className="w-full text-left px-4 py-2 bg-red-100 rounded text-red-700"
                  >
                    Disconnect
                  </button>
                </div>
              )}
              <button onClick={() => handleConnectInjected('metamask')} className="w-full text-left px-4 py-3 border rounded hover:bg-gray-50">
                MetaMask
              </button>

              <button onClick={() => handleConnectInjected('rabby')} className="w-full text-left px-4 py-3 border rounded hover:bg-gray-50">
                Rabby Wallet
              </button>

              <button onClick={handleWalletConnect} className="w-full text-left px-4 py-3 border rounded hover:bg-gray-50">
                WalletConnect (QR)
              </button>

              <button onClick={closeMenu} className="mt-4 w-full px-4 py-2 bg-gray-200 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
