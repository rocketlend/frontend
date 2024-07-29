import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import {
  mainnet,
  holesky,
} from 'wagmi/chains';

export const constants = {
  HOLESKY_RPC: 'http://localhost:56580',
  HOLESKY_ROCKETLEND: '0xbe18A1B61ceaF59aEB6A9bC81AB4FB87D56Ba167',
}

export const chainNameFromId = (id) => id === mainnet.id ? 'mainnet' : 'holesky';

export const config = getDefaultConfig({
  appName: 'RocketLend',
  projectId: '72d96e7ff3f184256a7677239be021a6',
  chains: [
    mainnet,
    holesky,
  ],
  transports: {
    [holesky.id]: http(constants['HOLESKY_RPC']),
  },
  ssr: true,
});
