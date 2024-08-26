import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { formatEther } from 'viem';
import rocketLendABI from '../../rocketlend.abi';
import rplABI from '../../rocketTokenRPL.abi';
import { serverQueryFn } from '../../functions/serverQuery';
import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import { TransactionSubmitter } from '../../components/TransactionSubmitter';
import { IfConnected } from '../../components/IfConnected';
import { useLogServerURL } from '../../hooks/useLogServerURL';
import { useRocketAddress } from '../../hooks/useRocketAddress';
import { useRocketLendAddress } from '../../hooks/useRocketLendAddress';

// TODO: add listener to events that calls refreshLenderId on new events
// TODO: ensure lender id is fetched if necessary on page refresh

const RPLBalance = ({accountAddress} : {accountAddress: `0x${string}`}) => {
  const {data: rplAddress, error: rplAddressError, fetchStatus: rplAddressStatus} = useRocketAddress('rocketTokenRPL');
  const {data: rplBalance, error: rplBalanceError, fetchStatus: rplBalanceStatus} = useReadContract({
    abi: rplABI,
    address: rplAddress,
    functionName: 'balanceOf',
    args: [accountAddress]
  });
  return (
    typeof rplBalance == 'bigint' ?
      <p>Balance: {formatEther(rplBalance)} RPL</p> :
    <ul>
      <li>Addresses {rplAddress}; {accountAddress}</li>
      <li>Address Types {typeof rplAddress}; {typeof accountAddress}</li>
      <li>Balance Type: {typeof rplBalance}</li>
      <li>Statuses: {rplAddressStatus} {rplBalanceStatus}</li>
      <li>Address Error: {rplAddressError?.toString() || 'none'}</li>
      <li>Balance Error: {rplBalanceError?.toString() || 'none'}</li>
    </ul>
  );
};

type RefetchType = (options?: { throwOnError: boolean, cancelRefetch: boolean }) => Promise<UseQueryResult>;

const RegisterLenderForm = ({refreshLenderId} : {refreshLenderId: RefetchType}) => {
  const address = useRocketLendAddress();
  const onSuccess = () => {
    console.log(`Register transaction success`);
    // TODO: add a delay so the log server can catch up? or put this in a loop until it changes?
    return refreshLenderId();
  };
  return (
    <section>
    <h2>Register as a Rocket Lend Lender</h2>
    <TransactionSubmitter
     buttonText="Register"
     address={address}
     abi={rocketLendABI}
     functionName="registerLender"
     onSuccess={onSuccess}
    />
    </section>
  );
};

const LenderOverview = ({lenderId} : {lenderId: bigint}) => {
  return (
    <>
      <section>
        <h2>Your Lending Pools</h2>
        <p>TODO only show this if there are existing pools for this lender</p>
      </section>
      <CreateLendingPoolForm />
      <section>
        <h2>Transfer Lender Id</h2>
        <p>Current Lender Id: {lenderId.toString()}</p>
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

const Page: NextPage = () => {
  const logServerUrl = useLogServerURL();
  const {address, status} = useAccount();
  const {data: lenderId, error: lenderIdError, refetch: refreshLenderId} = useQuery({
    queryKey: ['rocketlend', 'lenderId', address],
    queryFn: serverQueryFn({
      onJSON: async (id) => {
        if (typeof id == 'string')
          return BigInt(id);
        else
          throw new Error(`Unexpected lenderId type ${typeof id}`);
      },
      onNotFound: async () => null,
      url: `${logServerUrl}/lenderId/${address}`
    }),
  });
  return (
    <IfConnected accountStatus={status}>
      <RPLBalance accountAddress={address as `0x${string}`} />
      { typeof lenderId == 'bigint' ?
        <LenderOverview lenderId={lenderId} /> :
        <RegisterLenderForm refreshLenderId={refreshLenderId} /> }
    </IfConnected>
  );
};

export default Page;
