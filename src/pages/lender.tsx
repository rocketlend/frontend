import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { useChainId, useReadContract, useWriteContract, useAccount } from 'wagmi';
import { formatEther } from 'viem';
import { chainNameFromId, useRocketAddress, rocketLendABI, rplABI } from '../wagmi';
import IfConnected from '../components/ifConnected';

const useLenderId = ({address, chainName, constants}) => {
  const [lenderId, setLenderId] = useState(null);
  const [needsRefresh, setNeedsRefresh] = useState(false);
  const refreshLenderId = () => setNeedsRefresh(true);
  useEffect(() => {
    if (typeof address != 'string') return;
    if (!needsRefresh) return;
    setNeedsRefresh(false);
    const logServerUrl = constants[chainName].logserver;
    fetch(`${logServerUrl}/lenderId/${address}`).then((res) => {
      if (res.status !== 200) setLenderId(null)
      else res.json().then(id => setLenderId(BigInt(id)))
    }).catch(e => console.error(`Error fetching lender id ${e.message}`));
  }, [address, chainName, constants, needsRefresh]);
  return {lenderId, refreshLenderId};
};

const RPLBalance = ({accountAddress, chainName}) => {
  const {data: rplAddress} = useRocketAddress({chainName, contractName: 'rocketTokenRPL'});
  const {data: rplBalance, error: rplBalanceError, fetchStatus} = useReadContract({
    abi: rplABI,
    address: rplAddress,
    functionName: 'balanceOf',
    args: [accountAddress]
  });
  return (
    <p>Balance:
      {typeof rplBalance == 'bigint' ? ` ${formatEther(rplBalance)} RPL` : ` Error: ${rplBalanceError}`}
    </p>
  );
};

const RegisterLenderForm = ({chainName, constants, refreshLenderId}) => {
  const {writeContract} = useWriteContract();
  const handleRegister = (e) => {
    const address = constants[chainName].rocketlend;
    const result = writeContract({
      address,
      abi: rocketLendABI,
      functionName: 'registerLender',
    });
    // TODO: show pending state in UI
    // TODO: update UI state on success
    // TODO: refreshLenderId on success
  };
  return (
    <section>
    <h2>Register as a Rocket Lend Lender</h2>
    <button
      onClick={handleRegister}
      className="border"
    >Register</button>
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
      <section>
        <h2>Transfer Lender Id</h2>
        <p>TODO form to transfer id to another address</p>
      </section>
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
  const {address, status} = useAccount();
  const {lenderId, refreshLenderId} = useLenderId({chainName, address, constants});
  return (
    <IfConnected accountStatus={status}>
      <RPLBalance accountAddress={address} chainName={chainName} />
      { typeof lenderId == 'bigint' ?
        <LenderOverview lenderId={lenderId} /> :
        <RegisterLenderForm
           refreshLenderId={refreshLenderId}
           chainName={chainName}
           constants={constants}
        /> }
    </IfConnected>
  );
};

export default Page;
