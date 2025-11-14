import { Card } from '@/components/Card'
import { SignalList } from '@/components/SignalList'
import { Header } from '@/components/Header'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            NFT Drop Signal
          </h1>
          <p className="text-xl text-gray-300">
            Real-time NFT drop notifications and signals on Farcaster
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card 
            title="Total Signals"
            value="0"
            icon="📊"
            gradient="from-blue-500 to-cyan-500"
          />
          <Card 
            title="Active Drops"
            value="0"
            icon="🎯"
            gradient="from-purple-500 to-pink-500"
          />
          <Card 
            title="Your Followers"
            value="0"
            icon="👥"
            gradient="from-orange-500 to-red-500"
          />
        </div>

        <div className="glass p-8 rounded-xl glow-effect">
          <h2 className="text-2xl font-bold mb-6">Live NFT Drops</h2>
          <SignalList />
        </div>
      </div>
    </main>
  )
}
