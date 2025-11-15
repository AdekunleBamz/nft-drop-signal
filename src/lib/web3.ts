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

export async function connectInjectedWallet(preferred?: 'metamask' | 'rabby') {
  try {
    if (typeof window === 'undefined' || !window.ethereum) {
      throw new Error('No injected wallet found')
    }

    const provider: any = window.ethereum

    // If a specific wallet is requested, check for its flag
    if (preferred === 'metamask' && !provider.isMetaMask) {
      throw new Error('MetaMask not available')
    }
    if (preferred === 'rabby' && !provider.isRabby) {
      // Rabby may expose isRabby flag — fall back to checking provider name
      if (!provider.isRabby && !(provider?.wallet && provider.wallet === 'rabby')) {
        throw new Error('Rabby wallet not available')
      }
    }

    // Request accounts
    await provider.request({ method: 'eth_requestAccounts' })

    // Use ethers to get the signer address
    const ethersProvider = new ethers.BrowserProvider(provider)
    const signer = await ethersProvider.getSigner()
    const address = await signer.getAddress()
    return address
  } catch (error) {
    console.error('connectInjectedWallet error:', error)
    throw error
  }
}

export async function connectWalletConnect(projectId?: string) {
  try {
    // Dynamically import the WalletConnect provider package
    const mod = await import('@walletconnect/ethereum-provider')
    const EthereumProvider: any = mod.default || mod.EthereumProvider || mod
    if (!EthereumProvider) {
      throw new Error('WalletConnect provider not found in module')
    }

    const cfg: any = {}
    if (projectId) cfg.projectId = projectId
    else if (process?.env?.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID)
      cfg.projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

    const provider: any = await EthereumProvider.init(cfg)
    // Connect will open the QR modal/pairing UI
    await provider.connect()

    // For compatibility, set window.ethereum
    if (typeof window !== 'undefined') {
      ;(window as any).ethereum = provider
    }

    // Try to get accounts
    const accounts = await provider.request({ method: 'eth_accounts' })
    const address = accounts && accounts[0]
    return address
  } catch (error) {
    console.error('connectWalletConnect error:', error)
    throw error
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
