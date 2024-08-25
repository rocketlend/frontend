import { useChainId } from 'wagmi';
import {
  mainnet,
  holesky,
} from 'wagmi/chains';

export const useRocketLendAddress = () => {
  return {
    [mainnet.id]: process.env.NEXT_PUBLIC_MAINNET_ROCKETLEND,
    [holesky.id]: process.env.NEXT_PUBLIC_HOLESKY_ROCKETLEND,
  }[useChainId()];
};
