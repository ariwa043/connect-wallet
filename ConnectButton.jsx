import { useWeb3Modal } from '@web3modal/react';
import { useAtom } from 'jotai';
import { accountAtom } from './store';

export default function ConnectButton() {
  const { open } = useWeb3Modal();
  const [account, setAccount] = useAtom(accountAtom);

  const handleConnect = async () => {
    const provider = await open();
    const ethersProvider = new ethers.providers.Web3Provider(provider);
    const signer = ethersProvider.getSigner();
    setAccount(await signer.getAddress());
  };

  return (
    <button 
      onClick={handleConnect}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg"
    >
      {account ? `Connected: ${account.slice(0, 6)}...` : "Connect Wallet"}
    </button>
  );
}