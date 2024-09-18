import type { NextPage } from "next";
import { useParams } from "next/navigation";
import { useAccount, useReadContract } from "wagmi";
import { useRocketLendAddress } from "../../../hooks/useRocketLendAddress";
import { RPLBalance } from "../../../components/rpl-balance";
import rocketLendABI from "../../../rocketlend.abi";
import ChangeAddress from "../../../components/borrower/change-address";
import { NULL_ADDRESS } from "../../../constants";
import { TransactionSubmitter } from "../../../components/TransactionSubmitter";

const Loans = ({ node } : { node: `0x${string}` }) => {
  return (<p>TODO list loans for node {node}</p>);
};

const Page: NextPage = () => {
  const { node: nodeParam } = useParams<{ node: string }>() || { node: "" };
  const node: `0x${string}` = nodeParam.startsWith("0x") ? nodeParam as `0x${string}` : NULL_ADDRESS;
  const { address } = useAccount();
  const rocketLendAddress = useRocketLendAddress();
  const { data: borrowerData, refetch: refreshBorrowerData } = useReadContract({
    address: rocketLendAddress,
    abi: rocketLendABI,
    functionName: "borrowers",
    args: [node],
  });
  const borrowerAddress = borrowerData?.address;
  return (<>
    <Loans node={node} />
    { !!address &&
      <section>
        <h2>Connected account RPL balance</h2>
        <RPLBalance />
      </section>
      /* TODO: show node staked RPL balance too */
    }
    { address === borrowerAddress &&
      (<>
         <section>
           <h2>Borrow RPL</h2>
           <p>TODO list available pools to borrow from and forms to borrow+stake</p>
         </section>
         <section>
           <h2>Change Borrower Address</h2>
           <ChangeAddress />
         </section>
         <TransactionSubmitter
           buttonText="Leave Rocket Lend"
           address={rocketLendAddress}
           abi={rocketLendABI}
           functionName="leaveAsBorrower"
           args={[node]}
           onSuccess={(receipt) => refreshBorrowerData({})}
         />
       </>) }
  </>);
};

export default Page;
