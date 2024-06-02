import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Navbar from '../components/navbar';
import Image from 'next/image';
import PoolList from '../components/poolList';

const Home: NextPage = () => {
  return (
    <div   style={{backgroundColor: "#BAC3CA"}} className="">
      <Head>
        <title>Rocketlend</title>
        <meta
          content="Rocketlend"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

     
        <Navbar/>

        <div className="h-[92vh]  flex flex-col items-center justify-center lg:justify-between">

          <div className="flex flex-col items-center justify-center gap-0.5 mt-[0vh] lg:mt-[7vh]">


            
          <Image
                height={530}
                width={530}
                src={'/images/rocketlend-nobg.png'}
                alt="Vrun logo"
                className="rounded-full"
              />




            <div className="flex items-center justify-center gap-3 mb-[0vh] lg:mb-[6vh]">

              <button className={styles.uniButton}>Borrowing</button>
              <button className={styles.uniButton}>Lending</button>

            </div>

          </div>



        </div>

        <PoolList/>
     

      
   
    </div>
  );
};

export default Home;
