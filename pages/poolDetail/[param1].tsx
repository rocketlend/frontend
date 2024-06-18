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
    const currentRocketlendAddress = "0x325c8Df4CFb5B068675AFF8f62aA668D1dEc3C4B";
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









    const handleRepayDebtToPool = async (amount: bigint) => {









        try {


            let browserProvider = new ethers.BrowserProvider((window as any).ethereum)


            let signer = await browserProvider.getSigner()



            const rocketlendContract = new ethers.Contract(currentRocketlendAddress, rocketlendABI, signer);







            console.log(param1)
            console.log(address)
            console.log(amount)


            const tx = await rocketlendContract.repay(param1, address, amount, 0)


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


    }





    const fastForwardTime = async () => {

        try {


            let browserProvider = new ethers.BrowserProvider((window as any).ethereum)



            await browserProvider.send("evm_increaseTime", [3600000])


            alert("Time increased")

        } catch (e: any) {


            console.log(e)
            alert(e)

        }
    }








    function truncateString(str: string) {
        return str.length > 7 ? str.substring(0, 10) + '...' : str;
    }




    const [RPLToBorrow, setRPLToBorrow] = useState("")
    const [RPLToWithdraw, setRPLToWithdraw] = useState("")
    const [RPLToSupply, setRPLToSupply] = useState("")




    const handleChangeRPLToBorrow = (e: any) => {
        setRPLToBorrow(e.target.value)
    }

    const handleChangeRPLToWithdraw = (e: any) => {
        setRPLToWithdraw(e.target.value)
    }


    const handleChangeRPLToSupply = (e: any) => {
        setRPLToSupply(e.target.value)
    }




    const debtLogTemplate = {
        address: "0x2F54D1563963fC04770E85AF819c89Dc807f6a06",
        args: { 0: '0xa9c1c7a136e9f2398f2d04ff58e526c7bf26c39459df20c7ccafb3c4d2e5d86e', 1: '0x74dB046C8287a53a60B2927d47EbC34ca408526D', 2: "50000000000000000000n", 3: "50000000000000000000n", 4: "0n" },
        blockHash: "0x10493a01263c0ec1b4caf6b233c0144a65f24ecaefd40c3682be5fd405172ada",
        blockNumber: 1755832,
        data: "0x000000000000000000000000000000000000000000000002b5e3af16b18800000000000000000000000000000000000000000000000000000000000000000000",
        emoved: false,
        topics: ['0xf550aae7d8840cc56015d70e0cdafa83b1bf069f4685be93cfedbd6869286003', '0xa9c1c7a136e9f2398f2d04ff58e526c7bf26c39459df20c7ccafb3c4d2e5d86e', '0x00000000000000000000000074db046c8287a53a60b2927d47ebc34ca408526d', '0x000000000000000000000000000000000000000000000002b5e3af16b1880000'],
        transactionHash: "0x66c3b7eb409ce2b556660ec51b43bfdd1e69892f54d95b3a11c5d03e7e9509b9",
        transactionIndex: 0,

    }


    const [currentPoolDebts, setCurrentPoolDebts] = useState<Array<any>>([])


    const handleWithdrawFromPool = async () => {




        const run = isValidPositiveNumber(RPLToWithdraw)


        if (run) {



            try {


                let browserProvider = new ethers.BrowserProvider((window as any).ethereum)


                let signer = await browserProvider.getSigner()



                const rocketlendContract = new ethers.Contract(currentRocketlendAddress, rocketlendABI, signer);







                console.log(param1)
                console.log(address)



                const tx = await rocketlendContract.withdrawFromPool(param1, ethers.parseEther(RPLToWithdraw))


                const receipt = await tx.wait()


                if (receipt.status === 1) {


                    alert("Successfully Withdrew RPL!")




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




    const handleSupplyPool = async () => {

        const run = isValidPositiveNumber(RPLToSupply)


        if (run) {



            try {


                let browserProvider = new ethers.BrowserProvider((window as any).ethereum)


                let signer = await browserProvider.getSigner()



                const rocketlendContract = new ethers.Contract(currentRocketlendAddress, rocketlendABI, signer);







                console.log(param1)
                console.log(address)



                const tx = await rocketlendContract.supplyPool(param1, ethers.parseEther(RPLToSupply))


                const receipt = await tx.wait()


                if (receipt.status === 1) {


                    alert("Successfully Withdrew RPL!")




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







    useEffect(() => {

        const getPoolDebtLogs = async () => {

            try {

                console.log("Running get Pool debt logs")
                let browserProvider = new ethers.BrowserProvider((window as any).ethereum)


                let signer = await browserProvider.getSigner()



                const rocketlendContract = new ethers.Contract(currentRocketlendAddress, rocketlendABI, signer);
                const latestBlockNum = await browserProvider.getBlockNumber();


                console.log(latestBlockNum)

                console.log(latestBlockNum - 10000)

                const debtData: Array<any> = await rocketlendContract.queryFilter("Borrow", latestBlockNum - 10000, latestBlockNum)


                const repayData: Array<any> = await rocketlendContract.queryFilter("Repay", latestBlockNum - 1000, latestBlockNum)

                console.log(debtData[0])

                console.log(repayData)




                let newDebtDataArray: Array<any> = [];





                for (const debt of debtData) {



                    let newDebtDataObject = {

                        pool: debt.args[0],
                        node: debt.args[1],
                        amount: debt.args[2],
                        borrowed: debt.args[3],
                        interestDue: debt.args[4]



                    }


                    newDebtDataArray.push(newDebtDataObject)


                    console.log(debt.args[1])



                }



                setCurrentPoolDebts(newDebtDataArray)














                // const latestLog =  findLargestBlockNumber(newArray)





                /*   if (latestLog.fragment.name === "JoinProtocol") {
        
                    setRegistrationChecked(true)
        
                    console.log("Checked true")
        
                   } else {
        
                    setRegistrationChecked(false)
                    console.log("Checked false")
        
                   } */














            } catch (e: any) {


                console.log(e)

                alert(e)


            }


        }


        getPoolDebtLogs();

    }, [])







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

                            <p style={{ color: "rgb(110 117 124)" }} className="text-center max-w-[80%]">transferDebt(_node: address, _fromPool: bytes32, _toPool: bytes32, _fromAvailable: uint256, _fromInterest: uint256, _fromAllowance: uint256)
                            </p>





                        </div>

                    </div>





                </div>


                <div className='w-full h-auto flex  flex-col gap-2 justify-center items-center '>

                    <div className='w-auto h-auto flex flex-col items-center justify-center rounded-[20px] shadow-lg  p-6 bg-[#fff]'>




                        <h2 style={{ color: "rgb(110 117 124)" }} className="text-xl lg:text-4xl  mb-2 font-bold">Lender Functions</h2>


                        <div className="w-auto flex flex-col items-center justify-center gap-2  ">


                            <div className='bg-gray-300 flex items-center justify-center gap-3 p-6 shadow-lg rounded-lg '>

                                <input value={RPLToSupply} type="text" className='shadow-lg rounded-full p-3' onChange={handleChangeRPLToSupply} />
                                <button className={styles.uniButton} onClick={handleSupplyPool}>SUPPLY</button>

                            </div>


                            <div className='bg-gray-300 flex items-center justify-center gap-3 p-6 shadow-lg rounded-lg '>

                                <input value={RPLToWithdraw} type="text" className='shadow-lg rounded-full p-3' onChange={handleChangeRPLToWithdraw} />
                                <button className={styles.uniButton} onClick={handleWithdrawFromPool}>Withdraw</button>

                            </div>

                            <p style={{ color: "rgb(110 117 124)" }} className="text-center max-w-[80%]">supplyPool(_poolId: bytes32, _amount: uint256)</p>
                            <p style={{ color: "rgb(110 117 124)" }} className="text-center max-w-[80%]">withdrawInterest(_poolId: bytes32, _amount: uint256, _andSupply: uint256)</p>
                            <p style={{ color: "rgb(110 117 124)" }} className="text-center max-w-[80%]"> withdrawEtherFromPool(_poolId: bytes32, _amount: uint256)</p>
                            <p style={{ color: "rgb(110 117 124)" }} className="text-center max-w-[80%]">forceRepayRPL(_poolId: bytes32, _node: address, _withdrawAmount: uint256)</p>
                            <p style={{ color: "rgb(110 117 124)" }} className="text-center max-w-[80%]">forceRepayETH(_poolId: bytes32, _node: address)</p>


                        </div>


                    </div>






                </div>










            </div>




            {currentPoolDebts.length > 0 &&

                (<div id="accountTable" className="w-[85%]  h-auto lg:w-auto max-w-[90%] overflow-scroll shadow-xl bg-white border rounded-lg mb-10 ">


                    <table className="w-full">

                        <thead>
                            <tr className='h-[50px] bg-gray-300'>


                                <th className=" px-4 pl-10 w-[200px] ">



                                </th>
                                <th className=" px-4 pl-10 w-[200px] ">
                                    Pool

                                </th >
                                <th className=" px-4 pl-10 w-[200px] ">
                                    Borrower

                                </th >
                                <th className=" px-4 pl-10 w-[200px] ">
                                    Amount
                                </th>
                                <th className=" px-4 pl-10 w-[200px] ">
                                    Borrowed
                                </th>
                                <th className=" px-4 pl-10 w-[200px] ">
                                    Interest Due
                                </th>





                            </tr>
                        </thead>
                        <tbody>


                            {currentPoolDebts.map((entry, index) => (


                                <tr key={index} className=" hover:bg-gray-200 cursor-pointer" >


                                    <td className=" px-4 pl-10 w-[200px] ">
                                        <div className='flex flex-col items-center justify-center' >

                                            <button onClick={() => { handleRepayDebtToPool(entry.borrowed) }} className={styles.uniButton}>Repay</button>
                                        </div>
                                    </td>



                                    <td className=" px-4 pl-10 w-[200px] ">
                                        <span className='text-green-500 self-center font-bold text-sm lg:text-lg ' >

                                            {entry.pool}
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
                                                    <p> {entry.node}</p>
                                                </div>


                                            </span>


                                        </div>
                                    </td>

                                    <td className="px-4 py-3 w-[200px]">
                                        <div className="flex items-center flex-col gap-1 text-l ">






                                            <p className="text-yellow-500 text-center  text-sm lg:text-lg">
                                                {ethers.formatEther(entry.amount)} RPL


                                            </p>


                                        </div>
                                    </td>

                                    <td className="px-4 py-3 w-[200px]">
                                        <div className="flex items-center flex-col gap-1 text-l ">






                                            <p className="text-yellow-500 text-center  text-sm lg:text-lg">
                                                {ethers.formatEther(entry.borrowed)}


                                            </p>


                                        </div>
                                    </td>

                                    <td className="px-4 py-3 w-[200px]">
                                        <div className="flex items-center flex-col gap-1 text-l ">






                                            <p className="text-yellow-500 text-center  text-sm lg:text-lg">
                                                {ethers.formatEther(entry.interestDue)}


                                            </p>


                                        </div>
                                    </td>







                                </tr>



                            ))}




                        </tbody>
                    </table>
                </div>)}


            <div className="flex flex-col items-center justify-center">


                <button className={styles.uniButton} onClick={() => { fastForwardTime() }}>FAST-FORWARD TIME</button>

            </div>

            <Footer />

        </div>
    )
}

export default PoolDetail