import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Navbar from '../components/navbar';
import Image from 'next/image';
import PoolList from '../components/poolList';
import { MdNoAccounts } from "react-icons/md";
import { useAccount, useChainId } from 'wagmi';
import { EventLog, Signature, ethers, Log} from 'ethers';
import rocketlendABI from "../json/rocketlendABI.json"
import { useEffect, useState } from 'react';
import SliderComponent from '../components/slider';
import storageABI from "../json/storageABI.json"
import tokenABI from "../json/tokenABI.json"
import type { RootState } from '../globalredux/store';
import { useSelector, useDispatch } from 'react-redux';
import { getPoolData } from "../globalredux/Features/pools/poolsDataSlice"
import Footer from '../components/footer';


const Lender: NextPage = () => {








    const { address } = useAccount({
        onConnect: ({ address }) => {
            getRegistrationLog()




        }


    })



    const dispatch = useDispatch()

    const currentRocketlendAddress = "0x2F54D1563963fC04770E85AF819c89Dc807f6a06";


    const logTemplate = [{
        "fragment": {
            "type": "event",
            "inputs": [
                { "name": "id", "type": "uint256", "baseType": "uint256", "indexed": true, "components": null, "arrayLength": null, "arrayChildren": null },
                { "name": "who", "type": "address", "baseType": "address", "indexed": true, "components": null, "arrayLength": null, "arrayChildren": null }
            ],
            "name": "RegisterLender",
            "anonymous": false
        },

        "name": "RegisterLender",
        "signature":
            "RegisterLender(uint256,address)",
        "topic": "0x7121871900228678cccfba216ebcaa55b46b7c0b9188d6da01383474b7bc2ac8",
        "args": ["1", "0x90F65AC5e93D482a09C4a27c830b69Bdd0d2DA71"]
    }]




    const inter = new ethers.Interface(rocketlendABI);


    const [registrationChecked, setRegistrationChecked] = useState(false)
    const [lenderId, setLenderId] = useState(0)




    useEffect(() => {

        console.log(registrationChecked + " and " + lenderId)

    }, [lenderId])


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






    const getRegistrationLog = async () => {

        try {

            console.log("Running get Registration logs")
            let browserProvider = new ethers.BrowserProvider((window as any).ethereum)


            let signer = await browserProvider.getSigner()



            const rocketlendContract = new ethers.Contract(currentRocketlendAddress, rocketlendABI, signer);
            const latestBlockNum = await browserProvider.getBlockNumber();


            console.log(latestBlockNum)

            console.log(latestBlockNum - 10000)

            const data: Array<any> = await rocketlendContract.queryFilter("RegisterLender", latestBlockNum - 10000, latestBlockNum)

            console.log(data)


            if (data.length > 0) {





                const realReceipt = await browserProvider.getTransactionReceipt(data[0].transactionHash)


                const logsFromReceipt = realReceipt !== null ? realReceipt.logs.map((log: any) => rocketlendContract.interface.parseLog(log)) : []

                if (data !== null) {









                    for (const log of data) {

                        if (log !== null ) {
                            console.log("Running 1")
                            console.log(log.args[1])

                            if (log.args[1] === address) {

                                console.log("Running 2")


                                setRegistrationChecked(true)
                                setLenderId(log.args[0])


                                return;


                            }

                        }


                    }

                }





            } else {

            }









        } catch (e: any) {


            console.log(e)

            alert(e)


        }


    }



  







    useEffect(() => {

        getRegistrationLog();


    }, [])




    const [dateTime, setDateTime] = useState('')
    const [days, setDays] = useState(0)
    const [milliseconds, setMilliseconds] = useState(0)
    const [interest, setInterest] = useState(0)

    const [RPLToLend, setRPLToLend] = useState('')


    const [poolInterestRate, setPoolInterestRate] = useState(0)
    const [poolAllowance, setPoolAllowance] = useState(0)



    const currentChain = useChainId();

    const storageAddress = currentChain === 17000 ? "0x594Fb75D3dc2DFa0150Ad03F99F97817747dd4E1" : "0x1d8f8f00cfa6758d7bE78336684788Fb0ee0Fa46"


    type protocol = {
        fees: number
        feeNumerator: number
        address: string
        pending: string
    }

    const [currentProtocol, setCurrentProtocol] = useState<protocol>({
        fees: 0,
        feeNumerator: 0,
        address: "admin (that can claim protocol fees and change the rate)",
        pending: ""
    })






    useEffect(() => {

        console.log("CURRENT PROTOCOL:" + currentProtocol)

    }, [currentProtocol])




    useEffect(() => {


        const callProtocol = async () => {

            try {
                let browserProvider = new ethers.BrowserProvider((window as any).ethereum)


                let signer = await browserProvider.getSigner()



                const rocketlendContract = new ethers.Contract(currentRocketlendAddress, rocketlendABI, signer);


                const data = await rocketlendContract.protocol()



                setCurrentProtocol(data)



            } catch (e) {

            }



        }


        const timer = setTimeout(() => {


            callProtocol();

        }, 10000);

        return () => clearTimeout(timer);

    }, [currentProtocol])





    const createLendingPool = async () => {

        const PoolParams = {
            lender: lenderId,
            interestRate: ethers.parseEther(poolInterestRate.toString()),
            endTime: milliseconds,
            protocolFee: currentProtocol.feeNumerator
        }



        console.log("LENDER ID:" + lenderId)
        console.log("ATTO RPL:" + ethers.parseEther(poolInterestRate.toString()))
        console.log("END TIME:" + milliseconds)
        console.log("PROTOCOL FEE " + currentProtocol.feeNumerator)

        console.log("RPL" + ethers.parseEther(RPLToLend))

        console.log("ALLOWANCE" + ethers.parseEther(poolAllowance.toString()))










        try {

            console.log("Running Create Lending Pool...")
            let browserProvider = new ethers.BrowserProvider((window as any).ethereum)


            let signer = await browserProvider.getSigner()

            // Only required when `chainId` is not provided in the `Provider` constructor

            const storageContract = new ethers.Contract(storageAddress, storageABI, signer);

            console.log("It makes it here...")


            const tokenAddress = await storageContract["getAddress(bytes32)"](ethers.id("contract.addressrocketTokenRPL"));


            console.log("Then here...")

            const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);




            const val = ethers.parseEther(RPLToLend);

            console.log("HERE?")

            const approvalTx = await tokenContract.approve(currentRocketlendAddress, val);
            console.log("Approval transaction:", approvalTx.hash);



            console.log("And then here...")


            const approvalReceipt = await approvalTx.wait()


            if (approvalReceipt.status === 1) {

                const rocketlendContract = new ethers.Contract(currentRocketlendAddress, rocketlendABI, signer);
                const latestBlockNum = await browserProvider.getBlockNumber();


                console.log(latestBlockNum)

                console.log(latestBlockNum - 10000)

                const tx = await rocketlendContract.createPool(PoolParams, val, ethers.parseEther(poolAllowance.toString()))

                //  console.log(data)

                const receipt = await tx.wait();

                if (receipt.status === 1) {

                   const data = await getPoolLogs();
                    alert("Sucessfully created a Pool")

                }


            } else {
                alert("ERROR: The approval was not a success. Pleas try again.")
            }






        } catch (e: any) {


            console.log(e)

            alert(e)


        }


    }





    const registerLenderVersion2 = async () => {

        try {

            console.log("Running get Registration logs")
            let browserProvider = new ethers.BrowserProvider((window as any).ethereum)

            let signer = await browserProvider.getSigner()
            const account = new ethers.Wallet('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80').connect(browserProvider)

            const rocketlend = new ethers.Contract(currentRocketlendAddress,
                ['function registerLender() returns (uint256)', 'event RegisterLender (uint256 indexed id, address indexed who)'], signer)

            const tx = await rocketlend.registerLender()

            const receipt = await tx.wait()
            console.log(`Submitted tx with hash ${receipt.hash} @ ${receipt.blockNumber}`)

            const logsFromReceipt = receipt.logs.map((log: any) => rocketlend.interface.parseLog(log))

            const stringifyBI = (x: any) => JSON.stringify(x, (_, v) => typeof v === 'bigint' ? v.toString() : v)

            console.log(`Logs from receipt: ${stringifyBI(logsFromReceipt)}`)

            const logsFromRange = await rocketlend.queryFilter('RegisterLender', receipt.blockNumber - 1, receipt.blockNumber + 1)

            console.log(`Logs from range: ${stringifyBI(logsFromRange)}`)
            const data = await getRegistrationLog()



        } catch (e: any) {


            console.log(e)

            alert(e)


        }


    }












    const [sliderValue, setSliderValue] = useState<number>(0);
    const [sliderValue2, setSliderValue2] = useState<number>(0);
    const [sliderValue3, setSliderValue3] = useState<number>(0);



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setDateTime(value);

        // Convert the datetime-local value to milliseconds
        const date = new Date(value);
        let milliseconds = date.getTime();
        const currentMilliseconds = Date.now();


        setMilliseconds(milliseconds)


        let newDays = Math.floor((milliseconds - currentMilliseconds) / 86400000)


        setDays(newDays)
    };


    const handleRPLToLend = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setRPLToLend(value)
    }


    const handleInterest = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInterest(Number(value))
    }



    const [interestEarned, setInterestEarned] = useState(BigInt(0))


    const handleInterestEarned = () => {
        const newInterestEarned = (BigInt(sliderValue2 * 86400000) * BigInt(sliderValue3) * BigInt(sliderValue)) / ethers.parseUnits("1", "wei")
        console.log(newInterestEarned)
        setInterestEarned(newInterestEarned)
    }





    useEffect(() => {

        console.log("RPL for estimate:" + sliderValue)
        console.log("Milliseconds for estimate:" + sliderValue2)
        console.log("Interest for estimate: " + sliderValue3)

        handleInterestEarned();

    }, [sliderValue, sliderValue2, sliderValue3])





    const handlePoolInterestRate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPoolInterestRate(Number(value))


    }

    const handlePoolAllowance = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPoolAllowance(Number(value))
    }







    return (
        <div style={{ backgroundColor: "#eeeff2" }} >
            <Head>
                <title>Rocketlend</title>
                <meta
                    content="Rocketlend"
                    name="description"
                />
                <link href="/favicon.ico" rel="icon" />
            </Head>


            <Navbar />



            {address !== undefined ? (

                <div className="min-h-[92vh]  h-auto  flex flex-col items-center justify-center ">

                    {registrationChecked ? (

                        <div className="w-full h-auto flex lg:flex-row flex-col  items-center justify-center gap-10 mt-[0vh] mt-[7vh]">

                            <div className="w-auto h-auto rounded-[20px] shadow-lg p-[20px]  gap-2 bg-[#fff] flex flex-col items-center justify-center ">

                                <h2 className="text-2xl font-bold mb-3 max-w-[80%] text-center">Interest Earned Calculator</h2>
                                <p className='text-center max-w-[80%]'>Estimate your interest rewards based on the values entered into the Create Pool form</p>
                                <SliderComponent min={0} max={Number(RPLToLend)} onChange={setSliderValue} />
                                <p>RPL borrowed: {sliderValue}</p>
                                <SliderComponent min={0} max={days} onChange={setSliderValue2} />
                                <p>Borrow time:  {sliderValue2} Days</p>
                                <SliderComponent min={0} max={100} onChange={setSliderValue3} />
                                <p className='text-center max-w-[80%]'>{sliderValue3} attoRPL per RPL borrowed per second.</p>


                                <p className="my-4 text-xl text-center max-w-[80%] min-w-[80%] font-bold text-green-400">{ethers.formatEther(interestEarned)} interest earned...</p>


                            </div>


                            <div className="w-auto h-auto rounded-[20px] shadow-lg p-[20px]  gap-4 bg-[#fff] flex flex-col items-center justify-center ">
                                <h2 className="text-2xl font-bold mb-3 max-w-[80%] text-center">Create a Lending Pool</h2>

                                <span>Current Protocol Fee: {(currentProtocol.feeNumerator).toString()}</span>

                                <label className='flex flex-col items-center justify-center'>
                                    <span className='mb-1 text-lg text-gray-400'>RPL for lending:</span>
                                    <input value={RPLToLend} onChange={handleRPLToLend} className="border border-black-200 shadow-lg text-black-500" type="text" />
                                </label>
                                <label className='flex flex-col items-center justify-center'>
                                    <span className='mb-1 text-lg text-gray-400'>Interest Rate:</span>
                                    <input value={poolInterestRate} onChange={handlePoolInterestRate} className="border border-black-200 shadow-lg text-black-500" type="text" />
                                </label>  <label className='flex flex-col items-center justify-center'>
                                    <span className='mb-1 text-lg text-gray-400'>Allowance:</span>
                                    <input value={poolAllowance} onChange={handlePoolAllowance} className="border border-black-200 shadow-lg text-black-500" type="text" />
                                </label>
                                <label className='flex flex-col items-center justify-center '>

                                    <span className='mb-1 text-lg text-gray-400'>End Time:</span>
                                    <input

                                        className="w-[60%] self-center border shadow-lg text-black-500 "
                                        type="datetime-local"
                                        id="datetime"
                                        value={dateTime}
                                        onChange={handleChange}
                                    />
                                </label>





                                <button className={styles.uniButton} onClick={createLendingPool}>CREATE</button>




                            </div>







                        </div>


                    ) :

                        (

                            <div className=" min-h-[92vh] flex flex-col items-center justify-center gap-2 mt-[0vh] lg:mt-[7vh]">



                                <div className="w-[250px] h-[250px] rounded-full shadow-lg overflow-hidden bg-[#fff] flex flex-col items-center justify-center mb-9">
                                    <Image
                                        height={250}
                                        width={250}
                                        src={'/images/rocketlend-nobg.png'}
                                        alt="Vrun logo"
                                        className="rounded-full"
                                    />
                                </div>




                                <h2 style={{ color: "rgb(110 117 124)" }} className="text-xl mb-[1vh] text-center w-[90%]">Register with Rocketlend as a <span style={{ color: "rgb(255 110 48)" }}>Lender</span> to begin</h2>
                                <div className="flex items-center justify-center gap-3 mb-[0vh] lg:mb-[6vh]">
                                    <button className={styles.uniButton} onClick={registerLenderVersion2}>Register</button>

                                </div>

                            </div>

                        )




                    }






                </div>


            ) :

                (

                    <div className="min-h-[92vh] h-auto  flex flex-col items-center justify-center ">

                        <div className="flex flex-col items-center justify-center gap-2 mt-[0vh] lg:mt-[7vh]">


                            <MdNoAccounts style={{ fontSize: "200px", color: "#BAC3CA" }} />


                            <h2 style={{ color: "rgb(110 117 124)" }} className="text-xl mb-[1vh] text-center w-[90%]">Connect your <span style={{ color: "rgb(255 110 48)" }}>Wallet</span> to begin</h2>
                            <div className="flex items-center justify-center gap-3 mb-[0vh] lg:mb-[6vh]">
                                <ConnectButton.Custom>
                                    {({
                                        account,
                                        chain,
                                        openAccountModal,
                                        openChainModal,
                                        openConnectModal,
                                        authenticationStatus,
                                        mounted,
                                    }) => {
                                        // Note: If your app doesn't use authentication, you
                                        // can remove all 'authenticationStatus' checks
                                        const ready = mounted && authenticationStatus !== 'loading';
                                        const connected =
                                            ready &&
                                            account &&
                                            chain &&
                                            (!authenticationStatus ||
                                                authenticationStatus === 'authenticated');

                                        return (
                                            <div
                                                {...(!ready && {
                                                    'aria-hidden': true,
                                                    'style': {
                                                        opacity: 0,
                                                        pointerEvents: 'none',
                                                        userSelect: 'none',
                                                    },
                                                })}
                                            >
                                                {(() => {
                                                    if (!connected) {
                                                        return (
                                                            <button className={styles.uniButton} onClick={openConnectModal} type="button">
                                                                Connect Wallet
                                                            </button>
                                                        );
                                                    }

                                                    if (chain.unsupported) {
                                                        return (
                                                            <button className={styles.uniButton} onClick={openChainModal} type="button">
                                                                Wrong network
                                                            </button>
                                                        );
                                                    }

                                                    return (
                                                        <div className={styles.walletContainer} style={{ display: 'flex', gap: 12 }}>
                                                            <button className={styles.chainIcon}

                                                                onClick={openChainModal}
                                                                style={{ display: 'flex', alignItems: 'center' }}
                                                                type="button"
                                                            >
                                                                {chain.hasIcon && (
                                                                    <div


                                                                        style={{
                                                                            background: chain.iconBackground,
                                                                            width: 25,
                                                                            height: 25,
                                                                            borderRadius: 999,
                                                                            overflow: 'hidden',
                                                                            marginRight: 8,
                                                                        }}
                                                                    >
                                                                        {chain.iconUrl && (
                                                                            <img
                                                                                alt={chain.name ?? 'Chain icon'}
                                                                                src={chain.iconUrl}
                                                                                style={{ width: 25, height: 25 }}
                                                                            />
                                                                        )}
                                                                    </div>
                                                                )}
                                                                {chain.name}
                                                            </button>

                                                            <button className={styles.accountIcon} onClick={openAccountModal} type="button">
                                                                {account.displayName}
                                                                {account.displayBalance
                                                                    ? ` (${account.displayBalance})`
                                                                    : ''}
                                                            </button>
                                                        </div>
                                                    );
                                                })()}
                                            </div>
                                        );
                                    }}
                                </ConnectButton.Custom>

                            </div>

                        </div>

                    </div>

                )}




<PoolList/>

<Footer/>

        </div>
    );
};

export default Lender;
