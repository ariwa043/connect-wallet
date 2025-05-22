import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { mainnet, polygon, arbitrum } from 'viem/chains'
import ConnectButton from '../ConnectButton'
import { NetworkSwitcher } from '../components/NetworkSwitcher'
import { Balance } from '../components/Balance'
import './App.css'

// Configure chains & providers with WalletConnect
const projectId = '435fa3916a5da648144afac1e1b4d3f2'
const metadata = {
  name: 'Multi-Wallet Connect Demo',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet, polygon, arbitrum]
const config = defaultWagmiConfig({ 
  chains, 
  projectId, 
  metadata,
  ssr: false // Changed to false for client-side rendering
})

// Create modal
createWeb3Modal({ wagmiConfig: config, projectId, chains })

const queryClient = new QueryClient()

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center mb-8">
              Multi-Wallet Connect
            </h1>
            <ConnectButton />
            <NetworkSwitcher />
            <Balance />
          </div>
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
