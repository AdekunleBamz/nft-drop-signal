import type { Metadata } from 'next'
import './styles.css'

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
      <body className="bg-gradient-to-br from-choco-900 via-choco-700 to-choco-800 text-white">
        {children}
      </body>
    </html>
  )
}
