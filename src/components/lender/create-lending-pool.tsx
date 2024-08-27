import { useState } from "react";
import {
  Description,
  Field,
  FieldGroup,
  Fieldset,
  Label,
  Legend,
} from "../fieldset";
import { Text, Strong } from "../text";
import { Input } from "../input";
import { Button } from "../button";
import { Radio, RadioField, RadioGroup } from "../radio";
import { TrashIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

const CreateLendingPool = () => {
  const [allowAllAddresses, setAllowAllAddresses] = useState(true);
  const [allowedAddresses, setAllowedAddresses] = useState(['test']);
  const [newAddress, setNewAddress] = useState('');
  const [showAddressInput, setShowAddressInput] = useState(false);

  const handleBorrowerPreferenceChange = (value: string) => {
    setAllowAllAddresses(value === "allow_all");
  };

  const handleAddAddress = () => {
    const addressToAdd = newAddress.trim();
    if (addressToAdd) {
      setAllowedAddresses([...allowedAddresses, addressToAdd]);
      setNewAddress('');
      setShowAddressInput(false);
    }
  };

  const handleRemoveAddress = (idx: number) => {
    const newAddresses = allowedAddresses.filter((_, i) => i !== idx);
    setAllowedAddresses(newAddresses);
  };

  return (
    <form className="rounded-xl p-6">
      <Fieldset>
        <Legend>Create lending pool</Legend>
        <FieldGroup>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4">
            <Field>
              <Label>Interest rate</Label>
              <Input name="interest_rate" />
            </Field>
            <Field>
              <Label>End time</Label>
              <Input name="end_time" />
            </Field>
            <Field>
              <Label>{"Initial RPL supply (optional)"}</Label>
              {/* TODO indicate how much RPL is approved/available */}
              <Input name="rpl_supply" />
            </Field>
            <Field>
              <Label>{"Transfer allowance (optional)"}</Label>
              <Input name="transfer_allowance" />
            </Field>

            <RadioGroup defaultValue="allow_all" value={allowAllAddresses ? "allow_all" : "allow_some"} onChange={handleBorrowerPreferenceChange}>
              <RadioField>
                <Radio value="allow_all" />
                <Label>Allow all borrowers</Label>
              </RadioField>
              <RadioField>
                <Radio value="allow_some" />
                <Label>Specify a list of allowed borrowers</Label>
              </RadioField>
            </RadioGroup>
          </div>
          
            {!allowAllAddresses && (
              <FieldGroup>
                <Label>Addresses to allow:</Label>
                <div className="mt-1">
                  {allowedAddresses.map((address, idx) => (
                    <div key={idx} className="flex">
                    <Text>{address}</Text>
                    <Button type="button" onClick={() => handleRemoveAddress(idx)}>
                      <TrashIcon />
                    </Button>
                    </div>
                  ))}
                  {showAddressInput ? (
                    <>
                    <Input 
                      value={newAddress}
                      onChange={(e) => setNewAddress(e.target.value)}
                    />
                    <Button
                      type="button"
                      onClick={handleAddAddress}
                      className="cursor-pointer"><PlusCircleIcon /></Button>
                      </>
                  ) : (
                    <Button
                      type="button"
                      onClick={() => setShowAddressInput(true)}
                    >Add address</Button>
                  )}
                </div>
              </FieldGroup>
            )}
        </FieldGroup>
      </Fieldset>
      <Button className="cursor-pointer">Submit</Button>
    </form>
  );
};

export default CreateLendingPool;
