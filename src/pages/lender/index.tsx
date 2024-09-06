import type { NextPage } from "next";
import { useState, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import {
  useReadContract,
  useReadContracts,
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";
import { formatEther } from "viem";
import type { TransactionReceipt } from "viem";
import rocketLendABI from "../../rocketlend.abi";
import rplABI from "../../rocketTokenRPL.abi";
import { lenderIdsQuery, pendingLenderIdsQuery } from "../../functions/lenderIdsQuery";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";
import { TransactionSubmitter } from "../../components/TransactionSubmitter";
import { IfConnected } from "../../components/IfConnected";
import { useLogServerURL } from "../../hooks/useLogServerURL";
import { useRocketAddress } from "../../hooks/useRocketAddress";
import { useRocketLendAddress } from "../../hooks/useRocketLendAddress";
import ChangeAddress from "../../components/lender/change-address";
import CreateLendingPool from "../../components/lender/create-lending-pool";

const NULL_ADDRESS = '0x'.padEnd(42, '0');

const RPLBalance = ({ accountAddress }: { accountAddress: `0x${string}` }) => {
  const {
    data: rplAddress,
    error: rplAddressError,
    fetchStatus: rplAddressStatus,
  } = useRocketAddress("rocketTokenRPL");
  const {
    data: rplBalance,
    error: rplBalanceError,
    fetchStatus: rplBalanceStatus,
  } = useReadContract({
    abi: rplABI,
    address: rplAddress,
    functionName: "balanceOf",
    args: [accountAddress],
  });
  return (
      typeof rplBalance == 'bigint' ?
      <p>Balance: {formatEther(rplBalance)} RPL</p> :
      <ul>
        <li>ERROR GETTING RPL BALANCE, DEBUG INFO BELOW</li>
        <li>
          Addresses {rplAddress}; {accountAddress}
        </li>
        <li>
          Address Types {typeof rplAddress}; {typeof accountAddress}
        </li>
        <li>Balance Type: {typeof rplBalance}</li>
        <li>
          Statuses: {rplAddressStatus} {rplBalanceStatus}
        </li>
        <li>Address Error: {rplAddressError?.toString() || "none"}</li>
        <li>Balance Error: {rplBalanceError?.toString() || "none"}</li>
      </ul>
  );
};

type RefetchType = (options?: {
  throwOnError: boolean;
  cancelRefetch: boolean;
}) => Promise<UseQueryResult>;

type RefreshUntilBlockType = { blockNumber?: undefined, needsRefresh?: undefined } | { blockNumber: number, needsRefresh: true };

const ConfirmChangeLenderAddressSection = ({
  pendingLenderIds,
  setRefreshUntilBlock,
} : {
  pendingLenderIds: string[];
  setRefreshUntilBlock: Dispatch<SetStateAction<RefreshUntilBlockType>>;
}) => {
  const rocketLendAddress = useRocketLendAddress();
  // TODO: abstract out onSuccess definition
  const onSuccess = (receipt: TransactionReceipt) => {
    console.log(`Adopt lender transaction success in block ${receipt.blockNumber}`);
    const blockNumber = Number(receipt.blockNumber);
    setRefreshUntilBlock(prev => {
      const {blockNumber: prevBlockNumber} = prev;
      const stale = typeof prevBlockNumber == 'undefined' || prevBlockNumber < blockNumber;
      return stale ? {blockNumber, needsRefresh: true} : prev;
    });
  };
  return !!pendingLenderIds.length && (
    <section>
      <h2>Confirm Transfer of Lender Id</h2>
      {pendingLenderIds.map(
       id => <TransactionSubmitter
                 buttonText={`Adopt Lender Id ${id}`}
                 address={rocketLendAddress}
                 abi={rocketLendABI}
                 functionName="confirmChangeLenderAddress"
                 args={[BigInt(id)]}
                 onSuccess={onSuccess}
              />
      )}
    </section>
  );
};

const RegisterLenderForm = ({
  setRefreshUntilBlock,
  setRefreshPendingUntilBlock,
  pendingLenderIds,
}: {
  setRefreshUntilBlock: Dispatch<SetStateAction<RefreshUntilBlockType>>;
  setRefreshPendingUntilBlock: Dispatch<SetStateAction<RefreshUntilBlockType>>;
  pendingLenderIds: Array<string>;
}) => {
  const address = useRocketLendAddress();
  const onSuccess = (receipt: TransactionReceipt) => {
    console.log(`Register transaction success in block ${receipt.blockNumber}`);
    const blockNumber = Number(receipt.blockNumber);
    setRefreshUntilBlock(prev => {
      const {blockNumber: prevBlockNumber} = prev;
      const stale = typeof prevBlockNumber == 'undefined' || prevBlockNumber < blockNumber;
      return stale ? {blockNumber, needsRefresh: true} : prev;
    });
    // other options:
    // 1. just use the receipt, ignore server;
    // 2. socket connection to server so can push;
    // 3. polling;
    // 4. send the log server a desired block to be above (it hangs until it gets there)
  };
  return (<>
    <ConfirmChangeLenderAddressSection
     setRefreshUntilBlock={setRefreshPendingUntilBlock}
     pendingLenderIds={pendingLenderIds}/>
    <section>
      <h2>Register as a Rocket Lend Lender</h2>
      <TransactionSubmitter
        buttonText="Register New Lender Id"
        address={address}
        abi={rocketLendABI}
        functionName="registerLender"
        onSuccess={onSuccess}
      />
    </section>
  </>);
};

const LenderOverview = ({
  lenderIds,
  pendingLenderIds,
  setRefreshPendingUntilBlock,
}: {
  lenderIds: string[];
  pendingLenderIds: string[];
  setRefreshPendingUntilBlock: Dispatch<SetStateAction<RefreshUntilBlockType>>;
}) => {
  const rocketLendAddress = useRocketLendAddress();
  const {
    data: pendingTransfers,
    error: pendingTransfersError,
    refetch: refetchPendingTransfers
  } = useReadContracts({
    contracts: lenderIds.map(lenderId => ({
      address: rocketLendAddress,
      abi: rocketLendABI,
      functionName: 'pendingLenderAddress',
      args: [BigInt(lenderId)]
    }))
  });
  return (
    <>
      <ConfirmChangeLenderAddressSection
       setRefreshUntilBlock={setRefreshPendingUntilBlock}
       pendingLenderIds={pendingLenderIds}/>
      <section>
        <h2>Your Lending Pools</h2>
        <p>TODO only show this if there are existing pools for this lender</p>
      </section>
      <CreateLendingPool />
      <section>
        <h2>Transfer Lender Id</h2>
        <p>Current Lender Ids: {
          pendingTransfersError ? `Error fetching pending transfers: ${pendingTransfersError.message}` :
          pendingTransfers ?
            lenderIds.map(
              (id, i) => pendingTransfers[i].result == NULL_ADDRESS ?
                         id :
                        `${id} (pending transfer to ${pendingTransfers[i].result})`
            ).join() :
          '...fetching pending transfers'
        }</p>
        <ChangeAddress />
      </section>
    </>
  );
};

const Page: NextPage = () => {
  const logServerUrl = useLogServerURL();
  const { address, status } = useAccount();
  const {
    data: lenderIdsData,
    error: lenderIdsError,
    refetch: refreshLenderIds,
  } = useQuery(lenderIdsQuery({logServerUrl, address}));
  const {
    data: pendingLenderIdsData,
    error: pendingLenderIdsError,
    refetch: refreshPendingLenderIds,
  } = useQuery(pendingLenderIdsQuery({logServerUrl, address}));
  // TODO: add listener to events that calls refreshLenderId on new events
  const [refreshUntilBlock, setRefreshUntilBlock] = useState<RefreshUntilBlockType>({});
  const [refreshPendingUntilBlock, setRefreshPendingUntilBlock] = useState<RefreshUntilBlockType>({});
  const makeRefresher = (
    stateVar: RefreshUntilBlockType,
    setter: Dispatch<SetStateAction<RefreshUntilBlockType>>,
    dataVar: { untilBlock: number } | undefined,
    refresher: RefetchType,
  ) : [() => void, React.DependencyList] => [
    () => {
      if (stateVar.needsRefresh) {
        if (typeof dataVar == 'undefined' ||
            dataVar.untilBlock < stateVar.blockNumber) {
          refresher().then(
            () => setter(
              ({blockNumber}) => typeof blockNumber == 'undefined' ? {} : {blockNumber, needsRefresh: true}
            )
          );
        }
        else
          setter({});
      }
    }, [refresher, dataVar]];
  useEffect(...makeRefresher(refreshUntilBlock, setRefreshUntilBlock, lenderIdsData, refreshLenderIds));
  useEffect(...makeRefresher(refreshPendingUntilBlock, setRefreshPendingUntilBlock, pendingLenderIdsData, refreshPendingLenderIds));
  return (
    <IfConnected accountStatus={status}>
      <RPLBalance accountAddress={address as `0x${string}`} />
      {lenderIdsData?.lenderIds.length ?
        <LenderOverview
           pendingLenderIds={pendingLenderIdsData?.pendingLenderIds || []}
           setRefreshPendingUntilBlock={setRefreshPendingUntilBlock}
           lenderIds={lenderIdsData.lenderIds} /> :
        <RegisterLenderForm
           pendingLenderIds={pendingLenderIdsData?.pendingLenderIds || []}
           setRefreshPendingUntilBlock={setRefreshPendingUntilBlock}
           setRefreshUntilBlock={setRefreshUntilBlock}
        />
        // <LenderOverview lenderIds={['0']} />
      }
    </IfConnected>
  );
};

export default Page;
