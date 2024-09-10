import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import {
  poolIdsQuery,
  pendingPoolIdsQuery,
} from "../../functions/logServerQueries";
import { useQuery } from "@tanstack/react-query";
import type { DefaultError } from "@tanstack/react-query";
import { IfConnected } from "../../components/IfConnected";
import { useLogServerURL } from "../../hooks/useLogServerURL";
import { RPLBalance } from "../../components/RPLBalance";
import CreateLendingPool from "../../components/lender/create-lending-pool";
import type { RefreshUntilBlockType } from "../../functions/logServerRefresher";
import { makeRefresher } from "../../functions/logServerRefresher";

const LendingPools = ({
  address,
  poolIds,
  poolIdsError,
} : {
  address: `0x${string}`;
  poolIds: string[] | undefined;
  poolIdsError: DefaultError | null;
}) => {
  return (
    poolIdsError ? <p>Error fetching pool Ids for {address}: {poolIdsError.message}</p> :
    !poolIds ? <p>fetching pool ids...</p> :
      poolIds.length ?
      <section>
        <h2>Your Lending Pools</h2>
        <p>TODO lending pools for lender {address} are: {poolIds.join()}</p>
      </section> : <p>Lender {address} does not have any lending pools yet.</p>
  );
};

const Page: NextPage = () => {
  const logServerUrl = useLogServerURL();
  const { address, status } = useAccount();
  const {
    data: poolIdsData,
    error: poolIdsError,
    refetch: refreshPoolIds,
  } = useQuery(poolIdsQuery({logServerUrl, address}));
  // TODO: add listener to events that calls refreshPoolIds on new events
  const [refreshUntilBlock, setRefreshUntilBlock] = useState<RefreshUntilBlockType>({});
  // const [refreshPendingUntilBlock, setRefreshPendingUntilBlock] = useState<RefreshUntilBlockType>({});
  useEffect(...makeRefresher(refreshUntilBlock, setRefreshUntilBlock, poolIdsData, refreshPoolIds, "poolIds"));
  // useEffect(...makeRefresher(refreshPendingUntilBlock, setRefreshPendingUntilBlock, pendingLenderIdsData, refreshPendingLenderIds, "pendingLenderIds"));
  return (
    <IfConnected accountStatus={status}>
      <RPLBalance accountAddress={address as `0x${string}`} />
      <LendingPools poolIds={poolIdsData?.poolIds} poolIdsError={poolIdsError} address={address as `0x${string}`} />
      <CreateLendingPool setRefreshUntilBlock={setRefreshUntilBlock} />
    </IfConnected>
  );
};

export default Page;
