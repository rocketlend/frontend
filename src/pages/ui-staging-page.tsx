// NOTE: not a real page! temporary for UI development convenience
import { NextPage } from "next";
import { PoolOverview, PoolStatsQuickView, WithdrawInterestForm } from "../components/lender/manage-pool";
import { PoolsEmptyStateUI } from "../components/lender/create-lending-pool";

const Page: NextPage = () => {
  return (
    <div className="space-y-20">
      <PoolStatsQuickView />
      <PoolOverview />
      <PoolsEmptyStateUI />
    </div>
  )
};

export default Page;