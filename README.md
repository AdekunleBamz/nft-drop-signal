# NFT Drop Signal

A Farcaster miniApp for real-time NFT drop signals and notifications.

## Features

- 🎯 Real-time NFT drop detection
- 📊 Live signal analytics
- 👥 Farcaster integration
- 💰 Price floor tracking
- 🔔 Instant notifications
- 🌐 Multi-chain support

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Farcaster account (for integration)

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/              # Next.js App Router
├── components/       # React components
├── lib/             # Utility functions
├── types/           # TypeScript types
└── services/        # API services
```

## Farcaster Integration

This miniApp integrates with Farcaster's Frames API to:
- Display NFT drop signals
- Share drops with followers
- Track drop performance metrics

## Technologies

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Farcaster Frames SDK** - Farcaster integration
- **ethers.js** - Web3 integration

## License

MIT

## WalletConnect Setup (optional)

To enable WalletConnect QR pairing in the browser, install the WalletConnect provider and optionally provide a project id:

1. Install the package:

```bash
npm install @walletconnect/ethereum-provider
```

2. (Optional) Create a WalletConnect Cloud project and set the `projectId`.

- Locally: add `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id` to `.env.local`
- On Vercel: add `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` to the project environment variables

3. Restart the app. The "WalletConnect (QR)" option in the Connect Wallet modal will open the QR/pairing UI.

Notes:
- The app dynamically imports `@walletconnect/ethereum-provider` at runtime — the provider is installed and used only when the WalletConnect button is pressed.
- If you prefer the provider to always be bundled, add it to `package.json` dependencies (already included in this repo) and rebuild.
