import type { NextPage } from "next";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useLogServerURL } from "../../../hooks/useLogServerURL";
import { poolIdsQuery } from "../../../functions/logServerQueries";
import CreateLendingPool from "../../../components/lender/create-lending-pool";
import ChangeAddress from "../../../components/lender/change-address";

const LendingPools = () => {
  const logServerUrl = useLogServerURL();
  const { id: lenderId } = useParams<{ id: string }>() || { id: "" };
  const {
    data: poolIdsData,
    error: poolIdsError,
    refetch: refreshPoolIds,
  } = useQuery(poolIdsQuery({logServerUrl, lenderId}));
  return (
    poolIdsError ? <p>Error fetching pool Ids for {lenderId}: {poolIdsError.message}</p> :
    !poolIdsData ? <p>fetching pool ids...</p> :
    <>
      {poolIdsData.poolIds.length &&
        <section>
          <h2>Your Lending Pools</h2>
          <p>TODO lending pools for lender {lenderId} are: {poolIdsData.poolIds.join()}</p>
        </section>}
      <CreateLendingPool />
      <section>
        <h2>Transfer Lender Id {lenderId}</h2>
        <ChangeAddress />
      </section>
    </>
  );
};

const Page: NextPage = () => {
  // include <CreateLendingPool /> iff account is connected and is the address for the current lenderId
  return (
    <>
    <LendingPools />
    </>
  );
};

export default Page;
