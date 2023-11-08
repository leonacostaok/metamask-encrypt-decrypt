import { Web3ReactHooks, Web3ReactProvider } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { AppProps } from "next/app";
import React, { useEffect } from "react";

import { hooks as metaMaskHooks, metaMask } from "../connectors/metaMask";
import ModalConnectProvider from "../providers/ModalConnectProvider";

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
    <Web3ReactProvider connectors={connectors}>
      <ModalConnectProvider>
        <Component {...pageProps} />
      </ModalConnectProvider>
    </Web3ReactProvider>
  );
}
