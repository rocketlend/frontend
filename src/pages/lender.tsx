import type { NextPage } from 'next';
import { useChainId, useReadContract, useAccount } from 'wagmi';
import { formatEther } from 'viem';
import { chainNameFromId, useRocketAddress, rplABI } from '../wagmi';

const Page: NextPage = ({constants}) => {
  const chainId = useChainId();
  const chainName = chainNameFromId(chainId);
  const {data: rplAddress} = useRocketAddress({chainName, contractName: 'rocketTokenRPL'});
  const {address: connectedAccount, status} = useAccount();
  const {data: rplBalance, error: rplBalanceError, fetchStatus} = useReadContract({
    abi: rplABI,
    address: rplAddress,
    functionName: 'balanceOf',
    args: [connectedAccount]
  });
  return (
    <>
      <section>
        <h2>Your RPL Balance</h2>
        <p>Connected account: {connectedAccount} (status: {status})</p>
        {status === 'connected' ?
         <p>{typeof rplBalance == 'bigint' && formatEther(rplBalance)} RPL (error: {rplBalanceError?.message || 'no error'}, status: {fetchStatus})</p> :
         <p>Not fetching RPL balance because connection status is {status}</p>
        }
      </section>
      <section>
        <h2>Your Lending Pools</h2>
        <p>TODO only show this if there are existing pools for this lender</p>
      </section>
      <section>
        <h2>Create Lending Pool</h2>
      </section>
    </>
  );
};

export default Page;
