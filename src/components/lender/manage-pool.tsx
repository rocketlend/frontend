// NOTE: the organization of these components and where they live may change, just sketching them here for now
import { useState } from "react";
import {
  mockPoolState,
  mockPoolParams,
  mockBorrowersState,
} from "../../../mocks/poolMocks";

const QuickViewCard = ({ name, value }: { name: string; value: number }) => {
  return (
    <div className="bg-zinc-800/50 px-4 py-6 sm:px-6 lg:px-8">
      <p className="text-sm font-medium leading-6 text-zinc-400">{name}</p>
      <p className="mt-2 flex items-baseline gap-x-2">
        <span className="text-4xl font-semibold tracking-tight text-white">
          {value}
        </span>
      </p>
    </div>
  );
};

export const PoolStatsQuickView = () => {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4">
        <QuickViewCard name={"Available RPL"} value={mockPoolState.available} />
        <QuickViewCard name={"Borrowed RPL"} value={mockPoolState.borrowed} />
        <QuickViewCard name={"Allowance"} value={mockPoolState.allowance} />
        <QuickViewCard name={"Interest"} value={mockPoolState.interestPaid} />
      </div>
    </div>
  );
};

const PoolOverviewItem = ({
  name,
  value,
}: {
  name: string;
  value: number | string;
}) => {
  return (
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-white">{name}</dt>
      <dd className="mt-1 text-sm leading-6 text-zinc-400 sm:col-span-2 sm:mt-0">
        {value}
      </dd>
    </div>
  );
};

// TODO see if it works to replace with TailwindUI description list components
export const PoolOverview = () => {
  return (
    <div className="max-w-screen-md mx-auto">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-white">
          {"[Pool Identifier]"}
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-zinc-400">
          Pool parameters and current state.
        </p>
      </div>
      <div className="mt-6 border-t border-white/10">
        <dl className="divide-y divide-white/10">
          <PoolOverviewItem
            name="Interest Rate"
            value={`${mockPoolParams.interestRate}%`}
          />
          <PoolOverviewItem
            name="Accounted Until"
            value={mockPoolParams.endTime}
          />
          <PoolOverviewItem
            name="Available RPL"
            value={mockPoolState.available}
          />
          <PoolOverviewItem
            name="Borrowed RPL"
            value={mockPoolState.borrowed}
          />
          <PoolOverviewItem
            name="Transfer Allowance"
            value={`${mockPoolState.allowance} RPL`}
          />
          <PoolOverviewItem
            name="Interest Accrued"
            value={mockPoolState.interestPaid}
          />
          <PoolOverviewItem
            name="ETH Balance"
            value={mockPoolState.reclaimed}
          />

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-white">
              Current Borrowers
            </dt>
            <dd className="mt-2 text-sm text-white sm:col-span-2 sm:mt-0">
              <ul
                role="list"
                className="divide-y divide-white/10 rounded-md border border-white/20"
              >
                {mockBorrowersState.borrowers.map((borrower, idx) => {
                  return (
                    <li
                      key={idx}
                      className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                    >
                      <div className="flex w-0 flex-1 items-center">
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <span className="truncate font-medium">
                            {borrower}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0"></div>
                    </li>
                  );
                })}
              </ul>
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-white">
              Allowed Borrowers
            </dt>
            <dd className="mt-2 text-sm text-white sm:col-span-2 sm:mt-0">
              {mockBorrowersState.allowedToBorrow.length === 0 ? (
                <span className="text-zinc-400 py-4 pl-4 pr-5 text-sm leading-6">All borrowers are currently allowed for this pool.</span>
              ) : (
                mockBorrowersState.allowedToBorrow.map((borrower, idx) => {
                  return (
                    <ul
                      role="list"
                      className="divide-y divide-white/10 rounded-md border border-white/20"
                    >
                      <li
                        key={idx}
                        className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                      >
                        <div className="flex w-0 flex-1 items-center">
                          <div className="ml-4 flex min-w-0 flex-1 gap-2">
                            <span className="truncate font-medium">
                              {borrower}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4 flex-shrink-0"></div>
                      </li>
                    </ul>
                  );
                })
              )}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export const BorrowerList = () => {};

export const SupplyRPLForm = () => {};

export const WithdrawRPLForm = () => {};

export const WithdrawInterestForm = () => {};

export const ManagePool = () => {};
