import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Navbar from '../components/navbar';
import Image from 'next/image';
import PoolList from '../components/poolList';
import { MdNoAccounts } from "react-icons/md";
import { useAccount, useChainId } from 'wagmi';
import { ethers } from 'ethers';
import rocketlendABI from "../json/rocketlendABI.json"
import { useEffect } from 'react';


const Lender: NextPage = () => {








    const { address } = useAccount({


    })

    const currentRocketlendAddress = "0x2c8ED11fd7A058096F2e5828799c68BE88744E2F";


    const getRegistrationLog = async () => {

        try {

            console.log("Running get Registration logs")
            let browserProvider = new ethers.BrowserProvider((window as any).ethereum)


            let signer = await browserProvider.getSigner()

            // Only required when `chainId` is not provided in the `Provider` constructor


            const rocketlendContract = new ethers.Contract(currentRocketlendAddress, rocketlendABI, signer);
            const latestBlockNum = await browserProvider.getBlockNumber();


            console.log(latestBlockNum)

            console.log(latestBlockNum - 10000)

            const data = await rocketlendContract.queryFilter("RegisterLender", 1659117, 1659119)

            console.log(data)


        } catch (e: any) {


            console.log(e)

            alert(e)


        }


    }




    useEffect(() => {

        if (address !== undefined) {
            getRegistrationLog();
        }



    }, [address])





    const registerLender = async () => {


        try {

            console.log("Running register")
            let browserProvider = new ethers.BrowserProvider((window as any).ethereum)


            let signer = await browserProvider.getSigner()

            // Only required when `chainId` is not provided in the `Provider` constructor


            const rocketlendContract = new ethers.Contract(currentRocketlendAddress, rocketlendABI, signer);


            const tx = await rocketlendContract.registerLender()

            const receipt = await tx.wait()


            console.log(receipt)


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
                            <button className={styles.uniButton} onClick={registerLender}>Register</button>

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
