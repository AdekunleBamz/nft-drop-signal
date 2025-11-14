# NFT Drop Signal miniApp - Project Setup Guide

## Overview
This is a Farcaster miniApp for real-time NFT drop signals and notifications. The project is built with Next.js, TypeScript, and Tailwind CSS.

## Project Status
✅ Project scaffolded successfully
✅ Dependencies installed
✅ Next.js App Router configured
✅ Tailwind CSS ready
✅ Basic components created

## Key Features Implemented
- Dashboard with live NFT drops
- Farcaster integration foundation
- Web3 utilities for blockchain interaction
- API routes for drops and frames
- Responsive UI with gradient theming

## Running the Project

### Development Mode
```bash
npm run dev
```
Open http://localhost:3000 in your browser

### Build for Production
```bash
npm run build
npm start
```

## Project Structure
```
nft-drop-signal/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── drops/route.ts       # NFT drops API
│   │   │   └── frame/route.ts       # Farcaster frame handler
│   │   ├── layout.tsx               # Root layout
│   │   ├── page.tsx                 # Home page
│   │   └── globals.css              # Global styles
│   ├── components/
│   │   ├── Card.tsx                 # Stat card component
│   │   ├── Header.tsx               # Header component
│   │   └── SignalList.tsx           # NFT drops list
│   ├── lib/
│   │   ├── farcaster.ts             # Farcaster utilities
│   │   └── web3.ts                  # Web3 utilities
│   ├── services/
│   │   └── nftDropService.ts        # API service layer
│   └── types/
│       └── index.ts                 # TypeScript types
├── public/                           # Static assets
├── .env.example                      # Environment variables template
├── tailwind.config.ts               # Tailwind configuration
├── next.config.js                   # Next.js configuration
└── package.json                     # Dependencies

## Next Steps

### 1. Environment Setup
```bash
cp .env.example .env.local
# Edit .env.local with your API keys
```

### 2. Add Farcaster Integration
- Install Farcaster SDK when available
- Implement frame message validation
- Set up user authentication

### 3. Integrate NFT Data Sources
- Connect to OpenSea API for floor prices
- Set up NFTScan or similar for drop detection
- Implement real-time updates with WebSockets

### 4. Deploy
- Deploy to Vercel for easy Next.js hosting
- Update Farcaster frame manifest URL
- Configure production environment variables

## Key Technologies
- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **ethers.js** - Web3 library
- **axios** - HTTP client

## Farcaster Frame Setup

To use this as a Frame on Farcaster:
1. Host the app on a public URL (e.g., Vercel)
2. Create a frame endpoint that returns OG tags
3. Register the frame URL in Farcaster
4. Share the frame URL with `fc:frame` tags

Example frame URL: `https://your-domain.com/frame`

## API Endpoints

### GET /api/drops
Returns list of NFT drops
```json
{
  "drops": [
    {
      "id": "1",
      "name": "Collection Name",
      "floor_price": "2.5 ETH",
      "blockchain": "Ethereum"
    }
  ]
}
```

### POST /api/frame
Handles Farcaster frame interactions

## Development Tips
- Hot reload enabled for fast iteration
- Use `@/` path aliases for cleaner imports
- Check `tsconfig.json` for type checking configuration
- ESLint configured for code quality

## Troubleshooting

### npm install issues
Use `--legacy-peer-deps` if peer dependency conflicts occur

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

## Contributing
Follow the existing component structure and type safety patterns.

## License
MIT
