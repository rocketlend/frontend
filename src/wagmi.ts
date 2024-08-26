import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import {
  mainnet,
  holesky,
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'RocketLend',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID || '',
  chains: [
    mainnet,
    holesky,
  ],
  transports: {
    [holesky.id]: http(process.env.NEXT_PUBLIC_HOLESKY_RPC),
  },
  ssr: true,
});
