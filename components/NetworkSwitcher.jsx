import { useChains, useSwitchChain, useChainId } from 'wagmi'

export function NetworkSwitcher() {
  const chains = useChains()
  const chainId = useChainId()
  const { switchChain, isLoading, pendingChainId, error } = useSwitchChain()

  if (!chainId) return null

  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-2">
        {chains.map((chain) => (
          <button
            key={chain.id}
            onClick={() => switchChain({ chainId: chain.id })}
            className={`px-3 py-1 text-sm rounded-full ${
              chainId === chain.id
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            disabled={isLoading && pendingChainId === chain.id}
          >
            {chain.name}
            {isLoading && pendingChainId === chain.id && ' (switching...)'}
          </button>
        ))}
      </div>

      {error && (
        <div className="mt-2 text-sm text-red-500">
          {error.message}
        </div>
      )}
    </div>
  )
}
