import { formatEther, parseEther } from "viem";
import { Input } from "./input";
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
  const {
    data: rplAllowance,
    error: rplAllowanceError,
  } = useReadContract({
    abi: rplABI,
    address: rplAddress,
    functionName: "allowance",
    args: [address as `0x${string}`, rocketLendAddress],
    query: { enabled: !!address }
  });
  return (
    typeof rplAllowance == 'bigint' ?
      <p>RPL Allowance to Rocket Lend: {formatEther(rplAllowance)} RPL</p>
    : rplAllowanceError ?
      <p>ERROR fetching RPL allowance: {rplAllowanceError.message}</p>
    : <p>querying RPL allowance...</p>
  );
};

export const ApproveRPLForm = () => {
  const {
    data: rplAddress,
    error: rplAddressError,
  } = useRocketAddress("rocketTokenRPL");
  const rocketLendAddress = useRocketLendAddress();
  const [amount, setAmount] = useState<string>("1000");
  return (<>
    <Input
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
    />
    {rplAddress ?
     <TransactionSubmitter
      buttonText={`Approve Rocket Lend contract spending up to ${amount} RPL`}
      address={rplAddress}
      abi={rplABI}
      functionName="approve"
      args={[rocketLendAddress, parseEther(amount)]}
     />
     : <p>Error fetching RPL address: {rplAddressError?.message}</p>}
  </>);
};
