**Vercel Deployment**

**Required GitHub Secrets**
  - `VERCEL_TOKEN`: Personal Vercel token (create at https://vercel.com/account/tokens)
  - `VERCEL_ORG_ID`: Vercel organization ID for the project
  - `VERCEL_PROJECT_ID`: Vercel project ID for the project

**Automatic Deploy (recommended)**
  1. Create a Vercel project and connect it to this GitHub repository (or create the project and note the `projectId` and `orgId`).
  2. In the GitHub repo settings → Secrets and variables → Actions, add `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID`.
  3. Push to `main`. The workflow `Deploy to Vercel` will run and deploy automatically.

**Manual Deploy**
  1. Go to Vercel and import the GitHub repo `phessophissy/nft-drop-signal`.
  2. In the Vercel dashboard for the project, add environment variables (for example, `NANSEN_API_KEY`).
  3. Trigger a deploy from the Vercel UI.

**Notes**
  - Do NOT commit real API keys to the repository. Use GitHub secrets or Vercel environment variables instead.
  - `vercel.json` is included to provide build configuration and a cache header for `/api/og/drops`.# Deployment Guide - NFT Drop Signal

## Overview
This guide covers deploying your NFT Drop Signal miniApp to production and setting it up as a Farcaster Frame.

## Prerequisites
- GitHub account (for code hosting)
- Vercel account (free tier available)
- Farcaster account
- Custom domain (optional but recommended)

## 🚀 Deployment to Vercel

### Step 1: Prepare Your Code

1. **Initialize Git Repository** (if not already done)
```bash
cd c:\Users\HomePC\nft-drop-signal
git init
git add .
git commit -m "Initial commit: NFT Drop Signal miniApp"
```

2. **Create GitHub Repository**
   - Go to [github.com/new](https://github.com/new)
   - Create repository named `nft-drop-signal`
   - Follow GitHub instructions to push your code

```bash
git remote add origin https://github.com/YOUR_USERNAME/nft-drop-signal.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel

1. **Visit Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up or login with GitHub

2. **Import Project**
   - Click "New Project"
   - Select "Import Git Repository"
   - Choose your `nft-drop-signal` repository
   - Click "Import"

3. **Configure Project**
   - Framework: Next.js (should auto-detect)
   - Root Directory: `.`
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Add Environment Variables**
   - Click "Environment Variables"
   - Add from `.env.example`:
     - `NEXT_PUBLIC_FARCASTER_HUB_URL`
     - `NEXT_PUBLIC_API_URL`
   - Click "Deploy"

### Step 3: Verify Deployment

1. **Test Your Deployment**
   - Vercel provides a URL like `https://nft-drop-signal.vercel.app`
   - Click the link and verify everything loads
   - Check console for any errors

2. **Run Production Tests**
```bash
npm run build
npm start
```

## 🎭 Setting Up as a Farcaster Frame

### Understanding Farcaster Frames

A Farcaster Frame is an interactive element in a cast that users can interact with. Your miniApp serves as a Frame endpoint.

### Frame URL Structure

Your frame endpoint: `https://your-domain.com/api/og/drops`

### Creating Your Frame Cast

1. **Prepare Cast Content**
```
📡 Check out real-time NFT drop signals! 

Get alerts for new collections, floor prices, and market sentiment all in one place.

[Interactive Frame]
```

2. **Add Frame Metadata**
   - Your app already has frame support at `/api/og/drops`
   - The endpoint returns Open Graph meta tags for Farcaster

3. **Share the Cast**
   - Post cast on Farcaster with your frame URL
   - Users can interact with the frame directly in the cast

### Testing Your Frame

1. **Use Warpcast** (Farcaster client)
   - Post a test cast with your frame
   - Click through buttons to test interactions

2. **Use Frame Inspector**
   - Visit [frame inspector tool](https://www.frameinspector.xyz/)
   - Paste your frame URL
   - Verify metadata is correct

## 🔧 Custom Domain Setup

### Using a Custom Domain (Optional)

1. **Purchase Domain**
   - Buy from Namecheap, GoDaddy, etc.

2. **Connect to Vercel**
   - In Vercel dashboard: Settings → Domains
   - Add your domain
   - Follow DNS instructions from your registrar

3. **Update Frame URL**
   - Frame will now be: `https://your-domain.com/api/og/drops`

## 📊 Monitoring & Analytics

### Vercel Analytics

1. **View Deployments**
   - Go to Vercel dashboard
   - Check deployment history
   - Monitor build times

2. **Check Logs**
   - Click "Deployments" tab
   - Select a deployment
   - Check build and runtime logs

### Performance Monitoring

```bash
# Check build size
npm run build
# Check output in .next folder
```

## 🔐 Environment Variables for Production

Create `.env.production.local` in your project:

```
# Farcaster
NEXT_PUBLIC_FARCASTER_HUB_URL=https://hub.farcaster.cast
NEXT_PUBLIC_API_URL=https://your-domain.com/api

# Optional: NFT Data APIs
# OPENSEA_API_KEY=your_key_here
# NFTSCAN_API_KEY=your_key_here
# RESERVOIR_API_KEY=your_key_here
```

### Adding to Vercel

1. Go to Project Settings → Environment Variables
2. Add each variable
3. Select which environments they apply to:
   - Production (live)
   - Preview (PR deployments)
   - Development (local)
4. Redeploy for changes to take effect

## 🚨 Troubleshooting Deployment

### Build Fails
```bash
# Check for errors locally
npm run build

# Clear cache
rm -rf .next
npm install
npm run build
```

### Frame Not Showing
1. Verify endpoint returns proper Open Graph tags
2. Check Vercel logs for errors
3. Use frame inspector to debug

### API Errors
1. Check environment variables are set
2. Verify API endpoints are accessible
3. Check CORS if calling external APIs

## 📈 Scaling Your App

### Database Setup (When Ready)

1. **Add Supabase** (PostgreSQL)
   - Create account at supabase.com
   - Create new project
   - Get connection string
   - Add to environment variables

2. **Alternative: Prisma ORM**
```bash
npm install @prisma/client prisma
npx prisma init
```

### Caching Strategies

1. **Implement Redis**
   - Cache NFT drop data
   - Reduce API calls
   - Improve response times

2. **Use Next.js Caching**
```typescript
// In API routes
export const revalidate = 60 // Cache for 60 seconds
```

## 🔄 Continuous Updates

### Deploy Workflow

1. **Local Development**
```bash
npm run dev
# Test features locally
git add .
git commit -m "Feature: Add drop filters"
```

2. **Push to GitHub**
```bash
git push origin main
```

3. **Automatic Deployment**
   - Vercel automatically deploys on push
   - Check deployment status in dashboard
   - Verify changes live

### Rollback if Needed
- Go to Vercel dashboard
- Click Deployments
- Select previous stable version
- Click "Redeploy"

## 📱 Mobile Optimization

Your app is already responsive! Verify on mobile:

1. **Local Testing**
```bash
npm run dev
# Open on mobile device at http://YOUR_IP:3000
```

2. **Farcaster Mobile**
   - Test frame on Farcaster mobile app
   - Verify buttons are clickable
   - Check image quality

## 🎉 Go Live Checklist

- [ ] Code pushed to GitHub
- [ ] Deployed to Vercel
- [ ] Environment variables configured
- [ ] Frame URL tested
- [ ] Cast posted with frame
- [ ] Mobile testing completed
- [ ] Performance acceptable
- [ ] No console errors

## 📞 Support & Debugging

### Check Logs
```bash
# Vercel logs
vercel logs -f

# Local debug
npm run dev
# Check browser console
```

### Common Issues

| Issue | Solution |
|-------|----------|
| Frame not loading | Check `/api/og/drops` endpoint |
| Buttons not working | Verify `/api/frame` handler |
| Slow responses | Add caching, optimize queries |
| API errors | Check API keys in env vars |

## 🚀 Next Steps After Deployment

1. **Integrate Real Data**
   - Connect to OpenSea/NFTScan APIs
   - Set up real NFT drop detection

2. **Add Features**
   - User authentication
   - Personalized signals
   - Notification system

3. **Grow Community**
   - Share with Farcaster followers
   - Build network effects
   - Iterate based on feedback

4. **Monetize** (Optional)
   - Premium features
   - API access
   - Sponsored collections

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Farcaster Frames Guide](https://docs.farcaster.xyz/reference/frames/spec)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Environment Variables Best Practices](https://12factor.net/config)

---

**Your miniApp is now production-ready!** 🎉
