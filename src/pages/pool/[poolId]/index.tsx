import type { NextPage } from "next";
import { formatEther, parseEther } from "viem";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useAccount, useReadContracts } from "wagmi";
import { useRocketLendAddress } from "../../../hooks/useRocketLendAddress";
import rocketLendABI from "../../../rocketlend.abi";
import { DateTime } from "luxon";
import { TransactionSubmitter } from "../../../components/TransactionSubmitter";
import { Switch } from "../../../components/switch";
import { Input } from "../../../components/input";
import { Field, Label } from "../../../components/fieldset";
import { RPLAllowance } from "../../../components/rpl-allowance";
import { RPLBalance } from "../../../components/rpl-balance";

const safeParseEther = (s: string) => {
  try { return parseEther(s); }
  catch { return BigInt(0); }
};

const Page: NextPage = () => {
  const { address } = useAccount();
  const { poolId: poolIdParam } = useParams<{ poolId: string }>() || { poolId: "" };
  const poolId: bigint = BigInt(poolIdParam);
  const rocketLendAddress = useRocketLendAddress();
  const [supplyOpen, setSupplyOpen] = useState<boolean>(false);
  const [targetAmount, setTargetAmount] = useState<string>("");
  const rocketLendBase = {
    address: rocketLendAddress,
    abi: rocketLendABI,
  };
  const { data: results, status, error, refetch } = useReadContracts({
    contracts: [
      {functionName: "params", args: [poolId], ...rocketLendBase},
      {functionName: "pools", args: [poolId], ...rocketLendBase},
    ]
  });
  const { result: params } = results?.[0] || {};
  const { result: state } = results?.[1] || { available: BigInt(0) };
  const available = state?.available || BigInt(0);
  const [changeVerb, changePreposition, changeAmount] = safeParseEther(targetAmount) < available ?
    ['Withdraw', 'from', formatEther(available - safeParseEther(targetAmount))] :
    ['Supply', 'to', formatEther(safeParseEther(targetAmount) - available)];
  return (params && state ? (<>
    <section>
    <RPLBalance />
    <RPLAllowance />
    </section>
    <section>
    <h2>Lending Pool {poolId.toString()}</h2>
    <ul>
    <li>Interest Rate: {params.interestRate}%</li>{/*TODO: show effective doubled rate when overdue*/}
    <li>End Time: {DateTime.fromSeconds(Number(params.endTime)).toLocaleString(DateTime.DATETIME_FULL)}</li>
    <li>Available: {formatEther(available)} RPL
    <Switch checked={supplyOpen} onChange={setSupplyOpen} />
    {supplyOpen && (<>
      <Field>
        <Label>New Amount</Label>
        <Input value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} />
      </Field>
      <TransactionSubmitter
        buttonText={`${changeVerb} ${changeAmount} RPL ${changePreposition} this pool`}
        address={rocketLendAddress}
        abi={rocketLendABI}
        functionName="changePoolRPL"
        args={[poolId, safeParseEther(targetAmount)]}
        onSuccess={(receipt) => refetch({})} />
      </>)}
    </li>
    <li>Borrowed: {formatEther(state.borrowed)} RPL</li>
    {!!state.reclaimed && <li>Reclaimed: {formatEther(state.reclaimed)} ETH</li>}
    {!!state.allowance && <li>Debt Transfer Allowance: {formatEther(state.allowance)} RPL</li>}
    </ul>
    </section>
  </>) : error ? <p>Error: {error.message}</p> : <p>fetching data... status: {status}</p>);
};

export default Page;
