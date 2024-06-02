import React, { useEffect } from 'react'
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import { ethers } from 'ethers';

import { useAccount, useChainId } from 'wagmi';



const Navbar: NextPage = () => {


  const { address } = useAccount({

  })


  const currentChain = useChainId();
  const storageAddress = currentChain === 17000 ? "0x594Fb75D3dc2DFa0150Ad03F99F97817747dd4E1" : "0x1d8f8f00cfa6758d7bE78336684788Fb0ee0Fa46"
  const nullAddress = "0x0000000000000000000000000000000000000000";












  return (


    <header style={{ backgroundColor: "#e4ebf0" }} className="p-2 w-full h-auto bg-white flex flex-col items-center justify-center sticky top-0 z-50 shadow-md lg:h-[8vh]">

      <div className="mx-auto w-[90%] flex items-center justify-center gap-5">
        <div className="flex h-14 items-center  justify-between w-full rounded-lg md:px-3">





          <div className="hidden items-center justify-center gap-8 lg:flex ">
            <Link className="flex flex-row items-left justify-center gap-2" href="/">
              <Image
                height={30}
                width={30}
                src={'/images/rocketlogo.webp'}
                alt="Vrun logo"
                className="rounded-full"
              />
              <span className="text-lg xl:text-2xl font-bold">
                ROCKET LEND
              </span>

            </Link>

            {/*  <Link href="/payments" className="hover:text-gray-600">
              Payments
            </Link>

            <Link href="/rpl" className=" hover:text-gray-600">
              RPL
  </Link>*/}
          </div>
          <div className="shrink-0">


          </div>
          <nav className="flex grow  w-full lg:w-auto ">
            <ul className="flex grow flex-wrap gap-x-5  sm:pl-5 items-center justify-center lg:justify-end">



              <li className=" ml-0 lg:ml-1">
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
                            <div  className={styles.walletContainer} style={{ display: 'flex', gap: 12 }}>
                              <button
                               className={styles.chainIcon}
                                onClick={openChainModal}
                                style={{ display: 'flex', alignItems: 'center' }}
                                type="button"
                              >
                                {chain.hasIcon && (
                                  <div

                                 
                                    style={{
                                      background: chain.iconBackground,
                                      width: 12,
                                      height: 12,
                                      borderRadius: 999,
                                      overflow: 'hidden',
                                      marginRight: 4,
                                    }}
                                  >
                                    {chain.iconUrl && (
                                      <img
                                        alt={chain.name ?? 'Chain icon'}
                                        src={chain.iconUrl}
                                        style={{ width: 12, height: 12 }}
                                      />
                                    )}
                                  </div>
                                )}
                                {chain.name}
                              </button>

                              <button  className={styles.accountIcon} onClick={openAccountModal} type="button">
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
              </li>
              {/*

                address !== undefined ? (<li className="ml-1 hidden lg:block">
                  <Link href="/account" className=" hover:text-gray-600">
                    Go to Account
                  </Link>
                </li>) : (<></>)
*/}

            </ul>



          </nav>


        </div>


      </div>






    </header>

  )
}

export default Navbar


