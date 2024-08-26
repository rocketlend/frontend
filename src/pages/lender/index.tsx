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
    <p>Balance:
      {typeof rplBalance == 'bigint' ? ` ${formatEther(rplBalance)} RPL` : ` Balance Type: ${typeof rplBalance} ${rplAddressStatus} ${rplBalanceStatus}; Address Error: ${rplAddressError}; Balance Error: ${rplBalanceError}`}
    </p>
  );
};

type RefetchType = (options?: { throwOnError: boolean, cancelRefetch: boolean }) => Promise<UseQueryResult>;

const RegisterLenderForm = ({refreshLenderId} : {refreshLenderId: RefetchType}) => {
  const address = useRocketLendAddress();
  return (
    <section>
    <h2>Register as a Rocket Lend Lender</h2>
    <TransactionSubmitter
     buttonText="Register"
     address={address}
     abi={rocketLendABI}
     functionName="registerLender"
     onSuccess={refreshLenderId}
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
