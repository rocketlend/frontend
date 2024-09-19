import type { NextPage } from "next";
import Link from "next/link";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import { Dispatch, SetStateAction } from "react";
import {
  poolIdsQuery,
  pendingPoolIdsQuery,
} from "../../functions/logServerQueries";
import { useQuery } from "@tanstack/react-query";
import type { DefaultError } from "@tanstack/react-query";
import { IfConnected } from "../../components/IfConnected";
import { useLogServerURL } from "../../hooks/useLogServerURL";
import { RPLBalance } from "../../components/rpl-balance";
import CreateLendingPool from "../../components/lender/create-lending-pool";
import type { RefreshUntilBlockType } from "../../functions/logServerRefresher";
import {
  makeRefresher,
  makeOnTransactionSuccess,
} from "../../functions/logServerRefresher";
import { useRocketLendAddress } from "../../hooks/useRocketLendAddress";
import rocketLendABI from "../../rocketlend.abi";
import { TransactionSubmitter } from "../../components/TransactionSubmitter";
import { RPLAllowance } from "../../components/rpl-allowance";

const PendingLendingPools = ({
  address,
  poolIds,
  poolIdsError,
  setRefreshUntilBlock,
}: {
  address: `0x${string}`;
  poolIds: string[] | undefined;
  poolIdsError: DefaultError | null;
  setRefreshUntilBlock: Dispatch<SetStateAction<RefreshUntilBlockType>>;
}) => {
  const rocketLendAddress = useRocketLendAddress();
  const onSuccess = makeOnTransactionSuccess(
    setRefreshUntilBlock,
    "Adopt pool"
  );
  return poolIdsError ? (
    <p>
      Error fetching incoming pool transfers for {address}:{" "}
      {poolIdsError.message}
    </p>
  ) : !poolIds ? (
    <p>fetching incoming pool transfers...</p>
  ) : (
    !!poolIds.length && (
      <section>
        <h2>Confirm Transfer of Pool</h2>
        {poolIds.map((id) => (
          <TransactionSubmitter
            buttonText={`Adopt Pool ${id}`}
            address={rocketLendAddress}
            abi={rocketLendABI}
            functionName="confirmTransferPool"
            args={[BigInt(id)]}
            onSuccess={onSuccess}
          />
        ))}
      </section>
    )
  );
};

const LendingPools = ({
  address,
  poolIds,
  poolIdsError,
}: {
  address: `0x${string}`;
  poolIds: string[] | undefined;
  poolIdsError: DefaultError | null;
}) => {
  return poolIdsError ? (
    <p>
      Error fetching pool Ids for {address}: {poolIdsError.message}
    </p>
  ) : !poolIds ? (
    <p>fetching pool ids...</p>
  ) : poolIds.length ? (
    <section>
      <h2>Your Lending Pools</h2>
      <ul>
        {poolIds.map((id) => (
          <li key={id}>
            <Link href={`pool/${id}`}>Pool {id}</Link>
          </li>
        ))}
      </ul>
    </section>
  ) : (
    <p>Lender {address} does not have any lending pools yet.</p>
  );
};

const Page: NextPage = () => {
  const logServerUrl = useLogServerURL();
  const { address, status } = useAccount();
  const {
    data: poolIdsData,
    error: poolIdsError,
    refetch: refreshPoolIds,
  } = useQuery(poolIdsQuery({ logServerUrl, address }));
  const {
    data: pendingPoolIdsData,
    error: pendingPoolIdsError,
    refetch: refreshPendingPoolIds,
  } = useQuery(pendingPoolIdsQuery({ logServerUrl, address }));
  // TODO: add listener to events that calls refreshPoolIds on new events
  const [refreshUntilBlock, setRefreshUntilBlock] =
    useState<RefreshUntilBlockType>({});
  const [refreshPendingUntilBlock, setRefreshPendingUntilBlock] =
    useState<RefreshUntilBlockType>({});
  useEffect(
    ...makeRefresher(
      refreshUntilBlock,
      setRefreshUntilBlock,
      poolIdsData,
      refreshPoolIds,
      "poolIds"
    )
  );
  useEffect(
    ...makeRefresher(
      refreshPendingUntilBlock,
      setRefreshPendingUntilBlock,
      pendingPoolIdsData,
      refreshPendingPoolIds,
      "pendingPoolIds"
    )
  );
  return (
    <IfConnected accountStatus={status}>
      <div className="space-y-4">
        <RPLBalance />
        <RPLAllowance />
        <PendingLendingPools
          poolIds={pendingPoolIdsData?.pendingPoolIds}
          poolIdsError={pendingPoolIdsError}
          address={address as `0x${string}`}
          setRefreshUntilBlock={setRefreshPendingUntilBlock}
        />
        <LendingPools
          poolIds={poolIdsData?.poolIds}
          poolIdsError={poolIdsError}
          address={address as `0x${string}`}
        />
        <CreateLendingPool setRefreshUntilBlock={setRefreshUntilBlock} />
      </div>
    </IfConnected>
  );
};

export default Page;
