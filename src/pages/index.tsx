import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Rocket Lend</title>
        <meta
          content="Frontend for Rocket Lend: lending protocol for staked RPL"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <ConnectButton />

        <h1 className={styles.title}>
          Welcome to Rocket Lend!
        </h1>

        <p className={styles.description}>
          The immutable protocol for borrowing and lending staked <a href="https://etherscan.io/address/0xd33526068d116ce69f19a9ee46f0bd304f21a51f">RPL</a> for use on <a href="https://rocketpool.net">Rocket Pool</a> nodes.
        </p>

        <div className={styles.grid}>
          <a className={styles.card} href="lender">
            <h2>Lend RPL to be Staked</h2>
            <p>Get started as a Lender!</p>
            <p>Earn interest on your RPL.</p>
          </a>

          <a className={styles.card} href="borrower">
            <h2>Borrow RPL for your Node</h2>
            <p>Get RPL to stake on Rocket Pool!</p>
            <p>No extra collateral required.</p>
          </a>

          <a className={styles.card} href="explorer">
            <h2>Rocket Lend Explorer</h2>
            <p>See active loans and pools.</p>
          </a>

          <a
            className={styles.card}
            href="docs"
          >
            <h2>Docs and Info</h2>
            <p>How Rocket Lend works.</p>
          </a>

        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://github.com/rocketlend/frontend" rel="noopener noreferrer" target="_blank">
          Rocket Lend is Free Software available on GitHub.
        </a>
      </footer>
    </div>
  );
};

export default Home;
