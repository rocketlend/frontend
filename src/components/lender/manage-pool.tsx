// NOTE: the organization of these components and where they live may change, just sketching them here for now
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
import { Dialog, DialogActions, DialogBody } from "../dialog";
import {
  DescriptionList,
  DescriptionDetails,
  DescriptionTerm,
} from "../description-list";
import { Input } from "../input";
import { Button } from "../button";
import {
  PlusCircleIcon,
  MinusCircleIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/outline";
import { NULL_ADDRESS } from "../../constants";

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
      <div className="bg-zinc-800/50 p-4 sm:p-5 md:p-6 space-y-6 rounded-lg">
        <p className="text-xs sm:text-sm font-medium leading-6 text-zinc-400">
          {name}
        </p>
        <p className="mt-2 flex items-baseline gap-x-2">
          <span className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-white">
            {value}
          </span>
        </p>
        <Button outline onClick={() => setIsOpen(true)}>
          {action}
        </Button>
      </div>
      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogBody className="flex justify-center">
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
      <div className="grid grid-cols-2 gap-2 md:gap-4 md:grid-cols-4">
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
    <div className="px-4 py-6 sm:gap-4 sm:px-0 border-t border-white/10">
      <DescriptionTerm>{name}</DescriptionTerm>
      <DescriptionDetails>{value}</DescriptionDetails>
    </div>
  );
};

// TODO refactor
export const PoolOverview = () => {
  return (
    <div className="max-w-screen-md mx-auto bg-zinc-800/20 p-12 rounded-xl border border-zinc-800/50">
      <div className="px-4 sm:px-0">
        <h2 className="mt-1 max-w-2xl text-lg leading-6 text-zinc-400">
          Pool parameters and current state
        </h2>
      </div>
      <div className="mt-6">
        <DescriptionList className="divide-y-reverse divide-white/10">
          <PoolOverviewItem
            name="Interest Rate:"
            value={`${mockPoolParams.interestRate}%`}
          />
          <PoolOverviewItem
            name="Accounted Until:"
            value={mockPoolParams.endTime}
          />
          <PoolOverviewItem
            name="Available RPL:"
            value={mockPoolState.available}
          />
          <PoolOverviewItem
            name="Borrowed RPL:"
            value={mockPoolState.borrowed}
          />
          <PoolOverviewItem
            name="Transfer Allowance:"
            value={`${mockPoolState.allowance} RPL`}
          />
          <PoolOverviewItem
            name="Interest Accrued:"
            value={mockPoolState.interestPaid}
          />
          <PoolOverviewItem
            name="ETH Balance:"
            value={mockPoolState.reclaimed}
          />

          <div className="px-4 py-6 sm:px-0 border-t border-white/10">
            <DescriptionTerm className="font-medium leading-6 text-white">
              Current Borrowers:
            </DescriptionTerm>
            <DescriptionDetails className="mt-2 text-white sm:col-span-full sm:mt-0">
              <BorrowerList borrowers={mockBorrowersState.borrowers} />
            </DescriptionDetails>
          </div>

          <div className="px-4 py-6 col-span-full sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-t border-white/10">
            <DescriptionTerm className="font-medium leading-6 text-white">
              Allowed Borrowers:
            </DescriptionTerm>
            <DescriptionDetails className="mt-2 text-white sm:col-span-2 sm:mt-0">
              {mockBorrowersState.allowedToBorrow[0] === NULL_ADDRESS ? (
                <span className="text-zinc-400 py-4 leading-6">
                  All borrowers are currently allowed for this pool.
                </span>
              ) : (
                <BorrowerList borrowers={mockBorrowersState.allowedToBorrow} />
              )}
            </DescriptionDetails>
            <div className="mt-8 sm:col-span-3 place-self-center flex flex-col sm:flex-row gap-6 sm:gap-12 items-center">
              {mockBorrowersState.allowedToBorrow[0] === NULL_ADDRESS ? (
                <Button outline>
                  <Cog8ToothIcon />
                  Change settings
                </Button>
              ) : (
                <>
                  <Button outline>
                    <PlusCircleIcon />
                    Add
                  </Button>
                  <Button outline>
                    <MinusCircleIcon />
                    Remove
                  </Button>
                </>
              )}
            </div>
          </div>
        </DescriptionList>
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
            className="flex items-center justify-between py-4 pl-4 pr-5 leading-6"
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
  return (
    <form>
      <Fieldset>
        <Legend>Supply RPL</Legend>
        {/* TODO display amount available */}
      </Fieldset>
    </form>
  );
};

// probably duplicated in "create lending pool"
export const WithdrawRPLForm = () => {
  return (
    <form>
      <Fieldset>
        <Legend>Withdraw RPL</Legend>
        {/* TODO display amount available */}
        <Field>
          <Label>Amount to withdraw</Label>
          <Input type="number" />
        </Field>
      </Fieldset>
    </form>
  );
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
    <form className="sm:max-w-xs rounded-xl">
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
            <Label>Amount to resupply</Label>
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
    <form className="sm:max-w-xs rounded-xl">
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
  const [newAllowance, setNewAllowance] = useState(0); // TODO this should initially be the current allowance amount

  return (
    <form>
      <Fieldset>
        <Legend>Change transfer allowance</Legend>
        {/* TODO display amount available */}
        <Field>
          <Label>New allowance</Label>
          <Input
            type="number"
            name="new_allowance"
            value={newAllowance}
            onChange={(e) => setNewAllowance(Number(e.target.value))}
          />
        </Field>
      </Fieldset>
    </form>
  );
};

// (maybe) container for all these interfaces
export const ManagePool = () => {
  return (
    <>
      <PoolStatsQuickView />
      <PoolOverview />
    </>
  );
};
