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

export const ChangeAllowanceForm = () => {
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

export const ChangeAllowedBorrowersForm = () => {
  return <form>TODO</form>;
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
    <Fieldset>
      {actions.map(({ FormComponent, title }, idx) => {
        return (
          <div key={idx}>
            <SwitchGroup>
              <Field>
                <Switch onChange={() => handleShowFormSection(idx)} />
                <Label>{title}</Label>
              </Field>
            </SwitchGroup>
            <div className={visible[idx] || "sr-only"}>
              <FormComponent />
            </div>
          </div>
        );
      })}
      <Button>Submit</Button>
    </Fieldset>
  );
};
