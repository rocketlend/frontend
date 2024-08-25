import type { NextPage } from 'next';
import { useChainId, useReadContract } from 'wagmi';
import {useRocketLendAddress } from '../hooks/useRocketLendAddress';
import rocketLendABI from '../rocketlend.abi';

const Page: NextPage = () => {
  const address = useRocketLendAddress();
  const testRead = useReadContract({abi: rocketLendABI, address, functionName: 'rocketStorage'}).data;
  return (
    <div>
    <p>Got RocketLend contract address {address}</p>
    <p>ABI has {rocketLendABI.length.toString()} items</p>
    <p>Got {testRead} from reading rocketlend.rocketStorage().</p>
    </div>
  )
};

export default Page;
