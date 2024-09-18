import type { NextPage } from "next";
import Link from "next/link";
import { useState, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import {
  useEnsName,
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
import rocketStorageABI from "../../rocketStorage.abi";
import rocketNodeManagerABI from "../../rocketNodeManager.abi";
import { nodesQuery, pendingNodesQuery } from "../../functions/logServerQueries";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";
import { TransactionSubmitter } from "../../components/TransactionSubmitter";
import { IfConnected } from "../../components/IfConnected";
import { useLogServerURL } from "../../hooks/useLogServerURL";
import { useRocketLendAddress } from "../../hooks/useRocketLendAddress";
import { useRocketAddress } from "../../hooks/useRocketAddress";
import { makeRefresher, makeOnTransactionSuccess } from "../../functions/logServerRefresher";
import type { RefreshUntilBlockType } from "../../functions/logServerRefresher";
import { AddressInput } from "../../components/AddressInput";
import { Field, Label } from "../../components/fieldset";

const JoinAsBorrowerForm = ({
  setRefreshUntilBlock,
} : {
  setRefreshUntilBlock: Dispatch<SetStateAction<RefreshUntilBlockType>>;
}) => {
  const { address } = useAccount();
  const [node, setNode] = useState<`0x${string}`>("0x");
  const rocketLendAddress = useRocketLendAddress();
  const { data: rocketStorageAddress } = useRocketAddress("rocketStorage");
  const { data: rocketNodeManagerAddress } = useRocketAddress("rocketNodeManager");
  // TODO: is it better to useReadContracts?
  const { data: nodeWithdrawalAddress } = useReadContract({
    address: rocketStorageAddress,
    abi: rocketStorageABI,
    functionName: 'getNodeWithdrawalAddress',
    args: [node],
    query: { enabled: node.length == 42 },
  });
  const { data: nodePendingWithdrawalAddress } = useReadContract({
    address: rocketStorageAddress,
    abi: rocketStorageABI,
    functionName: 'getNodePendingWithdrawalAddress',
    args: [node],
    query: { enabled: node.length == 42 },
  });
  const { data: nodeExists } = useReadContract({
    address: rocketNodeManagerAddress,
    abi: rocketNodeManagerABI,
    functionName: 'getNodeExists',
    args: [node],
    query: { enabled: node.length == 42 },
  });
  const onSuccess = makeOnTransactionSuccess(setRefreshUntilBlock, "Join borrower");
  return (
    <>
      <Field>
        <Label>Node address</Label>
        <AddressInput setAddress={setNode}></AddressInput>
      </Field>
      {/*<ul>
        <li>RP DEBUG info</li>
        <li>nodeExists: {nodeExists?.toString() || 'none'}</li>
        <li>nodeWithdrawalAddress: {nodeWithdrawalAddress}</li>
        <li>nodePendingWithdrawalAddress: {nodePendingWithdrawalAddress}</li>
      </ul>*/}
      {node.length == 42 && (
        !nodeExists ? <p>{node} is not a Rocket Pool node address</p> :
        (nodeWithdrawalAddress == address && nodePendingWithdrawalAddress == rocketLendAddress) ||
        (nodeWithdrawalAddress == rocketLendAddress && address == node) ?
          <TransactionSubmitter
            buttonText="Join as Borrower"
            address={rocketLendAddress}
            abi={rocketLendABI}
            functionName="joinAsBorrower"
            args={[node]}
            onSuccess={onSuccess}
          /> :
        nodeWithdrawalAddress == rocketLendAddress ?
          <>
            <p>Warning: the node's withdrawal address is already Rocket Lend. When you join, the borrower address will be the node itself (not the currently connected address).</p>
            <TransactionSubmitter
              buttonText="Join Node as Borrower"
              address={rocketLendAddress}
              abi={rocketLendABI}
              functionName="joinAsBorrower"
              args={[node]}
              onSuccess={onSuccess}
            />
          </>
            :
        nodeWithdrawalAddress == address ?
          <p>Please first set the node's pending withdrawal address to Rocket Lend ({rocketLendAddress}) then you will be able to join</p> :
          <p>You can only join from the node's current withdrawal address ({nodeWithdrawalAddress}); connect as that and try again.</p>
      )}
    </>
  );
};

const LinkToNodeWithEns = ({ node } : { node: `0x${string}` }) => {
  const { data: ensName, error, isPending } = useEnsName({ address: node });
  return (
    <Link href={`borrowers/${node}`}>{
      isPending ? node /* TODO: show some pending indicator? */ :
      error ? node /* TODO: show error message? */ :
      ensName || node /* TODO: in the ensName case, can we have a tooltip or click to reveal the address too? */
    }
    </Link>
  );
};

const PendingNodes = ({
  nodes,
  setRefreshUntilBlock
} : {
  nodes: `0x${string}`[] | undefined;
  setRefreshUntilBlock: Dispatch<SetStateAction<RefreshUntilBlockType>>;
}) => {
  const rocketLendAddress = useRocketLendAddress();
  const onSuccess = makeOnTransactionSuccess(setRefreshUntilBlock, "Adopt node");
  const { address } = useAccount();
  return (
    !!nodes?.length &&
    <section>
      <h2>Confirm Transfer of Node to Borrower Address</h2>
      {nodes.map(
        node => <TransactionSubmitter
                   buttonText={`Adopt node ${node}`}
                   address={rocketLendAddress}
                   abi={rocketLendABI}
                   functionName="confirmChangeBorrowerAddress"
                   args={[node]}
                   onSuccess={onSuccess}
                />
      )}
    </section>
  );
};

const BorrowerOverview = ({
  nodes,
  setRefreshUntilBlock
} : {
  nodes: `0x${string}`[];
  setRefreshUntilBlock: Dispatch<SetStateAction<RefreshUntilBlockType>>;
}) => {
  return (
    <>
    <section>
      <h2>Your nodes</h2>
      <ul>
        {nodes.map(node => (<li key={node}><LinkToNodeWithEns node={node} /></li>))}
      </ul>
    </section>
    <section>
      <h2>Join Rocket Lend as another node</h2>
      <JoinAsBorrowerForm setRefreshUntilBlock={setRefreshUntilBlock} />
    </section>
    </>
  );
};

const Page: NextPage = () => {
  const logServerUrl = useLogServerURL();
  const { address, status } = useAccount();
  const {
    data: nodesData,
    error: nodesError,
    refetch: refreshNodes,
  } = useQuery(nodesQuery({logServerUrl, address}));
  const {
    data: pendingNodesData,
    error: pendingNodesError,
    refetch: refreshPendingNodes,
  } = useQuery(pendingNodesQuery({logServerUrl, address}));
  const [refreshUntilBlock, setRefreshUntilBlock] = useState<RefreshUntilBlockType>({});
  const [refreshPendingUntilBlock, setRefreshPendingUntilBlock] = useState<RefreshUntilBlockType>({});
  useEffect(...makeRefresher(refreshUntilBlock, setRefreshUntilBlock, nodesData, refreshNodes, "nodes"));
  useEffect(...makeRefresher(refreshPendingUntilBlock, setRefreshPendingUntilBlock, pendingNodesData, refreshPendingNodes, "pendingNodes"));
  return (
    <IfConnected accountStatus={status}>
    { nodesError ? <p>Error fetching nodes for connected address: {nodesError.message}</p> :
      <>
      {pendingNodesError ? <p>Error fetching incoming node transfers for connected address: {pendingNodesError.message}</p> :
       <PendingNodes nodes={pendingNodesData?.pendingNodes} setRefreshUntilBlock={setRefreshPendingUntilBlock} /> }
      {
        nodesData?.nodes.length ?
        <BorrowerOverview nodes={nodesData.nodes} setRefreshUntilBlock={setRefreshUntilBlock} /> :
        <section>
          <h2>Not in Rocket Lend: Join with your node</h2>
          <JoinAsBorrowerForm setRefreshUntilBlock={setRefreshUntilBlock} />
        </section>
      }
      </>
    }
    </IfConnected>
  );
};

export default Page;
