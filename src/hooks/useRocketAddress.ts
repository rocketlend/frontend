import { useChainId, useReadContract } from 'wagmi';
import {
  mainnet,
  holesky,
} from 'wagmi/chains';
import { keccak256, stringToBytes } from 'viem';
import abi from '../rocketStorage.abi';

export const useRocketAddress = (contractName: string) => {
  const address = {
    [mainnet.id]: process.env.NEXT_PUBLIC_MAINNET_ROCKET_STORAGE,
    [holesky.id]: process.env.NEXT_PUBLIC_HOLEKSY_ROCKET_STORAGE,
  }[useChainId()];
  return useReadContract({
    address, abi,
    functionName: 'getAddress',
    args: [keccak256(stringToBytes(`contract.address${contractName}`))],
  });
};
