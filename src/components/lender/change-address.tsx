import { useState } from "react";
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
import { lenderIdsQuery } from "../../functions/lenderIdsQuery";
import { useQuery } from "@tanstack/react-query";
import { useLogServerURL } from "../../hooks/useLogServerURL";

// TODO styles, maybe descriptions/tooltips
const ChangeAddress = () => {
  const [requireConfirmation, setRequireConfirmation] = useState(true);
  const [newAddress, setNewAddress] = useState('');
  const rocketLendAddress = useRocketLendAddress();
  const {address: lenderAddress} = useAccount();
  const logServerUrl = useLogServerURL();
  const {data: lenderIdsData, error: lenderIdsError} = useQuery(lenderIdsQuery({logServerUrl, address: lenderAddress}));
  const lenderId = lenderIdsData?.lenderIds[0]; // TODO: we need to have some UI state somewhere indicating which lenderId is selected in case there are multiple

  return (
    <form
      className="sm:flex sm:flex-col gap-8 space-y-8 rounded-xl p-6 sm:mx-auto sm:max-w-prose border border-zinc-800 bg-zinc-800/40"
    >
      <Fieldset>
        <Legend>
          <h2 className="text-xl">Change lender address</h2>
        </Legend>
        <Text className="italic">
          {"[Maybe say something here about why you'd want to do this]"}
        </Text>
        <FieldGroup>
          {/* TODO fix spacing/alignment */}
          <div className="grid grid-cols-1 gap-8 sm:gap-4">
            <Field>
              <Label>New address</Label>
              <Input value={newAddress} name="new_address" onChange={(e) => setNewAddress(e.target.value)} />
            </Field>
            <CheckboxField>
              {/* TODO default checked */}
              <Label>Require confirmation</Label>
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
       buttonText="Submit"
       address={rocketLendAddress}
       abi={rocketLendABI}
       functionName="changeLenderAddress"
       args={[lenderId, newAddress, requireConfirmation]}
      />
    </form>
  );
};

export default ChangeAddress;
