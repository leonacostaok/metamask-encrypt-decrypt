import type { Web3ReactHooks } from "@web3-react/core";
import type { MetaMask } from "@web3-react/metamask";
import type { WalletConnect } from "@web3-react/walletconnect-v2";

import {getConnectorName, isMetamask} from "../utils";
import { ConnectWithSelect } from "./ConnectWithSelect";
import styled from "styled-components";
import {BoldText, Text, TextError, TextWarning} from "./Text";
import {useEffect, useState} from "react";

interface Props {
  connector: MetaMask | WalletConnect;
  isActivating: ReturnType<Web3ReactHooks["useIsActivating"]>;
  isActive: ReturnType<Web3ReactHooks["useIsActive"]>;
  error: Error | undefined;
  setError: (error: Error | undefined) => void;
}

export function Card({
  connector,
  isActivating,
  isActive,
  error,
  setError,
}: Props) {
  const [isLocked, setIsLocked] = useState<boolean>(false)
  useEffect(() => {
    if ((window.ethereum as any)?._metamask?.isUnlocked) {
      (window.ethereum as any)?._metamask?.isUnlocked()?.then((isUnlocked: boolean) => {
        setIsLocked(!isUnlocked)
      })
    } else {
      setIsLocked(false)
    }
  }, [])
  return (
    <CardWrapper>
      <BoldText>{getConnectorName(connector)}</BoldText>
        {error ?
            isMetamask(connector) && isLocked ? (
                <TextWarning>
                  It seems your account is locked, try unlocking it
                </TextWarning>
            ) : (
            <TextError>
              🔴 {error.name ?? "Error"}
              {error.message ? `: ${error.message}` : null}
            </TextError>
        ) : isActivating ? (
          <Text>🟡 Connecting</Text>
        ) : isActive ? (
          <Text>🟢 Connected</Text>
        ) : (
          <ConnectWithSelect
            connector={connector}
            isActivating={isActivating}
            isActive={isActive}
            error={error}
            setError={setError}
          />
        )}
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 20rem;
  padding: 0.5rem 2rem;
  overflow: auto;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 1rem;
`
