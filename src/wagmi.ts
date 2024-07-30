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
    rpc: process.env.NEXT_PUBLIC_HOLESKY_RPC,
    logserver: process.env.NEXT_PUBLIC_HOLESKY_LOGSERVER,
    rocketlend: process.env.NEXT_PUBLIC_HOLESKY_ROCKETLEND,
    rocketStorage: process.env.NEXT_PUBLIC_HOLESKY_ROCKET_STORAGE,
  },
  mainnet: {
    rocketStorage: process.env.NEXT_PUBLIC_MAINNET_ROCKET_STORAGE,
  },
  walletConnectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID,
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
