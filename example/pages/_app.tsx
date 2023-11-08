import { Web3ReactHooks, Web3ReactProvider } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { AppProps } from "next/app";
import React, { useEffect } from "react";
import Script from 'next/script'

import { hooks as metaMaskHooks, metaMask } from "../connectors/metaMask";

const connectors: [MetaMask, Web3ReactHooks][] = [[metaMask, metaMaskHooks]];

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    async function handlePersistentConnection() {
      const provider = localStorage.getItem("provider");
      try {
        if (provider === "MetaMask") {
          await metaMask.connectEagerly();
        }
      } catch {
        console.log("Re-connection Failed");
      }
    }
    handlePersistentConnection().then();
    window.addEventListener("load", () => {
      handlePersistentConnection().then();
    });
    return () => {
      window.removeEventListener("load", () => {
        handlePersistentConnection().then();
      });
    };
  }, []);
  return (
      <>

        <head>
          <title>MetaMask Encrypt/Decrypt</title>
          <meta name="description" content="MetaMask Encrypt and decrypt tools" />
          <meta property="og:title" content="MetaMask Encrypt/Decrypt" />
          <meta property="og:description" content="MetaMask Encrypt and decrypt tools" />
          <meta property="og:url" content="https://metamask-encrypt-decrypt.dandelionlabs.io/" />
          <meta property="og:type" content="website" />
          <Script src="https://www.googletagmanager.com/gtag/js?id=G-YVFR36G469" />
          <Script id="google-analytics">
              {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
   
            gtag('config', 'G-YVFR36G469');
          `}
          </Script>
        </head>
        <Web3ReactProvider connectors={connectors}>
          <Component {...pageProps} />
        </Web3ReactProvider>
      </>
  );
}
