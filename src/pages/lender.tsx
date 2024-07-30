import type { NextPage } from 'next';
import { useChainId, useReadContract, useAccount } from 'wagmi';
import { formatEther } from 'viem';
import { chainNameFromId, useRocketAddress, rocketLendABI, rplABI } from '../wagmi';

const useIsRegisteredLender = ({address}) => {
  return false; // TODO: fetch from the log server
};

const RPLBalance = () => {
  const chainName = chainNameFromId(useChainId());
  const {data: rplAddress} = useRocketAddress({chainName, contractName: 'rocketTokenRPL'});
  const {address: accountAddress, status: accountStatus} = useAccount();
  const {data: rplBalance, error: rplBalanceError, fetchStatus} = useReadContract({
    abi: rplABI,
    address: rplAddress,
    functionName: 'balanceOf',
    args: [accountAddress]
  });
  return (
    <section>
      <h2>Your RPL Balance</h2>
      <p>Connected account: {accountAddress} (status: {accountStatus})</p>
      {accountStatus === 'connected' ?
        <p>{typeof rplBalance == 'bigint' && formatEther(rplBalance)} RPL (error: {rplBalanceError?.message || 'no error'}, status: {fetchStatus})</p> :
        <p>Not fetching RPL balance because connection status is {accountStatus}</p>
      }
    </section>
  );
};

const CreateLendingPoolForm = () => {
  return (
      <section>
        <h2>Create Lending Pool</h2>
      </section>
  );
}

const Page: NextPage = ({constants}) => {
  return (
    <>
      <RPLBalance />
      <section>
        <h2>Your Lending Pools</h2>
        <p>TODO only show this if there are existing pools for this lender</p>
      </section>
      <CreateLendingPoolForm />
    </>
  );
};

export default Page;
