import { Web3ReactHooks, Web3ReactProvider } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { AppProps } from "next/app";
import React, { useEffect } from "react";
import Script from 'next/script'
import Head from 'next/head'

import { hooks as metaMaskHooks, metaMask } from "../connectors/metaMask";
import {Footer} from "../components/Footer";
import styled from "styled-components";
import {Header} from "../components/Header";

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
        <Head>
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
        </Head>
        <AppContainer>
          <Background>
            <div className="wave" />
            <div className="wave" />
            <div className="wave" />
          </Background>
          <Web3ReactProvider connectors={connectors}>
            <MainContainer>
              <Header />
              <Component {...pageProps} />
              <Footer />
            </MainContainer>
          </Web3ReactProvider>
        </AppContainer>
      </>
  );
}

const AppContainer = styled.main`
  top:0;
  left:0;
  margin: -8px;
  font-style: normal;
  line-height: normal;
  height:100%;
  font-weight: 400;
  font-family: 'Montserrat', sans-serif;
`

const MainContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  min-height:100%;
  padding-bottom: 150px;
`

const Background = styled.div`

  @keyframes gradient {
    0% {
      background-position: 0 0;
    }
    50% {
      background-position: 100% 100%;
    }
    100% {
      background-position: 0 0;
    }
  }
  position: fixed;
  height: 100vh;
  width: 100vw;
  margin: auto;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  overflow: auto;
  background: fixed linear-gradient(315deg, #07172E 3%, #0c2b57 38%, #1659b7 68%, #3e82e1 98%);
  animation: gradient 15s ease infinite;
  background-size: 400% 400%;
  z-index: 0;

  .wave {
    background: rgb(255 255 255 / 25%);
    border-radius: 1000% 1000% 0 0;
    position: fixed;
    width: 200%;
    height: 15em;
    animation: wave 10s -3s linear infinite;
    transform: translate3d(0, 0, 0);
    opacity: 0.8;
    bottom: 0;
    left: 0;
    z-index: -1;
  }

  .wave:nth-of-type(2) {
    bottom: -1.25em;
    animation: wave 18s linear reverse infinite;
    opacity: 0.8;
  }

  .wave:nth-of-type(3) {
    bottom: -2.5em;
    animation: wave 20s -1s reverse infinite;
    opacity: 0.9;
  }

  @keyframes wave {
    2% {
      transform: translateX(1);
    }

    25% {
      transform: translateX(-25%);
    }

    50% {
      transform: translateX(-50%);
    }

    75% {
      transform: translateX(-25%);
    }

    100% {
      transform: translateX(1);
    }
  }
`
