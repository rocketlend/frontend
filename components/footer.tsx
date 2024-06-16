import React from 'react'
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import { useAccount } from 'wagmi';
import Image from 'next/image';

const Footer: NextPage = () => {


  const { address } = useAccount({
    onConnect: ({ address }) => {
      console.log("Ethereum Wallet Connected!")
    }
  })




  return (


    <footer  className="p-4 w-full h-auto lg:h-[100px] bg-gray-300 flex flex-col items-center justify-center lg:flex-row mt-[5vh] gap-8  justify-center z-[999]">

        <div className='w-[100%] lg:w-auto flex flex-col lg:flex-row items-start lg:items-center justify-center gap-8'>

        <p >Rocketlend website and staking service Copyright 2024</p>

<p >This app is a work in progress, please email any inquiries to bartholemew.mchugh@gmail.com</p>


        </div>

        <div className='w-[100%] lg:w-auto flex flex-col  items-start lg:items-center justify-center gap-2'>

<p className="font-bold hover:text-yellow-100 cursor-pointer ">Terms & Conditions</p>

<p className="font-bold hover:text-yellow-100 cursor-pointer">License</p>


</div>

        
     


    </footer>

  )
}

export default Footer


