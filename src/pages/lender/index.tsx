import type { NextPage } from "next";
import Link from "next/link";
import { useState, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import {
  useReadContracts,
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";
import rocketLendABI from "../../rocketlend.abi";
import {
  lenderIdsQuery,
  pendingLenderIdsQuery,
} from "../../functions/logServerQueries";
import { useQuery } from "@tanstack/react-query";
import { TransactionSubmitter } from "../../components/TransactionSubmitter";
import { IfConnected } from "../../components/IfConnected";
import { useLogServerURL } from "../../hooks/useLogServerURL";
import { useRocketLendAddress } from "../../hooks/useRocketLendAddress";
import { RPLBalance } from "../../components/RPLBalance";
import { NULL_ADDRESS } from "../../constants";
import { makeRefresher, makeOnTransactionSuccess } from "../../functions/logServerRefresher";
import type { RefreshUntilBlockType } from "../../functions/logServerRefresher";

const ConfirmChangeLenderAddressSection = ({
  pendingLenderIds,
  setRefreshUntilBlock,
} : {
  pendingLenderIds: string[];
  setRefreshUntilBlock: Dispatch<SetStateAction<RefreshUntilBlockType>>;
}) => {
  const rocketLendAddress = useRocketLendAddress();
  const onSuccess = makeOnTransactionSuccess(setRefreshUntilBlock, "Adopt lender id");
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
  const onSuccess = makeOnTransactionSuccess(setRefreshUntilBlock, "Register lender id");
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
        <h2>Your Lender Ids</h2>
        { pendingTransfersError ?
            <p>Error fetching pending transfers: {pendingTransfersError.message}</p> :
          pendingTransfers ?
            lenderIds.map(
              (id, i) => {
                let text = id;
                if (pendingTransfers[i].result != NULL_ADDRESS)
                  text += ` (pending transfer to ${pendingTransfers[i].result})`;
                return<Link key={id} href={`lender/${id}`}>{text}</Link>
              }
            ) :
          <p>...fetching pending transfers</p>
        }
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
  useEffect(...makeRefresher(refreshUntilBlock, setRefreshUntilBlock, lenderIdsData, refreshLenderIds, "lenderIds"));
  useEffect(...makeRefresher(refreshPendingUntilBlock, setRefreshPendingUntilBlock, pendingLenderIdsData, refreshPendingLenderIds, "pendingLenderIds"));
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
        // <LenderOverview
        //   pendingLenderIds={[]}
        //   setRefreshPendingUntilBlock={setRefreshPendingUntilBlock}
        //   lenderIds={['0']}
        // />
      }
    </IfConnected>
  );
};

export default Page;
