import type { NextPage } from 'next';
import { useChainId } from 'wagmi';
import { constants, chainNameFromId } from '../wagmi';

const Page: NextPage = () => {
  const chainId = useChainId();
  const chainName = chainNameFromId(chainId);
  const contractEnvKey: string = `${chainName.toUpperCase()}_ROCKETLEND`;
  const addr = constants[contractEnvKey];
  return (
    <div>
    <p>Got chain {chainName} and RocketLend contract address via {contractEnvKey} '{addr}'</p>
    </div>
  )
}

export default Page;
