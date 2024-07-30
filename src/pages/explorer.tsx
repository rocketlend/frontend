import type { NextPage } from 'next';
import { useChainId, useReadContract } from 'wagmi';
import { chainNameFromId, rocketLendABI } from '../wagmi';

const Page: NextPage = ({constants}) => {
  const chainId = useChainId();
  const chainName = chainNameFromId(chainId);
  const address = constants[chainName]['rocketlend'];
  const testRead = useReadContract({abi: rocketLendABI, address, functionName: 'rocketStorage'}).data;
  return (
    <div>
    <p>Got chain {chainName} and RocketLend contract address {address}</p>
    <p>ABI has {rocketLendABI.length.toString()} items</p>
    <p>Got {testRead} from reading rocketlend.rocketStorage().</p>
    </div>
  )
};

export default Page;
