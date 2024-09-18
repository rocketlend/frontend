import { useChainId, useReadContract } from 'wagmi';
import {
  mainnet,
  holesky,
} from 'wagmi/chains';
import { keccak256, stringToBytes } from 'viem';
import abi from '../rocketStorage.abi';

export const useRocketAddress = (contractName: string) => {
  const address = {
    [mainnet.id]: '0x1d8f8f00cfa6758d7bE78336684788Fb0ee0Fa46',
    [holesky.id]: '0x594Fb75D3dc2DFa0150Ad03F99F97817747dd4E1',
  }[useChainId()] as `0x${string}`;
  if (contractName == 'rocketStorage') return {
    data: address,
    error: null,
    fetchStatus: 'idle',
  };
  else return useReadContract({
   address, abi,
   functionName: 'getAddress',
   args: [keccak256(stringToBytes(`contract.address${contractName}`))]
  });
};
