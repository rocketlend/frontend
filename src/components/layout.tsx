import { ConnectButton } from '@rainbow-me/rainbowkit';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

function Navbar() {
  return (
    <div className='flex gap-2'>
      <a href='/'>Home</a>
      <a href='borrower'>Borrower</a>
      <a href='lender'>Lender</a>
      <a href='explorer'>Explorer</a>
      <a href='docs'>Docs</a>
      <ConnectButton />
    </div>
  )
};

export default function Layout({ children }) {
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
    <Navbar />
    <main className={styles.main}>
      {children}
    </main>
    <footer className={styles.footer}>
      <a href="https://github.com/rocketlend/frontend" rel="noopener noreferrer" target="_blank">
        Rocket Lend is Free Software available on GitHub.
      </a>
    </footer>
    </div>
  )
};
