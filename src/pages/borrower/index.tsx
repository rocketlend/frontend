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
import { Input } from "../../components/input";
import { Field, Label } from "../../components/fieldset";

const JoinAsBorrowerForm = () => {
  const [node, setNode] = useState<string>('');
  return (
    <>
      <Field>
        <Label>Node address</Label>
        <Input
          value={node}
          onChange={(e) => setNode(e.target.value)}
        ></Input>
      </Field>
      <p>TODO: transaction submitter for joinAsBorrower(node)</p>
    </>
  );
};

const BorrowerOverview = ({ nodes } : { nodes: string[] }) => {
  const [selectedNode, setSelectedNode] = useState(nodes[0]);
  return (
    <>
    <label>Node<select value={selectedNode} onChange={(e) => setSelectedNode(e.target.value)}>
      {nodes.map(node => <option value={node}>{node}</option>) /*TODO: ENS*/}
    </select></label>
    <p>TODO: borrower info for node {selectedNode}</p>
    <section>
      <h2>Join Rocket Lend as another node</h2>
      <JoinAsBorrowerForm />
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
  return (
    <IfConnected accountStatus={status}>
    { nodesError ? <p>Error fetching nodes for connected address: {nodesError.message}</p> :
      nodesData?.nodes.length ?
      <BorrowerOverview nodes={nodesData.nodes} /> :
      <section>
        <h2>Not in Rocket Lend: Join with your node</h2>
        <JoinAsBorrowerForm />
      </section>
    }
    </IfConnected>
  );
};

export default Page;
