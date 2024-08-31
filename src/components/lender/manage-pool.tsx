// NOTE: the organization of these components and where they live may change, just sketching them here for now
// and some of them may eventually be modals/pop-ups

import { useState } from "react";
import {
  mockPoolState,
  mockPoolParams,
  mockBorrowersState,
} from "../../../mocks/poolMocks";
import {
  Fieldset,
  FieldGroup,
  Field,
  Label,
  Legend,
  Description,
  ErrorMessage,
} from "../fieldset";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "../dialog";
import { Text } from "../text";
import { Input } from "../input";
import { Button } from "../button";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";

const QuickViewCard = ({
  name,
  value,
  action,
  FormComponent,
}: {
  name: string;
  value: number;
  action: string;
  FormComponent: () => JSX.Element;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="bg-zinc-800/50 px-4 py-6 sm:px-6 lg:px-8 space-y-6">
        <p className="text-sm font-medium leading-6 text-zinc-400">{name}</p>
        <p className="mt-2 flex items-baseline gap-x-2">
          <span className="text-4xl font-semibold tracking-tight text-white">
            {value}
          </span>
        </p>
        <Button outline onClick={() => setIsOpen(true)}>
          {action}
        </Button>
      </div>
      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogBody>
          <FormComponent />
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsOpen(false)}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const PoolStatsQuickView = () => {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4">
        <QuickViewCard
          name={"Available RPL"}
          value={mockPoolState.available}
          action={"Withdraw"}
          FormComponent={WithdrawRPLForm}
        />
        <QuickViewCard
          name={"Borrowed RPL"}
          value={mockPoolState.borrowed}
          action={"Supply"}
          FormComponent={SupplyRPLForm}
        />
        <QuickViewCard
          name={"Transfer Allowance"}
          value={mockPoolState.allowance}
          action={"Change"}
          FormComponent={ChangeAllowanceForm}
        />
        <QuickViewCard
          name={"Interest Accrued"}
          value={mockPoolState.interestPaid}
          action={"Withdraw"}
          FormComponent={WithdrawInterestForm}
        />
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
// TODO refactor
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
              <BorrowerList borrowers={mockBorrowersState.borrowers} />
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-white">
              Allowed Borrowers
            </dt>
            <dd className="mt-2 text-sm text-white sm:col-span-2 sm:mt-0">
              {mockBorrowersState.allowedToBorrow.length === 0 ? (
                <span className="text-zinc-400 py-4 pl-4 pr-5 text-sm leading-6">
                  All borrowers are currently allowed for this pool.
                </span>
              ) : (
                <BorrowerList borrowers={mockBorrowersState.allowedToBorrow} />
              )}
            </dd>
            <div className="mt-8 sm:col-span-3 place-self-center flex flex-col sm:flex-row gap-6 sm:gap-12 items-center">
              <Button outline>
                <PlusCircleIcon />
                Add
              </Button>
              <Button outline>
                <MinusCircleIcon />
                Remove
              </Button>
            </div>
          </div>
        </dl>
      </div>
    </div>
  );
};

export const BorrowerList = ({ borrowers }: { borrowers: string[] }) => {
  return (
    <ul
      role="list"
      className="divide-y divide-white/10 rounded-md border border-white/20"
    >
      {borrowers.map((borrower, idx) => {
        return (
          <li
            key={idx}
            className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
          >
            <div className="flex w-0 flex-1 items-center">
              <div className="ml-4 flex min-w-0 flex-1 gap-2">
                <span className="truncate font-medium">{borrower}</span>
              </div>
            </div>
            <div className="ml-4 flex-shrink-0"></div>
          </li>
        );
      })}
    </ul>
  );
};

// probably duplicated in "create lending pool"
export const SupplyRPLForm = () => {
  return <></>;
};

// probably duplicated in "create lending pool"
export const WithdrawRPLForm = () => {
  return <></>;
};

// TODO indicate current relevant pool info, probably
export const WithdrawInterestForm = () => {
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [resupplyAmount, setResupplyAmount] = useState(0);

  // TODO input validation
  const handleChangeWithdrawalAmount = (value: string) => {
    setWithdrawalAmount(Number(value));
  };

  // TODO input validation
  // TODO submit button (will add after taking a closer look at TransactionSubmitter)
  const handleChangeResupplyAmount = (value: string) => {
    setResupplyAmount(Number(value));
  };

  return (
    <form className="sm:max-w-xs rounded-xl p-6 border border-zinc-800 bg-zinc-800/40">
      <Fieldset>
        <Legend>Withdraw RPL interest</Legend>
        {/* TODO display amount available */}
        <FieldGroup>
          <Field>
            <Label>Total amount to withdraw</Label>
            <Input
              type="number"
              name="withdrawal_amount"
              value={withdrawalAmount || ""}
              onChange={(e) => handleChangeWithdrawalAmount(e.target.value)}
            />
          </Field>
          <Field>
            <Label>Resupply amount</Label>
            <Description className="font-thin">
              Of the total withdrawal amount above, indicate here how much you'd
              like to resupply to the pool.
            </Description>
            <Input
              type="number"
              name="resupply_amount"
              value={resupplyAmount || ""}
              onChange={(e) => handleChangeResupplyAmount(e.target.value)}
            />
          </Field>
        </FieldGroup>
      </Fieldset>
    </form>
  );
};

// TODO submit button (will add after taking a closer look at TransactionSubmitter)
export const WithdrawETHForm = () => {
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);

  // TODO input validation
  const handleChangeWithdrawalAmount = (value: string) => {
    setWithdrawalAmount(Number(value));
  };

  return (
    <form className="sm:max-w-xs rounded-xl p-6 border border-zinc-800 bg-zinc-800/40">
      <Fieldset>
        <Legend>Withdraw ETH</Legend>
        {/* TODO display amount available */}
        <Field>
          <Label>Amount to withdraw</Label>
          <Input
            type="number"
            name="withdrawal_amount"
            value={withdrawalAmount}
            onChange={(e) => handleChangeWithdrawalAmount(e.target.value)}
          />
        </Field>
      </Fieldset>
    </form>
  );
};

const ChangeAllowanceForm = () => {
  return <></>;
};

// (maybe) container for all these interfaces
export const ManagePool = () => {};
