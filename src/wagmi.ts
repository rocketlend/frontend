import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  mainnet,
  holesky,
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'RocketLend',
  projectId: '72d96e7ff3f184256a7677239be021a6',
  chains: [
    mainnet,
    holesky,
  ],
  ssr: true,
});
