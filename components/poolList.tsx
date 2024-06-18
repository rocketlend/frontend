import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import { ethers } from 'ethers';

import { useRouter } from 'next/router';

import rocketlendABI from "../json/rocketlendABI.json"

import { useAccount, useChainId } from 'wagmi';
import type { RootState } from '../globalredux/store';
import { useSelector, useDispatch } from 'react-redux';
import { getPoolData } from "../globalredux/Features/pools/poolsDataSlice"



const PoolList: NextPage = () => {


    const { address } = useAccount({


        onConnect: ({ address }) => {


            getPoolLogs();
        }

    })


    const currentChain = useChainId();
    const dispatch = useDispatch()


    const reduxPoolData = useSelector((state: RootState) => state.poolData.data);



    const poolLogTemplate = {
        provider: {},
        transactionHash: 0x28de84caa8a9996b77b99593da63e1d618fd4af156dd59969ccb177fc120c6f4,
        blockHash: 0x2fd4ddeb92bfec162dea92db8557138860efff1dd57451a5f1988882769ed7c8,
        blockNumber: 1746611,
        removed: false,
        address: 0xA21DDc1f17dF41589BC6A5209292AED2dF61Cc94,
        data: 0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008ac7230489e8000000000000000000000000000000000000000000000000000000000190351d21a00000000000000000000000000000000000000000000000000000000000000000,
        topics: { 0: 0x73eda176813a2eb42c8d8c36c1f9af8bd1554d5735ebfc1270bf2fbf49abee48, 1: 0xd845f791bb16e8a2d13e6398802430a72d9781845b1b831342631de4266bd881 },
        index: 0,
        transactionIndex: 0,
        interface: {},
        fragment: {},
        args: {
            0: 0xd845f791bb16e8a2d13e6398802430a72d9781845b1b831342631de4266bd881,
            1: 0,
            2: 10000000000000000000,
            3: 1718878020000,
            4: 0
        }
    }


    const currentRocketlendAddress = "0x325c8Df4CFb5B068675AFF8f62aA668D1dEc3C4B";


    const inter = new ethers.Interface(rocketlendABI);


    type poolObject = {

        balance: string
        allowance: string
        attoRPL: string
        blockNumber: number
        lender: string
        poolID: string
        endTime: string


    }



  






    const getPoolLogs = async () => {

        try {

            console.log("Running get Registration logs")
            let browserProvider = new ethers.BrowserProvider((window as any).ethereum)


            let signer = await browserProvider.getSigner()



            const rocketlendContract = new ethers.Contract(currentRocketlendAddress, rocketlendABI, signer);
            const latestBlockNum = await browserProvider.getBlockNumber();




            const data: Array<any> = await rocketlendContract.queryFilter("CreatePool", latestBlockNum - 10000, latestBlockNum)

            console.log(data[0])

            let poolObjectsArray: Array<poolObject> = [];


            for (const pool of data) {


                console.log(pool)


                let newBalance = "";
                let newAllowance = "";
                let newAttoRPL = "";
                let newBlockNumber = 0
                let newLender = "0x"
                let newEndTime = pool.args[1][2].toString()

                let newPoolID = pool.args[0]




                const tx = await browserProvider.getTransaction(pool.transactionHash);

                console.log(tx)


                console.log(tx)



                if (tx !== null) {




                    const decodedInput = inter.parseTransaction({ data: tx.data, value: tx.value });
                    console.log(decodedInput)

                    newBlockNumber = tx.blockNumber !== null ? tx.blockNumber : 0
                    newLender = tx.from !== null ? tx.from : "";


                    if (decodedInput !== null) {
                        newBalance = ethers.formatEther(decodedInput.args[1])
                        newAllowance = ethers.formatEther(decodedInput.args[2])
                        newAttoRPL = ethers.formatEther(decodedInput.args[0][1])

                    }






                }



                let newPoolObject = { balance: newBalance, allowance: newAllowance, attoRPL: newAttoRPL, blockNumber: newBlockNumber, lender: newLender, poolID: newPoolID, endTime: newEndTime }



                poolObjectsArray.push(newPoolObject)


            }



            dispatch(getPoolData(poolObjectsArray))














        } catch (e: any) {

            console.log(e)
        }
    }




    useEffect(() => {
        getPoolLogs();

    }, [])






    function truncateString(str: string) {
        return str.length > 7 ? str.substring(0, 7) + '...' : str;
    }



    const router = useRouter();

    const handleClick = (param1: string) => {

        router.push(`/poolDetail/${param1}`);

    };








    return (


        <div style={{ backgroundColor: "#eeeff2" }} className='w-full h-auto py-[5vh] min-h-[40vh] flex flex-col gap-[10vh] items-center justify-center' >


            <h1 style={{ color: "#BAC3CA" }} className="text-4xl font-bold ">Active Pools</h1>


            <div id="accountTable" className="w-[85%] h-auto lg:w-auto max-w-[90%] overflow-scroll shadow-xl bg-white border rounded-lg mb-10 ">


                <table className="w-full">

                    <thead>
                        <tr className='h-[50px] bg-gray-300'>
                            <th className=" px-4 pl-10 w-[200px] ">
                                Pool Id

                            </th >
                            <th className=" px-4 pl-10 w-[200px] ">
                                Available Funds
                            </th>
                            <th className=" px-4 pl-10 w-[200px] ">
                                Interest Rate
                            </th>
                            <th className=" px-4 pl-10 w-[200px] ">
                                Allowance
                            </th>
                            <th className=" px-4 pl-10 w-[200px] ">
                                Lender
                            </th>


                        </tr>
                    </thead>
                    <tbody>


                        {reduxPoolData.map((entry, index) => (


                            <tr key={index} className=" hover:bg-gray-200 cursor-pointer" onClick={() => handleClick(entry.poolID)} >



                                <td className=" px-4 pl-10 w-[200px] ">
                                    <span className='text-green-500 self-center font-bold text-sm lg:text-lg ' >

                                        {truncateString(entry.poolID)}
                                    </span>
                                </td>

                                <td className="px-4 py-3 w-[200px]">
                                    <div className="flex items-center text-sm lg:text-lg">


                                        <span className='text-green-500 font-bold' style={{ color: "rgb(34 197 94)" }}>

                                            <div className='flex items-center justify-center'>
                                                <div className="inline-flex flex-shrink-0 items-center justify-center h-12 w-12 text-green-600 bg-green-100 rounded-full mr-3">
                                                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                                    </svg>

                                                </div>
                                                <p>{entry.balance} RPL</p>
                                            </div>


                                        </span>


                                    </div>
                                </td>

                                <td className="px-4 py-3 w-[200px]">
                                    <div className="flex items-center flex-col gap-1 text-l ">






                                        <p className="text-yellow-500 text-center  text-sm lg:text-lg">
                                            {entry.attoRPL} attoRPL


                                        </p>


                                    </div>
                                </td>

                                <td className="px-4 py-3 w-[200px]">
                                    <div className="flex items-center flex-col gap-1 text-l ">






                                        <p className="text-yellow-500 text-center  text-sm lg:text-lg">
                                            {entry.allowance} RPL


                                        </p>


                                    </div>
                                </td>




                                <td className="px-4 pr-10 py-3 w-[auto]">

                                    <div className="flex items-center text-l  flex-col gap-1">


                                        <p>{entry.lender}</p>
                                    </div>
                                </td>

                            </tr>



                        ))}




                    </tbody>
                </table>
            </div>



        </div>

    )
}

export default PoolList


