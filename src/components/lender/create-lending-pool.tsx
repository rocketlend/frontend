import { useState, useEffect, useMemo } from "react";
import type { Dispatch, SetStateAction } from "react";
import { useEnsName, useEnsAddress }  from "wagmi";
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
import { useAccount } from "wagmi";
import { useRocketLendAddress } from "../../hooks/useRocketLendAddress";
import { TransactionSubmitter } from "../TransactionSubmitter";
import rocketLendABI from "../../rocketlend.abi";
import { DropIcon } from "../Icons";
import { NULL_ADDRESS } from "../../constants";
import type { RefreshUntilBlockType } from "../../functions/logServerRefresher";
import { normalize } from "viem/ens";

const ADDRESS_REGEXP = new RegExp("0x[0-9a-fA-F]{40}");

const AddressInput = ({
  setAddress,
} : {
  setAddress: Dispatch<SetStateAction<`0x${string}`>>;
}) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [resolvedName, setResolvedName] = useState<string>("");
    const [hasResolved, setHasResolved] = useState<boolean>(false);
    const {
      data: resolvedEns,
      status: nameStatus,
      error: nameError,
    } = useEnsName({
      address: inputValue,
      query: { enabled: ADDRESS_REGEXP.test(inputValue) && !hasResolved }
    });
    const {
      data: resolvedAddress,
      status: resolveStatus,
      error: resolveError,
    } = useEnsAddress({
      name: inputValue.endsWith(".eth") && normalize(inputValue),
      query: { enabled: inputValue.endsWith(".eth") && !hasResolved }
    });
    useEffect(() => {
      if (hasResolved) return;
      if (resolvedEns) {
        setAddress(inputValue);
        setInputValue(resolvedEns);
      }
      else if (resolvedAddress) {
        setAddress(resolvedAddress);
      }
      else if (ADDRESS_REGEXP.test(inputValue)) {
        setAddress(inputValue);
      }
      if (resolvedEns || resolvedAddress)
        setHasResolved(true);
    }, [resolvedEns, resolvedAddress, hasResolved, inputValue]);
    return (
      <>
      <Input
        value={inputValue}
        onChange={
          (e) => {
            setInputValue(e.target.value);
            setHasResolved(false);
          }
        }
      />
      <ul>
      <li>DEBUG INFO</li>
      <li>hasResolved: {hasResolved.toString()}.</li>
      <li>resolvedName: {resolvedEns}.</li>
      <li>nameStatus: {nameStatus}.</li>
      <li>nameError: {nameError?.message}.</li>
      <li>Resolved Address: {resolvedAddress}.</li>
      <li>resolveStatus: {resolveStatus}.</li>
      <li>resolveError: {resolveError?.message}.</li>
      </ul>
      </>
    );
};

// NOTE idk if we'll use this, but here it is just in case
// TODO make it do something
export const PoolsEmptyStateUI = () => {
  return (
    <button
      // type="button"
      className="group relative block w-7/12 rounded-lg bg-zinc-100/70 dark:bg-zinc-800/30 border border-dashed border-zinc-400/50 p-12 text-center hover:border-zinc-400 dark:hover:border-zinc-300/50"
    >
      <DropIcon className="mx-auto h-12 w-12 text-zinc-400 group-hover:text-zinc-500/90 dark:group-hover:text-zinc-300" />
      <span className="mt-2 block text-sm font-semibold text-zinc-400 group-hover:text-zinc-500/90 dark:group-hover:text-zinc-300">
        Create a new lending pool
      </span>
    </button>
  );
};

