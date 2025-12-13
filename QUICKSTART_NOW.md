# 🚀 Quick Start Guide - MiniSudoku

Get your MiniSudoku game running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- A wallet with Base Sepolia ETH (for testnet deployment)
- MetaMask or similar Web3 wallet

## Step 1: Environment Setup (1 min)

```bash
# Navigate to project
cd C:\Users\HomePC\nft-drop-signal

# Create environment file
copy .env.local.example .env.local

# Edit .env.local and add your private key
# PRIVATE_KEY=your_private_key_here
```

## Step 2: Install Dependencies (Already Done! ✅)

Dependencies are already installed. If you need to reinstall:
```bash
npm install
```

## Step 3: Run Local Development (30 seconds)

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

**You'll see:**
- 🎮 MiniSudoku title with metallic gold text
- Leaf green themed interface
- "Connect Wallet" button
- Beautiful gradient backgrounds

**Click "Connect Wallet"** to get a simulated wallet and start playing!

## Step 4: Test the Game (2 min)

1. **Connect Wallet**: Click button to get a mock wallet address
2. **Select Difficulty**: Choose Easy, Medium, or Hard
3. **Pay & Play**: Click to simulate payment ($0.30 USDC)
4. **Play Sudoku**: 
   - Click a cell to select it
   - Use number pad to fill in numbers
   - Invalid numbers show in red
   - Complete the puzzle to win!
5. **View Stats**: Check Pool Stats and Leaderboard on the right

## Step 5: Deploy Smart Contract (Optional - 2 min)

### For Testnet:

```bash
# Compile contract
npm run compile

# Deploy to Base Sepolia
npm run deploy
```

**Copy the contract address** and add to `.env.local`:
```
NEXT_PUBLIC_MINISUDOKU_CONTRACT=0xYourContractAddress
```

Then restart dev server:
```bash
npm run dev
```

## Testing Checklist

- [ ] Local dev server runs without errors
- [ ] UI shows leaf green theme with metallic text
- [ ] Can connect wallet (mock)
- [ ] Can select difficulty level
- [ ] Sudoku board renders correctly
- [ ] Can select cells and input numbers
- [ ] Invalid placements show in red
- [ ] Pool stats display (mock data)
- [ ] Leaderboard displays (mock data)
- [ ] Responsive on mobile view

## Next: Deploy to Vercel

When you're ready to go live:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts
```

Then set environment variables in Vercel dashboard.

## Troubleshooting

### Port already in use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

### Module not found errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors
```bash
# Check for type errors
npm run lint
```

### Contract deployment fails
- Ensure you have Base Sepolia ETH
- Check your private key in `.env.local`
- Verify RPC URL is correct

## File You Might Want to Customize

1. **Colors** (`src/app/globals.css`):
   - Adjust green shades
   - Modify metallic text gradient

2. **Entry Fee** (`contracts/MiniSudoku.sol`):
   - Change `ENTRY_FEE`, `POOL_AMOUNT`, `CREATOR_AMOUNT`
   - Must redeploy contract after changes

3. **Difficulty** (`src/lib/sudoku.ts`):
   - Adjust cells removed in `cellsToRemove` object

4. **UI Text** (`src/app/page.tsx`):
   - Customize titles, descriptions, button labels

## Project Structure Quick Reference

```
src/
├── app/
│   ├── page.tsx           ← Main game page (START HERE)
│   ├── globals.css        ← Theme colors
│   └── api/               ← Backend routes
├── components/
│   ├── SudokuBoard.tsx    ← Game board
│   ├── PoolStats.tsx      ← Prize pool display
│   └── Leaderboard.tsx    ← Rankings
└── lib/
    ├── sudoku.ts          ← Game logic
    ├── contract.ts        ← Blockchain
    └── x402.ts            ← Payments

contracts/
└── MiniSudoku.sol         ← Smart contract
```

## What Works Right Now (Without Deployment)

✅ Full Sudoku game with validation
✅ Beautiful leaf green UI with metallic text
✅ Difficulty selection (Easy/Medium/Hard)
✅ Mock wallet connection
✅ Mock leaderboard and pool stats
✅ Puzzle generation and solving
✅ Responsive design

## What Needs Deployment

⏳ Real wallet connection (WalletConnect/MetaMask)
⏳ Actual USDC payments via x402
⏳ On-chain win tracking
⏳ Real-time leaderboard from blockchain
⏳ Prize pool distribution
⏳ Farcaster Frame integration

## Ready to Play! 🎮

Your MiniSudoku game is ready for local testing. Enjoy the sleek leaf green interface and competitive gameplay!

**Questions?** Check `PROJECT_SUMMARY.md` for full details or `DEPLOYMENT_GUIDE.md` for production deployment.
