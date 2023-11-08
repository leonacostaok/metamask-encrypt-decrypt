import ModalConnectProvider from "../providers/ModalConnectProvider";
import {Web3ReactHooks, Web3ReactProvider} from "@web3-react/core";
import {MetaMask} from "@web3-react/metamask";
import {WalletConnect as WalletConnectV2} from "@web3-react/walletconnect-v2";
import {Network} from "@web3-react/network";
import {hooks as metaMaskHooks, metaMask} from "../connectors/metaMask";
import {hooks as walletConnectV2Hooks, walletConnectV2} from "../connectors/walletConnectV2";
import React, {useEffect} from "react";
import {AppProps} from "next/app";

const connectors: [MetaMask | WalletConnectV2 | Network, Web3ReactHooks][] = [
    [metaMask, metaMaskHooks],
    [walletConnectV2, walletConnectV2Hooks],
]

export default function App({
        Component,
        pageProps,
    }: AppProps) {
    useEffect(() => {
        async function handlePersistentConnection() {
            const provider = localStorage.getItem("provider");
            try {
                if (provider === "MetaMask") {
                    await metaMask.connectEagerly();
                } else if (provider === "WalletConnect") {
                    await walletConnectV2.connectEagerly();
                }
            } catch {
                console.log("Re-connection Failed");
            }
        }
        handlePersistentConnection().then();
        window.addEventListener('load',() => {
            handlePersistentConnection().then();
        })
        return () => {
            window.removeEventListener('load',() => {
                handlePersistentConnection().then();
            })
        }
    }, []);
  return (
    <Web3ReactProvider connectors={connectors}>
        <ModalConnectProvider>
            <Component {...pageProps} />
        </ModalConnectProvider>
    </Web3ReactProvider>
  )
}
