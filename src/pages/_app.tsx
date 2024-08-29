import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import Layout from "../components/layout";
import { Radio_Canada, Fredoka, Murecho, Ysabeau_Infant, Karla, Work_Sans } from "next/font/google";

import { config } from "../wagmi";

const client = new QueryClient();

const workSans = Work_Sans({
  subsets: ["latin"],
});
const karla = Karla({
  subsets: ["latin"],
})
const ysabeau = Ysabeau_Infant({
  subsets: ["latin"],
})
const murecho = Murecho({
  subsets: ["latin"],
})
const fredoka = Fredoka({
  subsets: ["latin"],
})
const radioCanada = Radio_Canada({
  subsets: ["latin"],
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${radioCanada.style.fontFamily};
        }
      `}</style>
      <WagmiProvider config={config}>
        <QueryClientProvider client={client}>
          <RainbowKitProvider>
            <Layout>
              <Head>
                <title>Rocket Lend</title>
                <meta
                  content="Frontend for Rocket Lend: lending protocol for staked RPL"
                  name="description"
                />
                <link href="/favicon.ico" rel="icon" />
              </Head>
              <Component {...pageProps} />
            </Layout>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}

export default MyApp;
