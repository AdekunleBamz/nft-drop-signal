// Web3 utilities for blockchain interaction
import { ethers } from 'ethers'

declare global {
  interface Window {
    ethereum?: any
  }
}

export async function getEthersProvider() {
  try {
    // Try to connect to injected provider (MetaMask, etc.)
    if (typeof window !== 'undefined' && window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum)
      return provider
    }
    // Fallback to Infura
    const infuraProvider = new ethers.JsonRpcProvider(
      'https://mainnet.infura.io/v3/YOUR_INFURA_KEY'
    )
    return infuraProvider
  } catch (error) {
    console.error('Error getting provider:', error)
    return null
  }
}

export async function getContractNFTFloorPrice(): Promise<string | null> {
  try {
    // This would integrate with NFT pricing APIs like:
    // - OpenSea API
    // - Reservoir API
    // - NFTGo API
    // For now, returning mock data
    return '2.5 ETH'
  } catch (error) {
    console.error('Error fetching floor price:', error)
    return null
  }
}

export function isValidContractAddress(address: string): boolean {
  return ethers.isAddress(address)
}
