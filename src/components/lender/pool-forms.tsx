import { useState } from "react";
import {
  Fieldset,
  FieldGroup,
  Field,
  Legend,
  Label,
  Description,
} from "../fieldset";
import { Input } from "../input";
import { Button } from "../button";
import { Switch, SwitchGroup } from "../switch";

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
      <Fieldset>
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
  );
};

// probably duplicated in "create lending pool"
export const SupplyRPLForm = () => {
  return (
      <Fieldset>
        TODO
        {/* TODO display amount available */}
      </Fieldset>
  );
};

// probably duplicated in "create lending pool"
export const WithdrawRPLForm = () => {
  return (
      <Fieldset>
        {/* TODO display amount available */}
        <Field>
          <Label>Amount to withdraw</Label>
          <Input type="number" />
        </Field>
      </Fieldset>
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
      <Fieldset>
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
  );
};

export const ChangeAllowanceForm = () => {
  const [newAllowance, setNewAllowance] = useState(0); // TODO this should initially be the current allowance amount

  return (
      <Fieldset>
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
  );
};

export const ChangeAllowedBorrowersForm = () => {
  return (
    <Fieldset>
      TODO
    </Fieldset>
  )
};

const actions = [
  { FormComponent: WithdrawRPLForm, title: "Withdraw RPL" },
  { FormComponent: SupplyRPLForm, title: "Supply RPL" },
  { FormComponent: WithdrawInterestForm, title: "Withdraw interest" },
  { FormComponent: ChangeAllowanceForm, title: "Change transfer allowance" },
  {
    FormComponent: ChangeAllowedBorrowersForm,
    title: "Change allowed borrowers list",
  },
];

export const EditPoolForm = () => {
  const [visible, setVisible] = useState(Array(actions.length).fill(false));

  const handleShowFormSection = (idx: number) => {
    const newVisible = [...visible];
    newVisible[idx] = !newVisible[idx];
    setVisible(newVisible);
  };

  return (
    <form className="sm:max-w-xs rounded-xl space-y-4">
      {actions.map(({ FormComponent, title }, idx) => {
        return (
          <div key={idx}>
            <SwitchGroup>
              <Field>
                <Switch onChange={() => handleShowFormSection(idx)} />
                <Label className="ml-3">{title}</Label>
              </Field>
            </SwitchGroup>
            <div className={`${visible[idx] || "sr-only"} mb-14 mt-4`}>
              <FormComponent />
            </div>
          </div>
        );
      })}
      <Button>Review & Submit</Button>
    </form>
  );
};
