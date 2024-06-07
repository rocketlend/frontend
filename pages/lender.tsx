import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Navbar from '../components/navbar';
import Image from 'next/image';
import PoolList from '../components/poolList';
import { MdNoAccounts } from "react-icons/md";
import { useAccount, useChainId } from 'wagmi';
import { Signature, ethers } from 'ethers';
import rocketlendABI from "../json/rocketlendABI.json"
import { useEffect, useState } from 'react';


const Lender: NextPage = () => {








    const { address } = useAccount({


    })

    const currentRocketlendAddress = "0x975Ab64F4901Af5f0C96636deA0b9de3419D0c2F";
    const receiptHashForDebugging = "0xb0ac69aadfe6ee2d867bc8d9f00dacd74b87781043c8ce9b7d0d66f67b89ec87"

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






    const [registrationChecked, setRegistrationChecked] = useState(false)
    const [lenderId, setLenderId] = useState(0)




    useEffect(() => {

        console.log(registrationChecked + " and " + lenderId)

    }, [lenderId])




    
    const getRegistrationLog = async () => {

        try {

            console.log("Running get Registration logs")
            let browserProvider = new ethers.BrowserProvider((window as any).ethereum)


            let signer = await browserProvider.getSigner()



            const rocketlendContract = new ethers.Contract(currentRocketlendAddress, rocketlendABI, signer);
            const latestBlockNum = await browserProvider.getBlockNumber();


            console.log(latestBlockNum)

            console.log(latestBlockNum - 10000)

            const data = await rocketlendContract.queryFilter("RegisterLender", latestBlockNum - 10000, latestBlockNum)

            console.log(data)


            if(data.length > 0) {


                setRegistrationChecked(true)


                const realReceipt = await browserProvider.getTransactionReceipt(data[0].transactionHash)


                const logsFromReceipt = realReceipt !== null ? realReceipt.logs.map((log: any) => rocketlendContract.interface.parseLog(log)) : []

                if( logsFromReceipt[0] !== null ) {
                    console.log(logsFromReceipt[0].args[0])
                    setLenderId(logsFromReceipt[0].args[0])


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





    const createLendingPool = async () => {

        try {

            console.log("Running get Registration logs")
            let browserProvider = new ethers.BrowserProvider((window as any).ethereum)


            let signer = await browserProvider.getSigner()

            // Only required when `chainId` is not provided in the `Provider` constructor


            const rocketlendContract = new ethers.Contract(currentRocketlendAddress, rocketlendABI, signer);
            const latestBlockNum = await browserProvider.getBlockNumber();


            console.log(latestBlockNum)

            console.log(latestBlockNum - 10000)

          //  const data = await rocketlendContract.createPool(_params: PoolParams, _andSupply: uint256, _allowance: uint256)

          //  console.log(data)


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

            const rocketlend = new ethers.Contract('0x975Ab64F4901Af5f0C96636deA0b9de3419D0c2F',
                ['function registerLender() returns (uint256)', 'event RegisterLender (uint256 indexed id, address indexed who)'], signer)

            const tx = await rocketlend.registerLender()

            const receipt = await tx.wait()
            console.log(`Submitted tx with hash ${receipt.hash} @ ${receipt.blockNumber}`)

            const logsFromReceipt = receipt.logs.map((log: any) => rocketlend.interface.parseLog(log))

            const stringifyBI = (x: any) => JSON.stringify(x, (_, v) => typeof v === 'bigint' ? v.toString() : v)

            console.log(`Logs from receipt: ${stringifyBI(logsFromReceipt)}`)

            const logsFromRange = await rocketlend.queryFilter('RegisterLender', receipt.blockNumber - 1, receipt.blockNumber + 1)

            console.log(`Logs from range: ${stringifyBI(logsFromRange)}`)



        } catch (e: any) {


            console.log(e)

            alert(e)


        }


    }










 













    return (
        <div style={{ backgroundColor: "#eeeff2" }} className="">
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

                <div className="h-[92vh]  flex flex-col items-center justify-center ">

                    <div className="flex flex-col items-center justify-center gap-2 mt-[0vh] lg:mt-[7vh]">



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

                </div>


            ) :

                (

                    <div className="h-[92vh]  flex flex-col items-center justify-center ">

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






        </div>
    );
};

export default Lender;
