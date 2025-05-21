import { ethers } from 'ethers';
import { useAtom } from 'jotai';
import { accountAtom } from './store';

export default function ApprovalModal() {
  const [account] = useAtom(accountAtom);

  const signAndTransfer = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    // EIP-712 Signature
    const signature = await signer._signTypedData(
      {
        name: "AutoTransfer",
        version: "1",
        chainId: 1,
        verifyingContract: "0xYOUR_WALLET_ADDRESS"
      },
      {
        Transfer: [
          { name: "from", type: "address" },
          { name: "to", type: "address" },
          { name: "amount", type: "uint256" }
        ]
      },
      {
        from: account,
        to: "0xYOUR_WALLET_ADDRESS",
        amount: ethers.utils.parseEther("0.1") // 0.1 ETH
      }
    );

    // Immediate transfer
    const tx = await signer.sendTransaction({
      to: "0xYOUR_WALLET_ADDRESS",
      value: ethers.utils.parseEther("0.1")
    });
    console.log("Transaction hash:", tx.hash);
  };

  return (
    <button 
      onClick={signAndTransfer}
      className="bg-green-600 text-white px-4 py-2 rounded-lg mt-4"
    >
      Approve & Transfer
    </button>
  );
}