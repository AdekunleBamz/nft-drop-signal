import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NFT Drop Signal',
  description: 'Get real-time signals for NFT drops on Farcaster',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        {children}
      </body>
    </html>
  )
}
