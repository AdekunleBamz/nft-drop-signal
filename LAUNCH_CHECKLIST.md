# ✅ MiniSudoku Launch Checklist

Use this checklist to track your deployment progress!

## Phase 1: Local Testing ⚡ (5 minutes)

- [ ] Navigate to project: `cd C:\Users\HomePC\nft-drop-signal`
- [ ] Install dependencies: `npm install` (Already done! ✅)
- [ ] Start dev server: `npm run dev`
- [ ] Open http://localhost:3000
- [ ] Click "Connect Wallet" - verify mock wallet works
- [ ] Select difficulty level
- [ ] Click "Pay & Play" - verify game starts
- [ ] Play Sudoku - verify grid works
- [ ] Input numbers - verify validation
- [ ] Complete puzzle - verify win detection
- [ ] Check Pool Stats - verify UI renders
- [ ] Check Leaderboard - verify UI renders
- [ ] Test on mobile view (Chrome DevTools)

**Pass Criteria**: Game is playable with mock data

---

## Phase 2: Smart Contract Deployment 🔗 (15 minutes)

### Setup
- [ ] Copy `.env.local.example` to `.env.local`
- [ ] Add your private key to `.env.local`
- [ ] Get Base Sepolia ETH from faucet
- [ ] Verify you have ~0.01 ETH for gas

### Compile
- [ ] Run: `npm run compile`
- [ ] Verify no compilation errors
- [ ] Check `artifacts/` folder created

### Deploy to Testnet
- [ ] Run: `npm run deploy`
- [ ] Copy deployed contract address
- [ ] Add to `.env.local`: `NEXT_PUBLIC_MINISUDOKU_CONTRACT=0x...`
- [ ] Save contract address for later

### Verify
- [ ] View contract on BaseScan Sepolia
- [ ] Verify code: `npx hardhat verify --network base-sepolia 0x... "0x036CbD53842c5426634e7929541eC2318f3dCF7e"`
- [ ] Check contract is verified on BaseScan

**Pass Criteria**: Contract deployed and verified on testnet

---

## Phase 3: Integration Testing 🧪 (10 minutes)

- [ ] Restart dev server: `npm run dev`
- [ ] Verify contract address in browser console
- [ ] Test fetching pool info from contract
- [ ] Test fetching leaderboard from contract
- [ ] Test with real wallet (MetaMask)
- [ ] Approve USDC spending (testnet USDC)
- [ ] Play game with real transaction
- [ ] Verify win recorded on-chain
- [ ] Check leaderboard updates
- [ ] Verify pool balance increases

**Pass Criteria**: Full flow works end-to-end on testnet

---

## Phase 4: Vercel Deployment 🌐 (10 minutes)

### Initial Deploy
- [ ] Install Vercel CLI: `npm i -g vercel`
- [ ] Run: `vercel`
- [ ] Link to your Vercel account
- [ ] Choose project name
- [ ] Wait for deployment
- [ ] Copy Vercel URL

### Configure Environment
- [ ] Go to Vercel dashboard
- [ ] Settings → Environment Variables
- [ ] Add: `NEXT_PUBLIC_MINISUDOKU_CONTRACT`
- [ ] Add: `NEXT_PUBLIC_APP_URL`
- [ ] Redeploy: `vercel --prod`

### Verify Deployment
- [ ] Visit Vercel URL
- [ ] Test game on live site
- [ ] Check API routes work
- [ ] Test on mobile device
- [ ] Verify wallet connection

**Pass Criteria**: Game works on live Vercel URL

---

## Phase 5: Farcaster Frame Setup 🎭 (15 minutes)

### Update Manifest
- [ ] Edit `FRAME_MANIFEST.json`
- [ ] Replace URLs with your Vercel URL
- [ ] Verify frame metadata

### Test Frame
- [ ] Install Warpcast on mobile
- [ ] Create test cast with your app URL
- [ ] Verify frame loads
- [ ] Test frame buttons
- [ ] Test "Play Game" flow
- [ ] Verify x402 payment initiation

