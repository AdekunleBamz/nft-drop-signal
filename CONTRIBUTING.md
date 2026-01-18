# Contributing to NFT Drop Signal

Thank you for your interest in contributing to NFT Drop Signal! This document provides guidelines and information for contributors.

## Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/nft-drop-signal.git`
3. Install dependencies: `npm install`
4. Create a feature branch: `git checkout -b feature/your-feature-name`
5. Start development server: `npm run dev`

## Code Style

- Use TypeScript for type safety
- Follow the existing code style (ESLint and Prettier are configured)
- Use meaningful commit messages
- Write tests for new features

## Pull Request Process

1. Ensure your code passes all tests: `npm test`
2. Update documentation if needed
3. Create a pull request with a clear description of changes
4. Wait for review and address any feedback

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # Reusable React components
├── lib/             # Utility functions and helpers
├── types/           # TypeScript type definitions
├── services/        # API and external service integrations
└── hooks/           # Custom React hooks
```

## Key Technologies

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Farcaster Frames SDK** for social features
- **ethers.js** for blockchain interactions

## Testing

Run tests with: `npm test`

## Deployment

The app is deployed on Vercel. Push to main triggers automatic deployment.

## Issues and Feature Requests

- Check existing issues before creating new ones
- Use issue templates when available
- Provide detailed descriptions and steps to reproduce

## Code of Conduct

Please be respectful and inclusive in all interactions.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
