// NOTE: not a real page! temporary for UI development convenience
import { NextPage } from "next";
import { EditPoolForm } from "../components/lender/pool-forms";
import { ManagePool } from "../components/lender/manage-pool";
import { PoolsEmptyStateUI } from "../components/lender/create-lending-pool";

const Page: NextPage = () => {
  return (
    <div className="space-y-20">
      <h1>{"[Pool identifier goes here]"}</h1>
      <ManagePool />
      <EditPoolForm />
      <PoolsEmptyStateUI />
    </div>
  )
};

export default Page;