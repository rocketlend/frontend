import type { UseQueryResult } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";

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
