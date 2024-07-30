import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http, useReadContract } from 'wagmi';
import { keccak256, stringToBytes } from 'viem';
import {
  mainnet,
  holesky,
} from 'wagmi/chains';
import rocketLendABI from './rocketlend.abi';
import rplABI from './rocketTokenRPL.abi';
import rocketStorageABI from './rocketStorage.abi';

export const constants = {
  holesky: {
    rpc: 'http://localhost:55801',
    logserver: 'http://localhost:8879',
    rocketlend: '0x01cf58e264d7578D4C67022c58A24CbC4C4a304E',
    rocketStorage: '0x594Fb75D3dc2DFa0150Ad03F99F97817747dd4E1',
  },
  mainnet: {
    rocketStorage: '0x1d8f8f00cfa6758d7bE78336684788Fb0ee0Fa46',
  },
  walletConnectId: '72d96e7ff3f184256a7677239be021a6',
};

export const chainNameFromId = (id) => id === mainnet.id ? 'mainnet' : 'holesky';

export const useRocketAddress = ({chainName, contractName}) => {
  return useReadContract({
    abi: rocketStorageABI,
    address: constants[chainName]['rocketStorage'],
    functionName: 'getAddress',
    args: [keccak256(stringToBytes(`contract.address${contractName}`))],
  });
};

export { rocketLendABI, rplABI };

export const config = getDefaultConfig({
  appName: 'RocketLend',
  projectId: constants['walletConnectId'],
  chains: [
    mainnet,
    holesky,
  ],
  transports: {
    [holesky.id]: http(constants.holesky.rpc),
  },
  ssr: true,
});
