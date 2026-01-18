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

---

## 🤝 Contributing

We welcome contributions to the NFT Drop Signal project! Here's how you can help:

### Ways to Contribute
- **Signal Detection**: Improve NFT drop detection algorithms and data sources
- **UI/UX Enhancements**: Enhance the user interface for better signal display and notifications
- **Farcaster Integration**: Add more Farcaster features like cast interactions and user engagement
- **Multi-Chain Support**: Add support for more blockchain networks beyond Ethereum
- **Notification Systems**: Implement push notifications, email alerts, or Discord bots
- **Data Analytics**: Add advanced analytics for drop performance and user behavior
- **API Development**: Create REST APIs for external integrations
- **Testing**: Add comprehensive test coverage for signal detection and notifications

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes and ensure tests pass
4. Run the test suite: `npm run lint && npm run build`
5. Submit a pull request with a clear description

### Code Standards
- Follow existing code patterns and TypeScript best practices
- Add tests for new functionality
- Update documentation for significant changes
- Ensure backward compatibility where possible
- Use descriptive commit messages

### Frontend Guidelines
- Use TypeScript for type safety
- Follow React best practices
- Ensure mobile responsiveness for Farcaster Frames
- Test on multiple wallet connections (MetaMask, WalletConnect, Coinbase Wallet)
- Handle error states gracefully

### API Development Guidelines
- Document all API endpoints with OpenAPI/Swagger
- Implement proper rate limiting and authentication
- Use TypeScript for API responses
- Include comprehensive error handling
- Add request/response logging for debugging

### Farcaster Integration Guidelines
- Use Farcaster Frames SDK properly
- Handle frame validation and signatures
- Implement proper error handling for frame interactions
- Test on both mobile and desktop Farcaster clients
- Follow Farcaster best practices for miniApps

### Testing
- All React components should have unit tests
- API endpoints should have integration tests
- Farcaster Frames should have end-to-end tests
- Test on multiple devices and screen sizes
- Include edge cases and failure scenarios

### Security Considerations
- Never expose private keys or API secrets
- Validate all user inputs, especially from Farcaster Frames
- Implement proper CORS policies for API endpoints
- Use HTTPS for all external API calls
- Regular security audits of dependencies

---

## License

MIT
