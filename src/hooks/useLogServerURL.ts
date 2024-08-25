import { useChainId } from 'wagmi';
import { mainnet, holesky } from 'wagmi/chains';

export const useLogServerURL = () => {
  return {
    [mainnet.id]: process.env.NEXT_PUBLIC_MAINNET_LOGSERVER,
    [holesky.id]: process.env.NEXT_PUBLIC_HOLESKY_LOGSERVER,
  }[useChainId()];
};
