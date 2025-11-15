/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Common NFT image hosts and IPFS gateways — add domains as needed for your data sources
    domains: [
      'ipfs.io',
      'nftstorage.link',
      'res.cloudinary.com',
      'lh3.googleusercontent.com',
      'pbs.twimg.com',
      'cdn.discordapp.com',
      'static.opensea.io',
      'opensea.io',
      'images.unsplash.com',
      'raw.githubusercontent.com',
      'storage.googleapis.com',
    ],
    remotePatterns: [
      // Allow common ipfs subdomains (CID-based) and https patterns — adjust as needed
      {
        protocol: 'https',
        hostname: 'i.seadn.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig;
