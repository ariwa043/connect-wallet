import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useDisconnect } from 'wagmi';

export default function ConnectButton() {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const handleClick = async () => {
    if (isConnected) {
      await disconnect();
    } else {
      open();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full px-4 py-2 text-white font-semibold bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
    >
      {isConnected
        ? `Disconnect ${address?.slice(0, 6)}...${address?.slice(-4)}`
        : 'Connect Wallet'}
    </button>
  );
}