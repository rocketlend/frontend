import React, { useEffect, useState, useRef } from 'react'
import type { NextPage } from 'next';
import Head from 'next/head';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer'
import styles from '../../styles/Home.module.css';
import { useAccount, useChainId } from 'wagmi';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';

import type { RootState } from '../../globalredux/store';
import { useSelector, useDispatch } from 'react-redux';
import { getPoolData } from "../../globalredux/Features/pools/poolsDataSlice"
import rocketlendABI from "../../json/rocketlendABI.json"
import storageABI from "../../json/storageABI.json"
import miniManagerABI from "../../json/miniManagerABI.json"










interface MyComponentProps {
    param1: string | string[] | undefined;

}

const PoolDetail: NextPage = () => {


    const router = useRouter();
    const { param1 } = router.query;


    const params: MyComponentProps = {
        param1: param1,


    } // Accessing the 'id' parameter from the URL



    const reduxPoolData = useSelector((state: RootState) => state.poolData.data);




    const { address } = useAccount({
        onConnect: ({ address }) => {
            console.log("Ethereum Wallet Connected!")




        }
    })




    const currentChain = useChainId();


    type poolObject = {

        balance: bigint
        allowance: bigint
        attoRPL: bigint
        blockNumber: number
        lender: string
        poolID: string


    }



    const storageAddress = currentChain === 17000 ? "0x594Fb75D3dc2DFa0150Ad03F99F97817747dd4E1" : "0x1d8f8f00cfa6758d7bE78336684788Fb0ee0Fa46"
    const currentRocketlendAddress = "0x2F54D1563963fC04770E85AF819c89Dc807f6a06";
    const [currentPool, setCurrentPool] = useState<any>({})


    const getCurrentPool = () => {



        for (const pool of reduxPoolData) {


            if (pool.poolID === param1) {
                setCurrentPool(pool)
            }


        }






    }


    useEffect(() => {

        getCurrentPool();

    }, [])




    const [RPLToBorrow, setRPLToBorrow] = useState("")


    function isValidPositiveNumber(str: string) {
        // Convert the string to a number
        const num = Number(str);

        // Check if the conversion results in a valid number and if the number is greater than zero
        if (!isNaN(num) && num > 0) {
            return true;
        } else {
            return false;
        }
    }



    const handleBorrowFromPool = async () => {



        const run = isValidPositiveNumber(RPLToBorrow)


        if (run) {


            try {


                let browserProvider = new ethers.BrowserProvider((window as any).ethereum)


                let signer = await browserProvider.getSigner()



                const rocketlendContract = new ethers.Contract(currentRocketlendAddress, rocketlendABI, signer);




                const miniManagerContract = new ethers.Contract("0x4b38d3BE036c6c21662C81b771F9FA18fFd30d9f", miniManagerABI, signer);



                const readTest = await miniManagerContract.getActiveMinipoolCount();


                console.log(readTest)


                console.log(param1)
                console.log(address)
                console.log(ethers.parseEther(RPLToBorrow))


                const tx = await rocketlendContract.borrow(param1, address, ethers.parseEther(RPLToBorrow))


                const receipt = await tx.wait()


                if (receipt.status === 1) {


                    alert("Successfully borrowed RPL!")




                } else {
                    alert("Transaction was not a success!")
                }




            } catch (e: any) {

                alert(e)

                console.log(e)



            }

        } else {

            alert("You must input an RPL value")

        }

    }









    function truncateString(str: string) {
        return str.length > 7 ? str.substring(0, 10) + '...' : str;
    }




    const handleChangeRPLToBorrow = (e: any) => {
        setRPLToBorrow(e.target.value)
    }







    return (
        <div className="flex w-full h-auto flex-col  gap-2 items-center justify-center  " style={{ backgroundColor: "#eeeff2" }}>
            <Head>
                <title>Rocketlend | RPL Lending </title>
                <meta
                    content="Vrun is a cutting-edge Ethereum staking service that empowers node operators with secure, non-custodial staking solutions for unparalleled control and efficiency."
                    name="Vrün  | Nodes & Staking"
                />
                <link href="/favicon.ico" rel="icon" />
            </Head>
            <Navbar />



            <div className="flex flex-col w-full items-center justify-start pt-[5vh] lg:pt-[0vh] lg:mb-[60vh] mb-[40vh] px-[3vh] lg:px-[0vh] h-auto gap-[6vh] lg:h-[90vh]">

                <div className="w-full flex flex-col justify-center items-center  py-[5vh]  ">
                    <h2 style={{ color: "rgb(110 117 124)" }} className="text-2xl lg:text-4xl  mb-2 font-bold">Pool Detail</h2>

                    <span style={{ color: "rgb(110 117 124)" }} className='w-[80%] text-center overflow-wrap break-word'>

                        {params?.param1}

                    </span>

                </div>

                <div className='w-full h-auto flex lg:flex-row flex-col gap-2 justify-center items-center  '>

                    <div className='w-auto h-auto flex flex-col items-center justify-center rounded-[20px] shadow-lg  bg-[#999]'>

                        <h2 style={{ color: "rgb(110 117 124)" }} className="text-xl lg:text-4xl  mb-2 font-bold">Stats</h2>

                        <div className="w-[85%] h-auto lg:w-auto max-w-[90%]  shadow-xl bg-white border rounded-lg mb-10 ">



                            <table>
                                <tbody>
                                    <tr>
                                        <td className="p-5">
                                            <p style={{ color: "rgb(110 117 124)" }} className="text-center max-w-[80%]">Balance: </p>
                                        </td>
                                        <td className="p-5">
                                            <p style={{ color: "rgb(110 117 124)" }} className="text-center max-w-[80%]">{currentPool.balance}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-5">
                                            <p style={{ color: "rgb(110 117 124)" }} className="text-center max-w-[80%]">Block Number: </p>
                                        </td>
                                        <td className="p-5">
                                            <p style={{ color: "rgb(110 117 124)" }} className="text-center max-w-[80%]">{currentPool.blockNumber}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-5">
                                            <p style={{ color: "rgb(110 117 124)" }} className="text-center max-w-[80%]">End Time: </p>
                                        </td>
                                        <td className="p-5">
                                            <p style={{ color: "rgb(110 117 124)" }} className="text-center max-w-[80%]">{currentPool.endTime}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-5">
                                            <p style={{ color: "rgb(110 117 124)" }} className="text-center max-w-[80%]">Interest Rate: </p>
                                        </td>
                                        <td className="p-5">
                                            <p style={{ color: "rgb(110 117 124)" }} className="text-center max-w-[80%]">{currentPool.attoRPL}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-5">
                                            <p style={{ color: "rgb(110 117 124)" }} className="text-center max-w-[80%]">Lender: </p>
                                        </td>
                                        <td className="p-5">
                                            <p style={{ color: "rgb(110 117 124)" }} className="text-center word-wrap max-w-[80%]">{currentPool.lender ? truncateString(currentPool.lender) : ""}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-5">
                                            <p style={{ color: "rgb(110 117 124)" }} className="text-center max-w-[80%]">Allowance: </p>
                                        </td>
                                        <td className="p-5">
                                            <p style={{ color: "rgb(110 117 124)" }} className="text-center max-w-[80%] ">{currentPool.allowance} </p>
                                        </td>
                                    </tr>
                                </tbody>

                            </table>




                        </div>

                    </div>
                    <div className='w-auto h-auto flex flex-col items-center justify-center rounded-[20px] shadow-lg  bg-[#fff]'>
                        <h2 style={{ color: "rgb(110 117 124)" }} className="text-xl lg:text-4xl  mb-2 font-bold">Functions</h2>

                        <div className="max-w-[40%] flex flex-col items-center justify-center gap-4 ">




                            <div className='bg-gray-300 flex items-center justify-center gap-3 p-6 shadow-lg rounded-lg '>

                                <input value={RPLToBorrow} type="text" className='shadow-lg rounded-full p-3' onChange={handleChangeRPLToBorrow} />
                                <button className={styles.uniButton} onClick={handleBorrowFromPool}>Borrow</button>

                            </div>

                            <p style={{ color: "rgb(110 117 124)" }} className="text-center max-w-[80%]">repay(_poolId: bytes32, _node: address, _amount: uint256, _amountSupplied: uint256)</p>
                            <p style={{ color: "rgb(110 117 124)" }} className="text-center max-w-[80%]">transferDebt(_node: address, _fromPool: bytes32, _toPool: bytes32, _fromAvailable: uint256, _fromInterest: uint256, _fromAllowance: uint256)
                            </p>





                        </div>

                    </div>





                </div>


                <div className='w-full h-auto flex  flex-col gap-2 justify-center items-center '>

                    <div className='w-auto h-auto flex flex-col items-center justify-center rounded-[20px] shadow-lg  bg-[#fff]'>




                        <h2 style={{ color: "rgb(110 117 124)" }} className="text-xl lg:text-4xl  mb-2 font-bold">Lender Functions</h2>


                        <div className="w-auto flex flex-col items-center justify-center gap-2  ">
                            <p style={{ color: "rgb(110 117 124)" }} className="text-center max-w-[80%]">supplyPool(_poolId: bytes32, _amount: uint256)</p>
                            <p style={{ color: "rgb(110 117 124)" }} className="text-center max-w-[80%]">withdrawFromPool(_poolId: bytes32, _amount: uint256)</p>
                            <p style={{ color: "rgb(110 117 124)" }} className="text-center max-w-[80%]">withdrawInterest(_poolId: bytes32, _amount: uint256, _andSupply: uint256)</p>
                            <p style={{ color: "rgb(110 117 124)" }} className="text-center max-w-[80%]"> withdrawEtherFromPool(_poolId: bytes32, _amount: uint256)</p>
                            <p style={{ color: "rgb(110 117 124)" }} className="text-center max-w-[80%]">forceRepayRPL(_poolId: bytes32, _node: address, _withdrawAmount: uint256)</p>
                            <p style={{ color: "rgb(110 117 124)" }} className="text-center max-w-[80%]">forceRepayETH(_poolId: bytes32, _node: address)</p>


                        </div>


                    </div>






                </div>






            </div>
            <Footer />

        </div>
    )
}

export default PoolDetail