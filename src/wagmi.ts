import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  mainnet,
  holesky,
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'RocketLend',
  projectId: 'ROCKETLEND_PROJECT_ID',
  chains: [
    mainnet,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [holesky] : []),
  ],
  ssr: true,
});
