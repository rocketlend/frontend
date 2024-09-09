import type { NextPage } from "next";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useAccount, useReadContract } from "wagmi";
import { useLogServerURL } from "../../../hooks/useLogServerURL";
import { useRocketLendAddress } from "../../../hooks/useRocketLendAddress";
import rocketLendABI from "../../../rocketlend.abi";
import { poolIdsQuery } from "../../../functions/logServerQueries";
import CreateLendingPool from "../../../components/lender/create-lending-pool";

const LendingPools = ({ address } : { address: string }) => {
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
  const { address: lenderAddress } = useParams<{ address: string }>() || { id: "" };
  const { address } = useAccount();
  const rocketLendAddress = useRocketLendAddress();
  return (
    <>
    <LendingPools address={lenderAddress} />
    { address == lenderAddress && <CreateLendingPool /> }
    </>
  );
};

export default Page;
