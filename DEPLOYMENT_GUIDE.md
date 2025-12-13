# MiniSudoku Deployment Guide

## Prerequisites

1. **Base Sepolia ETH** (for testnet) or **Base ETH** (for mainnet)
   - Get testnet ETH from Base Sepolia faucet
   - Bridge ETH to Base mainnet via official bridge

2. **USDC on Base**
   - For testing: Use Base Sepolia USDC faucet
   - For mainnet: Bridge USDC to Base

3. **Environment Variables**
   - Copy `.env.local.example` to `.env.local`
   - Fill in your private key and API keys

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Compile Smart Contract

```bash
npm run compile
```

This will compile the `MiniSudoku.sol` contract.

## Step 3: Deploy to Testnet (Base Sepolia)

```bash
# Deploy to Base Sepolia testnet
npm run deploy
```

Save the deployed contract address and update `.env.local`:
```
NEXT_PUBLIC_MINISUDOKU_CONTRACT=0x_YOUR_CONTRACT_ADDRESS
```

## Step 4: Test the Contract

Interact with the contract on Base Sepolia:
- Approve USDC spending
- Call `playGame()` with test wins
- Check leaderboard and pool balance

## Step 5: Deploy Frontend to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts to link project
```

## Step 6: Configure Vercel Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add:

```
NEXT_PUBLIC_MINISUDOKU_CONTRACT=0x_YOUR_CONTRACT_ADDRESS
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
NEXT_PUBLIC_USDC_ADDRESS=0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
```

## Step 7: Deploy to Production (Base Mainnet)

⚠️ **Only after thorough testing!**

```bash
npm run deploy:mainnet
```

Update Vercel environment variables with mainnet contract address.

## Step 8: Register Farcaster Frame

1. Update `FRAME_MANIFEST.json` with your Vercel URL
2. Test frame in Warpcast mobile app
3. Submit to Farcaster Frame directory

## Step 9: Verify Contract on BaseScan

```bash
npx hardhat verify --network base YOUR_CONTRACT_ADDRESS "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"
```

## Troubleshooting

### Contract deployment fails
- Ensure you have enough Base ETH for gas
- Check RPC URL is correct
- Verify private key has funds

### Frontend can't connect to contract
- Verify contract address in environment variables
- Check network (Base vs Base Sepolia)
- Ensure contract is deployed and verified

### x402 payments not working
- Test in Warpcast official app first
- Verify USDC approval transaction
- Check contract has correct USDC address

## Post-Deployment Checklist

- [ ] Contract deployed and verified on BaseScan
- [ ] Frontend deployed to Vercel
- [ ] Environment variables set correctly
- [ ] Frame tested in Warpcast
- [ ] Payments tested end-to-end
- [ ] Leaderboard updating correctly
- [ ] Pool distribution tested
- [ ] 24-hour round cycle tested

## Monitoring

Monitor your contract:
- BaseScan: https://basescan.org/address/YOUR_CONTRACT
- Track pool balance, rounds, and winners
- Monitor gas usage and transaction costs

## Maintenance

- Check pool balances regularly
- Finalize rounds if needed (auto-finalizes on next game)
- Update frontend for improvements
- Monitor for any issues

Good luck with your MiniSudoku game! 🎮
