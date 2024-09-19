import { formatEther, parseEther } from "viem";
import { Input } from "./input";
import { Switch, SwitchField } from "./switch";
import { Label } from "./fieldset";
import { useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import { useRocketAddress } from "../hooks/useRocketAddress";
import { useRocketLendAddress } from "../hooks/useRocketLendAddress";
import rplABI from "../rocketTokenRPL.abi";
import { TransactionSubmitter } from "./TransactionSubmitter";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";

export const RPLAllowance = () => {
  const { data: rplAddress, error: rplAddressError } =
    useRocketAddress("rocketTokenRPL");
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
    query: { enabled: !!address },
  });
  return typeof rplAllowance == "bigint" ? (
    <>
      <p className="flex gap-6">
        Approved for Rocket Lend: {formatEther(rplAllowance)} RPL.
        <SwitchField className="w-min space-x-0 gap-x-1">
          <Label>
            <Cog8ToothIcon className="size-4 text-zinc-400" />
          </Label>
          <Switch checked={showForm} onChange={setShowForm} />
        </SwitchField>
      </p>
      {showForm && rplAddress && (
        <>
          <Input
            className="w-28"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <TransactionSubmitter
            buttonText={`Let Rocket Lend contract spend up to ${amount} RPL`}
            address={rplAddress}
            abi={rplABI}
            functionName="approve"
            args={[rocketLendAddress, parseEther(amount)]}
            onSuccess={(receipt) => refreshAllowance({})}
          />
        </>
      )}
    </>
  ) : rplAllowanceError ? (
    <p>ERROR fetching RPL allowance: {rplAllowanceError.message}</p>
  ) : rplAddressError ? (
    <p>ERROR fetching RPL address: {rplAddressError.message}</p>
  ) : (
    <p>querying RPL allowance...</p>
  );
};
