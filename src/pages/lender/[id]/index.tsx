import type { NextPage } from "next";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useAccount, useReadContract } from "wagmi";
import { useLogServerURL } from "../../../hooks/useLogServerURL";
import { useRocketLendAddress } from "../../../hooks/useRocketLendAddress";
import rocketLendABI from "../../../rocketlend.abi";
import { poolIdsQuery } from "../../../functions/logServerQueries";
import CreateLendingPool from "../../../components/lender/create-lending-pool";
import ChangeAddress from "../../../components/lender/change-address";

const LendingPools = ({ lenderId } : { lenderId: string }) => {
  const logServerUrl = useLogServerURL();
  const {
    data: poolIdsData,
    error: poolIdsError,
    refetch: refreshPoolIds,
  } = useQuery(poolIdsQuery({logServerUrl, lenderId}));
  return (
    poolIdsError ? <p>Error fetching pool Ids for {lenderId}: {poolIdsError.message}</p> :
    !poolIdsData ? <p>fetching pool ids...</p> :
      poolIdsData.poolIds.length ?
      <section>
        <h2>Your Lending Pools</h2>
        <p>TODO lending pools for lender {lenderId} are: {poolIdsData.poolIds.join()}</p>
      </section> : <p>Lender Id {lenderId} does not have any lending pools yet.</p>
  );
};

const Page: NextPage = () => {
  const { id: lenderId } = useParams<{ id: string }>() || { id: "" };
  const { address } = useAccount();
  const rocketLendAddress = useRocketLendAddress();
  const { data: lenderAddress } = useReadContract({
    address: rocketLendAddress,
    abi: rocketLendABI,
    functionName: "lenderAddress",
    args: [BigInt(lenderId)],
  });
  return (
    <>
    <LendingPools lenderId={lenderId} />
    { address == lenderAddress &&
      (<>
        <CreateLendingPool />
        <section>
          <h2>Transfer Lender Id {lenderId}</h2>
          <ChangeAddress />
        </section>
      </>) }
    </>
  );
};

export default Page;
