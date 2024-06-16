import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { getDefaultWallets, RainbowKitProvider, darkTheme, lightTheme } from '@rainbow-me/rainbowkit';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiConfig } from 'wagmi';
import { configureChains, createConfig } from 'wagmi';

import {

  holesky, mainnet

} from 'wagmi/chains';

import {Providers} from "../globalredux/provider"



const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    holesky,
    //polygon,
    //optimism,
    //arbitrum,
   // base,
    //zora,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [holesky] : []),
  ],
  [ 
  jsonRpcProvider({
    rpc: () => ({
      http: `http://127.0.0.1:56767`,
    }),
  })
   ]
);

//currentChain === 17000 ?   'https://ultra-holy-road.ethereum-holesky.quiknode.pro/b4bcc06d64cddbacb06daf0e82de1026a324ce77/'    :
// "https://chaotic-alpha-glade.quiknode.pro/2dbf1a6251414357d941b7308e318a279d9856ec/"

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  projectId: '64fa04740ab4284806bd0df2ea67c791',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors,
  publicClient,
  webSocketPublicClient,
});

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider 
      chains={chains}
    
      >
         
   
        <Component {...pageProps} />
  
      </RainbowKitProvider>
    </WagmiConfig>
    </Providers>
  
  );
}

export default MyApp;
