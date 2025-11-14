# NFT Drop Signal - Farcaster miniApp

A modern, real-time NFT drop signal application built as a Farcaster miniApp using Next.js, TypeScript, and Web3 technologies.

## 🎯 Overview

NFT Drop Signal provides Farcaster users with:
- Real-time notifications of new NFT collection launches
- Floor price tracking across multiple blockchains
- Sentiment analysis and engagement metrics
- Shareable signals within the Farcaster ecosystem
- Multi-chain support (Ethereum, Polygon, Arbitrum, Base, Optimism)

## ✨ Features

### Core Features
- **Live Drop Detection** - Automatically detect and display new NFT drops
- **Floor Price Tracking** - Real-time floor price updates for collections
- **Multi-Chain Support** - Support for major EVM-compatible blockchains
- **Engagement Metrics** - Track likes, recasts, and replies on signals
- **User Sentiment** - Bullish, neutral, or bearish sentiment classification

### Farcaster Integration
- **Frame Support** - Display as interactive Farcaster frames
- **Social Sharing** - One-click sharing to your Farcaster network
- **User Profiles** - Display user information and follow stats
- **Cast Reactions** - Track engagement on shared signals

### Web3 Features
- **Wallet Connection** - Support for MetaMask and other EVM wallets
- **Contract Verification** - Verify contract addresses on-chain
- **Price Feeds** - Real-time price data from multiple sources

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|-----------|---------|---------|
| Next.js | React framework | 15.x |
| TypeScript | Type safety | 5.3+ |
| Tailwind CSS | Styling | 3.3+ |
| ethers.js | Web3 interaction | 6.8+ |
| React | UI library | 18.2+ |

## 📁 Project Structure

```
nft-drop-signal/
├── src/
│   ├── app/                          # Next.js app router
│   │   ├── api/
│   │   │   ├── drops/route.ts        # NFT drops endpoint
│   │   │   ├── frame/route.ts        # Frame interaction handler
│   │   │   └── og/drops/route.ts     # Open Graph metadata
│   │   ├── layout.tsx                # Root layout wrapper
│   │   ├── page.tsx                  # Home page
│   │   └── globals.css               # Global styles
│   ├── components/                   # React components
│   │   ├── Card.tsx                  # Statistics card
│   │   ├── Header.tsx                # Navigation header
│   │   ├── ShareSignal.tsx           # Signal sharing
│   │   └── SignalList.tsx            # Drops list display
│   ├── lib/                          # Utilities
│   │   ├── farcaster.ts              # Farcaster helpers
│   │   └── web3.ts                   # Web3 utilities
│   ├── services/                     # API services
│   │   └── nftDropService.ts         # Data fetching
│   └── types/                        # TypeScript definitions
│       └── index.ts                  # Shared types
├── public/                           # Static assets
├── .env.example                      # Environment template
├── .eslintrc.json                    # ESLint config
├── .gitignore                        # Git ignore rules
├── .prettierrc.js                    # Code formatting
├── next.config.js                    # Next.js config
├── tailwind.config.ts                # Tailwind config
├── tsconfig.json                     # TypeScript config
├── package.json                      # Dependencies
├── README.md                         # Project README
├── GETTING_STARTED.md                # Setup guide
└── .github/
    └── DEVELOPMENT.md                # Development guide

```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation

1. **Clone and Install**
```bash
cd nft-drop-signal
npm install
```

2. **Environment Setup**
```bash
cp .env.example .env.local
```

3. **Run Development Server**
```bash
npm run dev
```

4. **Open in Browser**
```
http://localhost:3000
```

## 📖 Usage Examples

### Display Drop List
```tsx
import { SignalList } from '@/components/SignalList'

export default function Page() {
  return <SignalList />
}
```

### Fetch Drops Data
```typescript
import { nftDropService } from '@/services/nftDropService'

const drops = await nftDropService.getDrops()
```

### Connect Web3
```typescript
import { getEthersProvider } from '@/lib/web3'

const provider = await getEthersProvider()
const balance = await provider.getBalance(address)
```

## 🔌 API Reference

### GET /api/drops
Returns list of NFT drops

**Response:**
```json
[
  {
    "id": "1",
    "name": "Pudgy Penguins",
    "collection": "Pudgy Penguins Official",
    "floor_price": "2.5 ETH",
    "blockchain": "Ethereum",
    "timestamp": "2025-11-14T12:00:00Z"
  }
]
```

