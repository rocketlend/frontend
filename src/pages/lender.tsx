import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { useChainId, useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { formatEther } from 'viem';
import { chainNameFromId, useRocketAddress, rocketLendABI, rplABI } from '../wagmi';
import IfConnected from '../components/ifConnected';

const TransactionButton = ({buttonText, address, abi, functionName, args}) => {
  const {
    writeContract,
    data: hash,
    error: errorOnWrite,
    isPending,
    isSuccess: writeSuccess,
  } = useWriteContract();
  const {
    data: receipt,
    error: errorOnWait,
    isLoading,
    isSuccess: isConfirmed
  } = useWaitForTransactionReceipt({hash, query: {enabled: writeSuccess}});
  const handler = () => {
    writeContract({ address, abi, functionName, args });
  };
  // TODO: make the status messages disappear eventually?
  return (
    <>
    <button
      className="border"
      disabled={isPending || (writeSuccess && !(errorOnWait || isConfirmed))}
      onClick={handler}
    >{buttonText}</button>
    {hash && !receipt && <p>Submitted transaction with hash {hash}</p>}
    {receipt && receipt.status == 'success' && <p>{hash} confirmed</p>}
    {receipt && isConfirmed && receipt.status != 'success' && <p>{hash} {receipt.status}</p>}
    {errorOnWrite && <p>Error sending transaction: {errorOnWrite.message}</p>}
    {errorOnWait && <p>Error waiting for transaction confirmation: {errorOnWait.message}</p>}
    </>
  );
};


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
  const address = constants[chainName].rocketlend;
  // TODO: refreshLenderId on success
  return (
    <section>
    <h2>Register as a Rocket Lend Lender</h2>
    <TransactionButton
     buttonText="Register"
     address={address}
     abi={rocketLendABI}
     functionName="registerLender"
    />
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
