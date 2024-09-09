import type { NextPage } from "next";
import Link from "next/link";
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
import {
  nodesQuery,
  pendingNodesQuery,
} from "../../functions/logServerQueries";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";
import { TransactionSubmitter } from "../../components/TransactionSubmitter";
import { IfConnected } from "../../components/IfConnected";
import { useLogServerURL } from "../../hooks/useLogServerURL";
import { useRocketLendAddress } from "../../hooks/useRocketLendAddress";
import { makeRefresher, makeOnTransactionSuccess } from "../../functions/logServerRefresher";
import type { RefreshUntilBlockType } from "../../functions/logServerRefresher";
import { Input } from "../../components/input";
import { Field, Label } from "../../components/fieldset";

const JoinAsBorrowerForm = ({
  setRefreshUntilBlock,
} : {
  setRefreshUntilBlock: Dispatch<SetStateAction<RefreshUntilBlockType>>;
}) => {
  const [node, setNode] = useState<string>('');
  const rocketLendAddress = useRocketLendAddress();
  const onSuccess = makeOnTransactionSuccess(setRefreshUntilBlock, "Join borrower");
  return (
    <>
      <Field>
        <Label>Node address</Label>
        <Input
          value={node}
          onChange={(e) => setNode(e.target.value)}
        ></Input>
      </Field>
      <TransactionSubmitter
        buttonText="Join as Borrower"
        address={rocketLendAddress}
        abi={rocketLendABI}
        functionName="joinAsBorrower"
        args={[node]}
        onSuccess={onSuccess}
      />
    </>
  );
};

const BorrowerOverview = ({
  nodes,
  setRefreshUntilBlock
} : {
  nodes: string[];
  setRefreshUntilBlock: Dispatch<SetStateAction<RefreshUntilBlockType>>;
}) => {
  return (
    <>
    <section>
      <h2>Your nodes</h2>
      <ul>
        {nodes.map(node => (<li key={node}><Link href={`borrowers/${node}`}>{node}</Link></li>)) /*TODO: display ENS for the node if there is one*/}
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
  const [refreshUntilBlock, setRefreshUntilBlock] = useState<RefreshUntilBlockType>({});
  useEffect(...makeRefresher(refreshUntilBlock, setRefreshUntilBlock, nodesData, refreshNodes, "nodes"));
  return (
    <IfConnected accountStatus={status}>
    { nodesError ? <p>Error fetching nodes for connected address: {nodesError.message}</p> :
      nodesData?.nodes.length ?
      <BorrowerOverview nodes={nodesData.nodes} setRefreshUntilBlock={setRefreshUntilBlock} /> :
      <section>
        <h2>Not in Rocket Lend: Join with your node</h2>
        <JoinAsBorrowerForm setRefreshUntilBlock={setRefreshUntilBlock} />
      </section>
    }
    </IfConnected>
  );
};

export default Page;
