import type { UseQueryResult } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import type { TransactionReceipt } from "viem";

export type RefetchType = (options?: {
  throwOnError: boolean;
  cancelRefetch: boolean;
}) => Promise<UseQueryResult>;

export type RefreshUntilBlockType = { blockNumber?: undefined, needsRefresh?: undefined } | { blockNumber: number, needsRefresh: true };

export const makeRefresher = (
  stateVar: RefreshUntilBlockType,
  setter: Dispatch<SetStateAction<RefreshUntilBlockType>>,
  dataVar: { untilBlock: number } | undefined,
  refresher: RefetchType,
  name: string,
) : [() => void, React.DependencyList] => [
  () => {
    if (stateVar.needsRefresh) {
      console.log(`${name} needs refresh`);
      if (typeof dataVar == 'undefined' ||
          dataVar.untilBlock < stateVar.blockNumber) {
        console.log(`${name} calling refresher`);
        refresher().then(
          () => setter(
            ({blockNumber}) => typeof blockNumber == 'undefined' ? {} : {blockNumber, needsRefresh: true}
          )
        );
      }
      else {
        console.log(`${name} untilBlock >= state`);
        setter({});
      }
    }
  }, [stateVar, dataVar, refresher]];

export const makeOnTransactionSuccess = (
  setter: Dispatch<SetStateAction<RefreshUntilBlockType>>,
  name: string
) => (receipt: TransactionReceipt) => {
  console.log(`${name} transaction success in block ${receipt.blockNumber}`);
  const blockNumber = Number(receipt.blockNumber);
  setter(prev => {
    const {blockNumber: prevBlockNumber} = prev;
    const stale = typeof prevBlockNumber == 'undefined' || prevBlockNumber < blockNumber;
    return stale ? {blockNumber, needsRefresh: true} : prev;
  });
  // options we might have done instead of this approach to refreshing:
  // 1. just use the receipt, ignore server;
  // 2. socket connection to server so can push;
  // 3. polling;
  // 4. send the log server a desired block to be above (it hangs until it gets there)
};
