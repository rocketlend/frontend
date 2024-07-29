import type { NextPage } from 'next';
import { useChainId, useReadContract } from 'wagmi';
import { constants, chainNameFromId, abi } from '../wagmi';

const Page: NextPage = () => {
  const chainId = useChainId();
  const chainName = chainNameFromId(chainId);
  const contractEnvKey: string = `${chainName.toUpperCase()}_ROCKETLEND`;
  const address = constants[contractEnvKey];
  const testRead = useReadContract({abi, address, functionName: 'rocketStorage'}).data;
  return (
    <div>
    <p>Got chain {chainName} and RocketLend contract address via {contractEnvKey} '{address}'</p>
    <p>ABI has {abi.length.toString()} items</p>
    <p>Got {testRead} from reading rocketlend.rocketStorage().</p>
    </div>
  )
}

export default Page;
