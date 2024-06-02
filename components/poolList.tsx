import React, { useEffect } from 'react'
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import { ethers } from 'ethers';

import { useAccount, useChainId } from 'wagmi';



const PoolList: NextPage = () => {


    const { address } = useAccount({

    })


    const currentChain = useChainId();













    return (


        <div style={{ backgroundColor: "#BAC3CA" }} className='w-full h-[90vh] flex flex-col gap-[10vh] items-center justify-center'>


            <h1 className="text-4xl font-bold text-white">Active Pools</h1>


            <div id="accountTable" className="w-[90%] h-auto lg:w-auto overflow-scroll shadow-xl bg-white border rounded-lg mb-10 ">


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
                                Lended
                            </th>
                            <th className=" px-4 pl-10 w-[200px] ">
                                Lender
                            </th>


                        </tr>
                    </thead>
                    <tbody>


                        <tr className=" hover:bg-gray-200 cursor-pointer" >



                            <td className=" px-4 pl-10 w-[200px] ">
                                <span className='text-green-500 self-center font-bold text-sm lg:text-lg ' >

                                    9485702394
                                </span>
                            </td>

                            <td className="px-4 py-3 w-[200px]">
                                <div className="flex items-center text-sm lg:text-lg">


                                    <span className='text-green-500 font-bold' style={{ color: "rgb(34 197 94)" }}>

                                        <div className='flex items-center justify-center'>
                                            <div className="inline-flex flex-shrink-0 items-center justify-center h-12 w-12 text-red-600 bg-red-100 rounded-full mr-6">
                                                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                                                </svg>
                                            </div>
                                            <p >987 RPL</p>
                                        </div>


                                    </span>


                                </div>
                            </td>

                            <td className="px-4 py-3 w-[200px]">
                                <div className="flex items-center flex-col gap-1 text-l ">






                                    <p className="text-yellow-500 text-center  text-sm lg:text-lg">
                                        346 RPL


                                    </p>


                                </div>
                            </td>



                            <td className="px-4 pr-10 py-3 w-[auto]">

                                <div className="flex items-center text-l  flex-col gap-1">


                                    <p>0x1d8f8f00cfa6758d7bE78336684788Fb0ee0Fa46</p>
                                </div>
                            </td>

                        </tr>

                    </tbody>
                </table>
            </div>



        </div>

    )
}

export default PoolList


