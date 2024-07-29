import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import {
  mainnet,
  holesky,
} from 'wagmi/chains';
import abi from './rocketlend.abi';

export const constants = {
  HOLESKY_RPC: 'http://localhost:56580',
  HOLESKY_ROCKETLEND: '0xbe18A1B61ceaF59aEB6A9bC81AB4FB87D56Ba167',
  WALLETCONNECT_ID: '72d96e7ff3f184256a7677239be021a6',
}

export const chainNameFromId = (id) => id === mainnet.id ? 'mainnet' : 'holesky';

export { abi };

export const config = getDefaultConfig({
  appName: 'RocketLend',
  projectId: constants['WALLETCONNECT_ID'],
  chains: [
    mainnet,
    holesky,
  ],
  transports: {
    [holesky.id]: http(constants['HOLESKY_RPC']),
  },
  ssr: true,
});