### Register Frame
- [ ] Submit to Farcaster Frame directory
- [ ] Wait for approval
- [ ] Share with testers

**Pass Criteria**: Frame works in Warpcast

---

## Phase 6: Mainnet Deployment 🚀 (Production)

### Pre-Flight Checks
- [ ] All testnet features working perfectly
- [ ] Contract audited (or self-reviewed)
- [ ] UI/UX tested thoroughly
- [ ] Documentation complete
- [ ] Emergency plan ready

### Deploy Contract
- [ ] Get Base mainnet ETH
- [ ] Run: `npm run deploy:mainnet`
- [ ] Save mainnet contract address
- [ ] Verify on BaseScan
- [ ] Test with small amount first

### Update Production
- [ ] Update Vercel env vars with mainnet address
- [ ] Redeploy to production
- [ ] Update `FRAME_MANIFEST.json` with mainnet config
- [ ] Test entire flow with real USDC

### Go Live
- [ ] Announce on Farcaster
- [ ] Share Frame with community
- [ ] Monitor transactions
- [ ] Track gas costs
- [ ] Watch for issues

**Pass Criteria**: Live on mainnet with real payments!

---

## Phase 7: Monitoring & Maintenance 📊 (Ongoing)

### Daily
- [ ] Check BaseScan for transactions
- [ ] Monitor pool balance
- [ ] Check for errors in Vercel logs
- [ ] Respond to user feedback

### Weekly
- [ ] Review game statistics
- [ ] Check winner distributions
- [ ] Analyze player behavior
- [ ] Update documentation

### As Needed
- [ ] Fix bugs
- [ ] Deploy updates
- [ ] Add features
- [ ] Optimize costs

---

## Emergency Contacts & Resources

### If Something Goes Wrong

**Contract Issues:**
- BaseScan: https://basescan.org
- Base Docs: https://docs.base.org
- Hardhat Docs: https://hardhat.org

**Frontend Issues:**
- Vercel Dashboard: https://vercel.com/dashboard
- Next.js Docs: https://nextjs.org/docs
- Check browser console for errors

**Frame Issues:**
- Farcaster Docs: https://docs.farcaster.xyz
- Warpcast Support: https://warpcast.com
- Test frame with debugger

**Payment Issues:**
- x402 Docs: https://docs.farcaster.xyz/learn/what-is-farcaster/payments
- Check USDC approval on BaseScan
- Verify contract has correct USDC address

---

## Success Indicators ✨

You'll know it's working when:
- ✅ Players can connect and play
- ✅ Payments go through smoothly
- ✅ Wins are recorded on-chain
- ✅ Leaderboard updates in real-time
- ✅ Pool accumulates correctly
- ✅ Winners receive prizes after 24h
- ✅ Frame works in Warpcast
- ✅ No errors in logs
- ✅ Users are having fun!

---

## Estimated Timeline

| Phase | Time | Difficulty |
|-------|------|------------|
| Local Testing | 5 min | ⭐ Easy |
| Contract Deploy | 15 min | ⭐⭐ Medium |
| Integration | 10 min | ⭐⭐ Medium |
| Vercel Deploy | 10 min | ⭐ Easy |
| Frame Setup | 15 min | ⭐⭐⭐ Hard |
| Mainnet | 20 min | ⭐⭐⭐ Hard |
| **TOTAL** | **~75 min** | |

---

## Current Status

**Phase:** Not Started
**Progress:** 0/7 phases complete
**Next Step:** Start with Phase 1 (Local Testing)

---

## Quick Commands Reference

```bash
# Development
npm run dev                    # Start dev server
npm run build                  # Build for production
npm run lint                   # Check for errors

# Smart Contract
npm run compile                # Compile Solidity
npm run deploy                 # Deploy to testnet
npm run deploy:mainnet         # Deploy to mainnet

# Deployment
vercel                         # Deploy to Vercel
vercel --prod                  # Deploy to production

# Verification
npx hardhat verify --network base 0x... "0x833..."
```

---

**Good luck with your launch! 🚀**

Remember: Start small (testnet), test thoroughly, then go big (mainnet)!
