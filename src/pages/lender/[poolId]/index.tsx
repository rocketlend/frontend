import type { NextPage } from "next";
import { useParams } from "next/navigation";
import { useAccount } from "wagmi";

const Page: NextPage = () => {
  const { address } = useAccount();
  const { poolId: poolIdParam } = useParams<{ poolId: string }>() || { poolId: "" };
  const poolId: bigint = BigInt(poolIdParam);
  return (<>
    <p>TODO lender view + operations for lender {address} and pool {poolId.toString()}</p>
  </>);
};

export default Page;
