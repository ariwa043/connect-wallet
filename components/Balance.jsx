import { useAccount, useBalance } from 'wagmi'

export function Balance() {
  const { address } = useAccount()
  const { data } = useBalance({
    address,
    watch: true,
  })

  if (!address || !data) return null

  return (
    <div className="mt-3 text-sm">
      <span className="text-gray-600">Balance: </span>
      <span className="font-medium text-gray-900">
        {data?.formatted} {data?.symbol}
      </span>
    </div>
  )
}
