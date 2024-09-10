import type { NextPage } from "next";
import Link from "next/link";
import { useState, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import {
  useReadContracts,
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";
import rocketLendABI from "../../rocketlend.abi";
import {
  poolIdsQuery,
  pendingPoolIdsQuery,
} from "../../functions/logServerQueries";
import { useQuery } from "@tanstack/react-query";
import { TransactionSubmitter } from "../../components/TransactionSubmitter";
import { IfConnected } from "../../components/IfConnected";
import { useLogServerURL } from "../../hooks/useLogServerURL";
import { useRocketLendAddress } from "../../hooks/useRocketLendAddress";
import { RPLBalance } from "../../components/RPLBalance";
import { NULL_ADDRESS } from "../../constants";
import { makeRefresher, makeOnTransactionSuccess } from "../../functions/logServerRefresher";
import type { RefreshUntilBlockType } from "../../functions/logServerRefresher";
import CreateLendingPool from "../../components/lender/create-lending-pool";

const LendingPools = ({ address } : { address: `0x${string}` }) => {
  const logServerUrl = useLogServerURL();
  const {
    data: poolIdsData,
    error: poolIdsError,
    refetch: refreshPoolIds,
  } = useQuery(poolIdsQuery({logServerUrl, address}));
  return (
    poolIdsError ? <p>Error fetching pool Ids for {address}: {poolIdsError.message}</p> :
    !poolIdsData ? <p>fetching pool ids...</p> :
      poolIdsData.poolIds.length ?
      <section>
        <h2>Your Lending Pools</h2>
        <p>TODO lending pools for lender {address} are: {poolIdsData.poolIds.join()}</p>
      </section> : <p>Lender {address} does not have any lending pools yet.</p>
  );
};

const Page: NextPage = () => {
  const logServerUrl = useLogServerURL();
  const { address, status } = useAccount();
  return (
    <IfConnected accountStatus={status}>
      <RPLBalance accountAddress={address as `0x${string}`} />
      <LendingPools address={address as `0x${string}`} />
      <CreateLendingPool />
    </IfConnected>
  );
};

export default Page;