### POST /api/frame
Process Farcaster frame interactions

**Payload:**
```json
{
  "untrustedData": {
    "fid": 1234,
    "url": "https://example.com/frame",
    "messageHash": "0x...",
    "timestamp": 1234567890,
    "network": 1,
    "buttonIndex": 1,
    "castId": {
      "fid": 5678,
      "hash": "0x..."
    }
  },
  "trustedData": {
    "messageBytes": "0x..."
  }
}
```

### GET /api/og/drops
Returns Open Graph metadata for frame preview

## 🎨 Customization

### Update Colors
Edit `tailwind.config.ts`:
```typescript
theme: {
  extend: {
    colors: {
      primary: '#YOUR_COLOR',
      secondary: '#YOUR_COLOR',
    },
  },
}
```

### Add Components
Create new component in `src/components/`:
```tsx
'use client'

export function MyComponent() {
  return <div>Content</div>
}
```

### Extend Types
Update `src/types/index.ts`:
```typescript
export interface MyType {
  property: string
}
```

## 🔐 Security Considerations

- Validate all Farcaster frame messages
- Sanitize user input before display
- Use environment variables for API keys
- Verify contract addresses before interaction
- Rate limit API calls

## 📱 Farcaster Frame Setup

### Create a Frame

1. **Host the app** on Vercel or similar
2. **Get frame URL** (typically `https://your-domain.com/api/og/drops`)
3. **Share in a cast** with frame metadata:

```
Check out NFT Drop Signal! 📡🎯
[Frame: https://your-domain.com/api/og/drops]
```

### Frame Interactions
Users can:
- View drop details
- Share signals to their network
- Track sentiment
- Get notifications

## 🔄 Data Sources to Integrate

### NFT Drop Detection
- **NFTScan API** - Real-time NFT transfer data
- **OpenSea API** - Collection launches and floor prices
- **Alchemy API** - NFT creation and transfer events

### Price Data
- **Reservoir Protocol** - Floor price feeds
- **The Graph** - Subgraph data for blockchain queries
- **Uniswap V3** - Token price data

### Farcaster Data
- **Farcaster Hub** - Direct hub API
- **Neynar API** - Farcaster data abstraction
- **Pinata** - IPFS content hosting

## 🚢 Deployment

### Deploy to Vercel

1. **Push to GitHub**
```bash
git push origin main
```

2. **Import on Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import repository
   - Click "Deploy"

3. **Configure Environment**
   - Add environment variables in Vercel dashboard
   - Redeploy after updates

### Production Build
```bash
npm run build
npm start
```

## 📊 Performance Optimization

- Image optimization with Next.js Image component
- Code splitting for route-based chunks
- CSS minification via Tailwind
- API response caching strategies
- Client-side data caching

## 🧪 Testing

### Run Linting
```bash
npm run lint
```

### Build Verification
```bash
npm run build
```

## 📝 Code Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Standard Next.js config
- **Prettier**: Configured for formatting
- **Comments**: JSDoc for public APIs

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

## 📚 Documentation

- [GETTING_STARTED.md](./GETTING_STARTED.md) - Setup guide
- [.github/DEVELOPMENT.md](./.github/DEVELOPMENT.md) - Development guide
- [README.md](./README.md) - Project overview

## 🔗 Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Farcaster Documentation](https://docs.farcaster.xyz)
- [ethers.js Documentation](https://docs.ethers.org)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### APIs & Services
- [OpenSea API](https://docs.opensea.io)
- [NFTScan API](https://nftscan.com/docs)
- [Neynar API](https://docs.neynar.com)
- [Reservoir API](https://docs.reservoir.tools)

### Tools & Platforms
- [Vercel](https://vercel.com) - Deployment
- [GitHub](https://github.com) - Version control
- [The Graph](https://thegraph.com) - Blockchain indexing

## 📄 License

MIT License - See LICENSE file for details

## 🙋 Support

For issues, questions, or suggestions:
1. Check existing documentation
2. Create a GitHub issue
3. Join Farcaster community for support

## 🎉 Acknowledgments

Built with:
- Next.js framework
- Farcaster ecosystem
- Ethereum community
- Open source contributors

---

**Made with ❤️ for the Farcaster community**
