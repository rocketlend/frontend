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
  const { node } = useParams<{ node: string }>() || { node: "" }; // TODO: ENS for this address too

  return (
    <form
      className="sm:flex sm:flex-col gap-8 space-y-8 rounded-xl p-6 sm:mx-auto sm:max-w-prose border border-zinc-800 bg-zinc-800/40"
    >
      <Fieldset>
        <Legend>
          <h2 className="text-xl">Change borrower address</h2>
        </Legend>
        <Text className="italic">
          You can change the borrower address for your node to another address. All responsibilities for loans on that node and access to withdrawn funds will then belong to the new address.
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
       buttonText={`Transfer borrower address for node ${node}`}
       address={rocketLendAddress}
       abi={rocketLendABI}
       functionName="changeBorrowerAddress"
       args={[node, newAddress, !requireConfirmation]}
      />
    </form>
  );
};

export default ChangeAddress;
