import type { Dispatch, SetStateAction } from "react";
import { useState, useEffect } from "react";
import { useEnsName, useEnsAddress }  from "wagmi";
import { normalize } from "viem/ens";
import { ADDRESS_REGEXP } from "../constants";
import { Input } from "./input";

export const AddressInput = ({
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
      address: inputValue.startsWith("0x") ? inputValue as `0x${string}` : undefined,
      query: { enabled: ADDRESS_REGEXP.test(inputValue) && !hasResolved }
    });
    const {
      data: resolvedAddress,
      status: resolveStatus,
      error: resolveError,
    } = useEnsAddress({
      name: inputValue.endsWith(".eth") ? normalize(inputValue) : undefined,
      query: { enabled: inputValue.endsWith(".eth") && !hasResolved }
    });
    useEffect(() => {
      if (hasResolved) return;
      if (resolvedEns) {
        setAddress(inputValue as `0x${string}`);
        setInputValue(resolvedEns);
      }
      else if (resolvedAddress) {
        setAddress(resolvedAddress);
      }
      else if (ADDRESS_REGEXP.test(inputValue)) {
        setAddress(inputValue as `0x${string}`);
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
