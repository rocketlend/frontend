import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Navbar from '../components/navbar';
import Image from 'next/image';
import PoolList from '../components/poolList';
import { MdNoAccounts } from "react-icons/md";
import { useAccount, useChainId } from 'wagmi';
import { EventLog, Signature, ethers, Log } from 'ethers';
import rocketlendABI from "../json/rocketlendABI.json"
import { useEffect, useState } from 'react';
import SliderComponent from '../components/slider';
import storageABI from "../json/storageABI.json"
import tokenABI from "../json/tokenABI.json"
import Footer from '../components/footer';
import NoRegistration from '../components/noRegistration';
import managerABI from "../json/managerABI.json"


const Borrower: NextPage = () => {


    const { address } = useAccount({
        onConnect: ({ address }) => {
            getBorrowRegistrationLog()
        }
    })

    const currentRocketlendAddress = "0x2F54D1563963fC04770E85AF819c89Dc807f6a06";



    const [registrationChecked, setRegistrationChecked] = useState(false)




    function findLargestBlockNumber(objects: Array<any>) {
        if (objects.length === 0) {
            return null; // Return null if the array is empty
        }
    
        return objects.reduce((maxObj, currentObj) => {
            return (currentObj.blockNumber > maxObj.blockNumber) ? currentObj : maxObj;
        });
    }


    const getBorrowRegistrationLog = async () => {

        try {

            console.log("Running get Borrow Registration logs")
            let browserProvider = new ethers.BrowserProvider((window as any).ethereum)


            let signer = await browserProvider.getSigner()



            const rocketlendContract = new ethers.Contract(currentRocketlendAddress, rocketlendABI, signer);
            const latestBlockNum = await browserProvider.getBlockNumber();


            console.log(latestBlockNum)

            console.log(latestBlockNum - 10000)

            const data: Array<any> = await rocketlendContract.queryFilter("JoinProtocol", latestBlockNum - 10000, latestBlockNum)


            const leaveData: Array<any> = await rocketlendContract.queryFilter("LeaveProtocol", latestBlockNum - 1000, latestBlockNum)

            console.log(data)

            console.log(leaveData)


            let newArray: Array<any> = [...data, ...leaveData]



           const latestLog =  findLargestBlockNumber(newArray)


      


           if (latestLog.fragment.name === "JoinProtocol") {

            setRegistrationChecked(true)

            console.log("Checked true")

           } else {

            setRegistrationChecked(false)
            console.log("Checked false")

           }





            /*    if (data.length > 0) {
    
    
    
    
    
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
                                  
    
    
                                    return;
    
    
                                }
    
                            }
    
    
                        }
    
                    }
    
    
    
    
    
                } else {
    
                } */









        } catch (e: any) {


            console.log(e)

            alert(e)


        }


    }





    useEffect(() => {

        getBorrowRegistrationLog();


    }, [])








    const currentChain = useChainId();

    const storageAddress = currentChain === 17000 ? "0x594Fb75D3dc2DFa0150Ad03F99F97817747dd4E1" : "0x1d8f8f00cfa6758d7bE78336684788Fb0ee0Fa46"






    const handleJoinAsBorrower = async () => {


        try {

            console.log("Running get Registration logs")
            let browserProvider = new ethers.BrowserProvider((window as any).ethereum)

            let signer = await browserProvider.getSigner()
            //const account = new ethers.Wallet('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80').connect(browserProvider)

            const rocketlend = new ethers.Contract(currentRocketlendAddress,
                rocketlendABI, signer)


            console.log("HERE!")

            const tx = await rocketlend.joinAsBorrower(address)

            const receipt = await tx.wait()
            console.log(`Submitted tx with hash ${receipt.hash} @ ${receipt.blockNumber}`)

            const logsFromReceipt = receipt.logs.map((log: any) => rocketlend.interface.parseLog(log))

            const stringifyBI = (x: any) => JSON.stringify(x, (_, v) => typeof v === 'bigint' ? v.toString() : v)

            console.log(`Logs from receipt: ${stringifyBI(logsFromReceipt)}`)

            const logsFromRange = await rocketlend.queryFilter('JoinProtocol', receipt.blockNumber - 1, receipt.blockNumber + 1)

            console.log(`Logs from range: ${stringifyBI(logsFromRange)}`)
            const data = await getBorrowRegistrationLog()



        } catch (e: any) {


            console.log(e)

            alert(e)


        }





    }

    const handleLeaveAsBorrower = async () => {

        //leaveAsBorrower(_node: address)

    }







    //joinAsBorrower(_node: address)
    //leaveAsBorrower(_node: address)





    useEffect(() => {

        console.log(registrationChecked)

    }, [registrationChecked])





    const handleChangeWithdrawalToRocketlend = async () => {


        try {

            let browserProvider = new ethers.BrowserProvider((window as any).ethereum)
            let signer = await browserProvider.getSigner()

            const storageContract = new ethers.Contract(storageAddress, storageABI, signer);



            const tx = await storageContract.setWithdrawalAddress(address, currentRocketlendAddress, true)


            const receipt = await tx.wait();


            if (receipt.status === 1) {


                alert("Successfully changed Withdrawal Address!")




            } else {
                alert("Transaction was not a success!")
            }





        } catch (e: any) {

            alert(e)

        }



    }



    const [isRocketRegistered, setIsRocketRegistered] = useState(false)



    const rocketRegistrationCheck = async () => {

        if (typeof (window as any).ethereum !== "undefined") {

            console.log("Reg Spot 1")

            try {



                let browserProvider = new ethers.BrowserProvider((window as any).ethereum)
                let signer = await browserProvider.getSigner()

                const storageContract = new ethers.Contract(storageAddress, storageABI, signer);
                console.log("Storage Contract:" + storageContract)

                const NodeManagerAddress = await storageContract["getAddress(bytes32)"](ethers.id("contract.addressrocketNodeManager"))

                const rocketNodeManager = await new ethers.Contract(NodeManagerAddress, managerABI, signer)
                console.log("Rocket Node Manager:" + rocketNodeManager)
                const bool = await rocketNodeManager.getNodeExists(address)




                console.log("Bool:" + bool)

                setIsRocketRegistered(bool);

                console.log("Definitely running")

                return bool;

            } catch (error) {

                console.log(error)

                return false;

            }



        }
        else {

            console.log("Window not working")


            return false;

        }


    }






    useEffect(() => {

        const rocketRegistrationCheck = async () => {

            if (typeof (window as any).ethereum !== "undefined") {

                console.log("Reg Spot 1")

                try {



                    let browserProvider = new ethers.BrowserProvider((window as any).ethereum)
                    let signer = await browserProvider.getSigner()

                    const storageContract = new ethers.Contract(storageAddress, storageABI, signer);
                    console.log("Storage Contract:" + storageContract)

                    const NodeManagerAddress = await storageContract["getAddress(bytes32)"](ethers.id("contract.addressrocketNodeManager"))

                    const rocketNodeManager = await new ethers.Contract(NodeManagerAddress, managerABI, signer)
                    console.log("Rocket Node Manager:" + rocketNodeManager)
                    const bool = await rocketNodeManager.getNodeExists(address)




                    console.log("Bool:" + bool)

                    setIsRocketRegistered(bool);

                    console.log("Definitely running")

                    return bool;

                } catch (error) {

                    console.log(error)

                    return false;

                }



            }
            else {

                console.log("Window not working")


                return false;

            }


        }


        rocketRegistrationCheck();



    }, [])
















    return (
        <div style={{ backgroundColor: "#eeeff2" }}>
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
                <>


                    {isRocketRegistered ? (



                        <div className="min-h-[92vh]  h-auto  flex flex-col items-center justify-center ">

                            {registrationChecked ? (

                                <div className="w-full h-auto flex lg:flex-row flex-col  items-center justify-center gap-10 mt-[0vh] mt-[7vh]">




                                    <div className="w-auto h-auto rounded-[20px] shadow-lg p-[20px]  gap-4 bg-[#fff] flex flex-col items-center justify-center ">
                                        <h2 className="text-2xl font-bold mb-3 max-w-[80%] text-center">Exit Borrower Registration</h2>
                                        <p className='max-w-[80%] text-center'>Your Withdrawal Address will be reverted to default and you will no longer be able to access Lending Pools unless your re-register</p>




                                        <p>


                                        </p>


                                        <button onClick={() => { handleLeaveAsBorrower() }} className={styles.uniButton} >LEAVE AS BORROWER</button>




                                    </div>











                                </div>


                            ) :

                                (

                                    <div className=" w-full min-h-[92vh] flex flex-col lg:flex-row items-center justify-center gap-5 mt-[0vh] lg:mt-[7vh]">


                                        <div className="w-auto h-auto rounded-[20px] shadow-lg p-[20px]  gap-4 bg-[#fff] flex flex-col items-center justify-center" >
                                            <div className="w-[250px] h-[250px] rounded-full shadow-lg overflow-hidden bg-[#fff] flex flex-col items-center justify-center mb-5">
                                                <Image
                                                    height={250}
                                                    width={250}
                                                    src={'/images/rocketlend-nobg.png'}
                                                    alt="Vrun logo"
                                                    className="rounded-full"
                                                />
                                            </div>




                                            <h2 style={{ color: "rgb(110 117 124)" }} className="text-xl mb-[1vh] text-center w-[90%]">Join Rocketlend as a <span style={{ color: "rgb(255 110 48)" }}>Borrower</span> to begin</h2>

                                            <div className="flex items-center justify-center gap-3 mb-[0vh] lg:mb-[6vh]">
                                                <button className={styles.uniButton} onClick={handleJoinAsBorrower}>Register</button>

                                            </div>
                                        </div>


                                        <div className=" lg:max-w-[50%] h-auto rounded-[20px] shadow-lg p-[20px]  gap-4 bg-[#fff] flex flex-col items-center justify-center ">
                                            <h2 className="text-2xl font-bold mb-3  text-center">Need to change your Withdrawal Address to the Rocketlend address?</h2>
                                            <p className=' text-center'>This is a condition of using the Rocketlend Borrowing service and the Register function will revert, as your collateral will used as a Desposit against your RPL borrowed</p>

                                            <button className={styles.uniButton} onClick={() => { handleChangeWithdrawalToRocketlend() }}>CHANGE</button>


                                        </div>

                                    </div>

                                )

                            }






                        </div>




                    ) : (



                        <NoRegistration onRegistrationResult={rocketRegistrationCheck} />

                    )


                    }


                </>



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

            <PoolList />




            <Footer />

        </div>
    );
};

export default Borrower;
