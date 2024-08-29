// NOTE: not a real page! temporary for UI development convenience
import { NextPage } from "next";
import { PoolOverview, PoolStatsQuickView } from "../components/lender/manage-pool";

const Page: NextPage = () => {
  return (
    <div className="space-y-20">
      <PoolStatsQuickView />
      <PoolOverview />
    </div>
  )
};

export default Page;