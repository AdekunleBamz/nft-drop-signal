# Getting Started with NFT Drop Signal

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Navigate to [http://localhost:3000](http://localhost:3000) to see your app running.

## Project Features

✅ **Real-time NFT Drop Signals** - Track latest NFT collection launches
✅ **Farcaster Integration** - Share signals with your Farcaster network
✅ **Web3 Ready** - Built-in ethers.js integration for blockchain interaction
✅ **Beautiful UI** - Gradient design with Tailwind CSS
✅ **TypeScript** - Full type safety throughout the project
✅ **API Routes** - Ready-to-use Next.js API endpoints

## File Structure

```
src/
├── app/
│   ├── api/
│   │   ├── drops/route.ts         # GET NFT drops list
│   │   ├── frame/route.ts         # POST Farcaster frames
│   │   └── og/drops/route.ts      # Open Graph for frames
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Home page
│   └── globals.css                # Global styles
├── components/
│   ├── Card.tsx                   # Stats card component
│   ├── Header.tsx                 # Navigation header
│   ├── ShareSignal.tsx            # Share component
│   └── SignalList.tsx             # NFT drops list
├── lib/
│   ├── farcaster.ts               # Farcaster utilities
│   └── web3.ts                    # Web3 utilities
├── services/
│   └── nftDropService.ts          # API client
└── types/
    └── index.ts                   # TypeScript interfaces
```

## Key Components

### SignalList Component
Displays live NFT drops with floor prices and blockchain info
```tsx
<SignalList />
```

### Card Component
Shows statistics with gradient backgrounds
```tsx
<Card 
  title="Active Drops"
  value="5"
  icon="🎯"
  gradient="from-purple-500 to-pink-500"
/>
```

### Header Component
Navigation with wallet connection button
```tsx
<Header />
```

## API Endpoints

### GET /api/drops
Returns list of NFT drops:
```json
{
  "id": "1",
  "name": "Pudgy Penguins",
  "collection": "Pudgy Penguins Official",
  "floor_price": "2.5 ETH",
  "blockchain": "Ethereum",
  "timestamp": "2025-11-14T..."
}
```

### POST /api/frame
Handles Farcaster frame interactions

### GET /api/og/drops
Returns Open Graph metadata for frame sharing

## Customization

### Update Branding
Edit `src/app/page.tsx` to change the app title and description

### Add Your API
Update `src/services/nftDropService.ts` to integrate with real data sources

### Change Theme
Modify `tailwind.config.ts` to update colors and styling

## Environment Variables

Create a `.env.local` file:
```bash
cp .env.example .env.local
```

Available variables:
- `NEXT_PUBLIC_FARCASTER_HUB_URL` - Farcaster hub endpoint
- `NEXT_PUBLIC_API_URL` - Your API base URL

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Run production build
- `npm run lint` - Run ESLint

## Deploying to Vercel

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Click Deploy
5. Update your Farcaster frame manifest with the new URL

## Integration with Farcaster

### Setting Up a Frame

To add this as a Farcaster Frame:

1. Host the app on Vercel or similar
2. Your frame URL will be: `https://your-domain.com/api/og/drops`
3. Create a cast with frame metadata pointing to this URL

Example cast:
```
Check out real-time NFT drop signals! 🚀📡
[Frame: https://your-domain.com/api/og/drops]
```

## Adding Real NFT Data

To integrate real NFT drop data:

1. **OpenSea API** - Get NFT collection data and floor prices
2. **NFTScan** - Real-time NFT transfer and launch data
3. **Reservoir Protocol** - NFT floor price data
4. **RarityTools** - Collection launch information

Update `src/services/nftDropService.ts` with your chosen data source.

## Web3 Integration

The project includes `ethers.js` for blockchain interaction:

```typescript
import { getEthersProvider } from '@/lib/web3'

const provider = await getEthersProvider()
```

## TypeScript

Full TypeScript support with strict mode enabled. Check `tsconfig.json` for configuration.

Key types in `src/types/index.ts`:
- `NFTDrop` - NFT drop data
- `FarcasterUser` - User information
- `Signal` - Drop signal with engagement metrics

## Styling with Tailwind

The project uses Tailwind CSS with custom:
- `glass` class for glassmorphism effects
- `glow-effect` class for shadow effects
- Gradient backgrounds for visual appeal

Example:
```jsx
<div className="glass p-6 glow-effect rounded-lg">
  Content here
</div>
```

## Next Steps

1. ✅ Project is set up and building successfully
2. 📊 Add real NFT data source integration
3. 🔗 Deploy to Vercel
4. 📱 Test as a Farcaster Frame
5. 🎨 Customize UI to match your brand
6. 🚀 Share with your Farcaster followers!

## Support & Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Farcaster Docs](https://docs.farcaster.xyz)
- [Tailwind CSS](https://tailwindcss.com)
- [ethers.js](https://docs.ethers.org)

---

Happy building! 🚀