const CreateLendingPool = ({
  setRefreshUntilBlock,
} : {
  setRefreshUntilBlock: Dispatch<SetStateAction<RefreshUntilBlockType>>;
}
) => {
  // QUESTION should these be declared BigInts or converted when preparing the transaction?
  // Answer: I think they should probably be strings in the UI (with validation) that get converted to BigInts for the transaction
  // unless there is a browser input that's actually good for numbers with decimal points (fixed precision in this case) (and better than just a string)?
  const [interestRate, setInterestRate] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [andSupply, setAndSupply] = useState(0);
  const [allowance, setAllowance] = useState(0);
  const [allowAllAddresses, setAllowAllAddresses] = useState(true);
  const [allowedAddresses, setAllowedAddresses] = useState<string[]>([]);
  const [newAddress, setNewAddress] = useState("");
  const [showAddressInput, setShowAddressInput] = useState(false);
  const rocketLendAddress = useRocketLendAddress();
  const { address: lenderAddress } = useAccount();

  const handleBorrowerPreferenceChange = (value: string) => {
    setAllowAllAddresses(value === "allow_all");
  };

  // TODO: handle (i.e. resolve) ENS names as addresses
  const handleAddAddress = () => {
    const addressToAdd = newAddress.trim();
    if (addressToAdd) {
      setAllowedAddresses([...allowedAddresses, addressToAdd]);
      setNewAddress("");
      setShowAddressInput(false);
    }
  };

  const handleRemoveAddress = (idx: number) => {
    const newAddresses = allowedAddresses.filter((_, i) => i !== idx);
    setAllowedAddresses(newAddresses);
  };

  const borrowers = useMemo(() => {
    allowAllAddresses ? [NULL_ADDRESS] : allowedAddresses;
  }, [allowAllAddresses, allowedAddresses]);

  return (
    <form className="sm:flex sm:flex-col gap-8 space-y-8 rounded-xl p-6 sm:mx-auto sm:max-w-prose border border-zinc-800 bg-zinc-800/40">
      <Fieldset>
        <Legend>
          <h2 className="text-xl">Create pool</h2>
        </Legend>
        <FieldGroup>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4">
            <Field>
              <Label>Interest rate</Label>
              <Input
                value={interestRate}
                name="interest_rate"
                onChange={(e) => setInterestRate(Number(e.target.value))}
              />
            </Field>
            {/* TODO deal with date/time */}
            <Field>
              <Label>End time</Label>
              <Input
                value={endTime}
                name="end_time"
                onChange={(e) => setEndTime(Number(e.target.value))}
              />
            </Field>
            <Field>
              <Label>{"Initial RPL supply (optional)"}</Label>
              {/* TODO indicate how much RPL is approved/available */}
              <Input
                value={andSupply}
                name="and_supply"
                onChange={(e) => setAndSupply(Number(e.target.value))}
              />
            </Field>
            <Field>
              <Label>{"Transfer allowance (optional)"}</Label>
              <Input
                value={allowance}
                name="allowance"
                onChange={(e) => setAllowance(Number(e.target.value))}
              />
            </Field>

            <RadioGroup
              className="justify-center col-span-1 sm:col-span-2 mt-6 space-y-6 sm:flex sm:items-center sm:space-x-10 sm:space-y-0"
              defaultValue="allow_all"
              value={allowAllAddresses ? "allow_all" : "allow_some"}
              onChange={handleBorrowerPreferenceChange}
            >
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
            <FieldGroup className="grid grid-cols-1 justify-items-center">
              <Label>Addresses to allow:</Label>
              {/* TODO make this a table or a dl */}
              <div>
                {allowedAddresses.map((address, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <Text>{address}</Text>
                    <Button
                      plain
                      type="button"
                      onClick={() => handleRemoveAddress(idx)}
                    >
                      <TrashIcon />
                    </Button>
                  </div>
                ))}
              </div>
              {showAddressInput ? (
                <div className="flex gap-2">
                  <AddressInput
                    setAddress={setNewAddress}
                  />
                  <Button
                    plain
                    type="button"
                    onClick={handleAddAddress}
                  >
                    <PlusCircleIcon />
                  </Button>
                </div>
              ) : (
                <Button
                  outline
                  type="button"
                  onClick={() => setShowAddressInput(true)}
                >
                  Add address
                </Button>
              )}
            </FieldGroup>
          )}
        </FieldGroup>
      </Fieldset>
      <div className="sm:self-end space-x-4">
        {/* TODO make this button clear addresses as well */}
        <Button type="reset" plain>
          Clear
        </Button>
        <TransactionSubmitter
          buttonText="Submit"
          address={rocketLendAddress}
          abi={rocketLendABI}
          functionName="createPool"
          args={[
            [interestRate, endTime],
            andSupply,
            allowance,
            borrowers,
          ]}
        />
      </div>
    </form>
  );
};

export default CreateLendingPool;
