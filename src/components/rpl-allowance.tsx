import { formatEther, parseEther } from "viem";
import { Input } from "./input";
import { Switch } from "./switch";
import { useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import { useRocketAddress } from "../hooks/useRocketAddress";
import { useRocketLendAddress } from "../hooks/useRocketLendAddress";
import rplABI from "../rocketTokenRPL.abi";
import { TransactionSubmitter } from "./TransactionSubmitter";

export const RPLAllowance = () => {
  const {
    data: rplAddress,
    error: rplAddressError,
  } = useRocketAddress("rocketTokenRPL");
  const rocketLendAddress = useRocketLendAddress();
  const { address } = useAccount();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("1000");
  const {
    data: rplAllowance,
    error: rplAllowanceError,
    refetch: refreshAllowance,
  } = useReadContract({
    abi: rplABI,
    address: rplAddress,
    functionName: "allowance",
    args: [address as `0x${string}`, rocketLendAddress],
    query: { enabled: !!address }
  });
  return (
    typeof rplAllowance == 'bigint' ?
      <>
      <p>Approved for Rocket Lend: {formatEther(rplAllowance)} RPL. ⚙️
      <Switch checked={showForm} onChange={setShowForm} /></p>
      {showForm && rplAddress && (<>
      <Input value={amount} onChange={(e) => setAmount(e.target.value)} />
      <TransactionSubmitter
       buttonText={`Let Rocket Lend contract spend up to ${amount} RPL`}
       address={rplAddress}
       abi={rplABI}
       functionName="approve"
       args={[rocketLendAddress, parseEther(amount)]}
       onSuccess={(receipt) => refreshAllowance({})}
      /></>)}
      </>
    : rplAllowanceError ?
      <p>ERROR fetching RPL allowance: {rplAllowanceError.message}</p>
    : rplAddressError ?
      <p>ERROR fetching RPL address: {rplAddressError.message}</p>
    : <p>querying RPL allowance...</p>
  );
};
