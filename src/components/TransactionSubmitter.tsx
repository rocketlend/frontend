import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { Abi } from "abitype";
import { FC, useEffect } from "react";
import { Button } from "./button";
import type { TransactionReceipt } from "viem";

export const TransactionSubmitter: FC<{
  address: `0x${string}`;
  abi: Abi;
  functionName: string;
  args?: Array<any>; // TODO what is the correct type? need to infer via abi?
  buttonText: string;
  onSuccess?: (receipt: TransactionReceipt) => void;
}> = ({ address, abi, functionName, args, buttonText, onSuccess }) => {
  const {
    writeContractAsync,
    data: hash,
    error: errorOnWrite,
    isPending,
    isSuccess: isWritten,
  } = useWriteContract();
  const addRecentTransaction = useAddRecentTransaction();
  const {
    data: receipt,
    error: errorOnWait,
    isLoading,
    isSuccess: isConfirmed,
  } = useWaitForTransactionReceipt({ hash, query: { enabled: isWritten } });
  const handler = () => {
    writeContractAsync({ address, abi, functionName, args }).then((hash) =>
      addRecentTransaction({ hash, description: functionName })
    );
  };
  useEffect(() => {
    if (isConfirmed && onSuccess) onSuccess(receipt);
  }, [isConfirmed, receipt]); // TODO: move to handler?
  // TODO: also log errors in console somehow
  // TODO: should this be a modal instead of div?
  // TODO: allow customisation on when it should be disabled (e.g. allow duplicate or not)
  return (
    <div>
      <Button
        className="cursor-pointer"
        disabled={isPending || (isWritten && !(errorOnWait || isConfirmed))}
        onClick={handler}
      >
        {buttonText}
      </Button>
      {hash && !receipt && <p>Submitted transaction with hash {hash}</p>}
      {receipt && receipt.status == "success" && <p>{hash} confirmed</p>}
      {receipt && isConfirmed && receipt.status != "success" && (
        <p>
          {hash} {receipt.status}
        </p>
      )}
      {errorOnWrite && <p>Error sending transaction: {errorOnWrite.message}</p>}
      {errorOnWait && (
        <p>Error waiting for transaction confirmation: {errorOnWait.message}</p>
      )}
    </div>
  );
};
