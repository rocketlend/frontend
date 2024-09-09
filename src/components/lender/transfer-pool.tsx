import { useState } from "react";
import { useParams } from "next/navigation";
import {
  Description,
  Field,
  FieldGroup,
  Fieldset,
  Label,
  Legend,
} from "../fieldset";
import { Text } from "../text";
import { Input } from "../input";
import { Checkbox, CheckboxField } from "../checkbox";
import { useAccount } from "wagmi";
import { TransactionSubmitter } from "../TransactionSubmitter";
import { useRocketLendAddress } from "../../hooks/useRocketLendAddress";
import rocketLendABI from "../../rocketlend.abi";

// TODO styles, maybe descriptions/tooltips
const ChangeAddress = () => {
  const [requireConfirmation, setRequireConfirmation] = useState(true);
  const [newAddress, setNewAddress] = useState(''); // TODO: ENS names for address input
  const rocketLendAddress = useRocketLendAddress();
  const { id: lenderId } = useParams<{ id: string }>() || { id: "" };

  return (
    <form
      className="sm:flex sm:flex-col gap-8 space-y-8 rounded-xl p-6 sm:mx-auto sm:max-w-prose border border-zinc-800 bg-zinc-800/40"
    >
      <Fieldset>
        <Legend>
          <h2 className="text-xl">Change lender address</h2>
        </Legend>
        <Text className="italic">
          You can transfer your lender ID to another address. All lending pools and claims on funds will then belong to the new address.
        </Text>
        <FieldGroup>
          {/* TODO fix spacing/alignment */}
          <div className="grid grid-cols-1 gap-8 sm:gap-4">
            <Field>
              <Label>New address</Label>
              <Input value={newAddress} name="new_address" onChange={(e) => setNewAddress(e.target.value)} />
            </Field>
            <CheckboxField>
              <Label>Require confirmation by the new address</Label>
              <Checkbox
                aria-label="Require confirmation"
                name="require_confirmation"
                checked={requireConfirmation}
                onChange={setRequireConfirmation}
              />
            </CheckboxField>
          </div>
        </FieldGroup>
      </Fieldset>
      <TransactionSubmitter
       buttonText={`Transfer Lender Id ${lenderId}`}
       address={rocketLendAddress}
       abi={rocketLendABI}
       functionName="changeLenderAddress"
       args={[BigInt(lenderId), newAddress, !requireConfirmation]}
      />
    </form>
  );
};

export default ChangeAddress;
