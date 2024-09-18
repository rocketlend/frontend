import type { NextPage } from "next";
import { formatEther } from "viem";
import { useParams } from "next/navigation";
import { useAccount, useReadContracts } from "wagmi";
import { useRocketLendAddress } from "../../../hooks/useRocketLendAddress";
import rocketLendABI from "../../../rocketlend.abi";
import { DateTime } from "luxon";

const Page: NextPage = () => {
  const { address } = useAccount();
  const { poolId: poolIdParam } = useParams<{ poolId: string }>() || { poolId: "" };
  const poolId: bigint = BigInt(poolIdParam);
  const rocketLendAddress = useRocketLendAddress();
  const rocketLendBase = {
    address: rocketLendAddress,
    abi: rocketLendABI,
  };
  const { data: results, status, error } = useReadContracts({
    contracts: [
      {functionName: "params", args: [poolId], ...rocketLendBase},
      {functionName: "pools", args: [poolId], ...rocketLendBase},
    ]
  });
  const { result: params } = results?.[0] || {};
  const { result: state } = results?.[1] || {};
  return (params && state ? (<section>
    <h2>Lending Pool {poolId.toString()}</h2>
    <ul>
    <li>Interest Rate: {params.interestRate}%</li>{/*TODO: show effective doubled rate when overdue*/}
    <li>End Time: {DateTime.fromSeconds(Number(params.endTime)).toLocaleString(DateTime.DATETIME_FULL)}</li>
    <li>Available: {formatEther(state.available)} RPL</li>
    <li>Borrowed: {formatEther(state.borrowed)} RPL</li>
    {!!state.reclaimed && <li>Reclaimed: {formatEther(state.reclaimed)} ETH</li>}
    {!!state.allowance && <li>Debt Transfer Allowance: {formatEther(state.allowance)} RPL</li>}
    </ul>
  </section>) : error ? <p>Error: {error.message}</p> : <p>fetching data... status: {status}</p>);
};

export default Page;
