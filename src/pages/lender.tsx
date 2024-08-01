import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { useChainId, useReadContract, useAccount } from 'wagmi';
import { formatEther } from 'viem';
import { chainNameFromId, useRocketAddress, rocketLendABI, rplABI } from '../wagmi';

const useLenderId = ({address, chainName, constants}) => {
  const [lenderId, setLenderId] = useState(null);
  useEffect(() => {
    const logServerUrl = constants[chainName].logserver
    fetch(`${logServerUrl}/lenderId/${address}`).then((res) => {
      if (res.status !== 200) setLenderId(null)
      else res.json().then(id => setLenderId(BigInt(id)))
    }).catch(e => console.error(`Error fetching lender id ${e.message}`))
  }, [address, chainName, constants]);
  return lenderId;
};

const RPLBalance = ({chainName}) => {
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

const RegisterLenderForm = () => {
  return (
    <section>
    <h2>Not Registered Yet</h2>
    </section>
  );
};

const LenderOverview = ({lenderId}) => {
  return (
    <>
      <section>
        <h2>Your Lending Pools</h2>
        <p>TODO only show this if there are existing pools for this lender</p>
      </section>
      <CreateLendingPoolForm />
    </>
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
  const chainName = chainNameFromId(useChainId());
  const {address} = useAccount();
  const lenderId = useLenderId({chainName, address, constants});
  return (
    <>
      <RPLBalance chainName={chainName} />
      { typeof lenderId == 'bigint' ?
        <LenderOverview lenderId={lenderId} /> :
        <RegisterLenderForm /> }
    </>
  );
};

export default Page;
