import { ReactNode } from "react";
import styled from "styled-components";
import {TabOptions} from "../pages";
import {useWeb3React} from "@web3-react/core";
import {Text} from "./Text";
import MetaMaskCard from "./MetaMaskCard";
import WalletConnectCard from "./WalletConnectCard";

export function Tab({
  isActive,
  children,
    requiresConnection
}: {
  requiresConnection?: boolean,
  isActive: boolean;
  setActiveTab?: (el: TabOptions) => void
  children?: ReactNode;
}) {
  const { account } = useWeb3React();
  return isActive ? (requiresConnection && account) || !requiresConnection ? (
      <TabWrapper>
        {children}
      </TabWrapper>
  ) : (
      <ConnectSection>
        <Text>This section requires authentication, please connect to a wallet provider from the list below to continue</Text>
        <MetaMaskCard />
        {/*<WalletConnectCard /> todo: request public key and decrypt functions do not work on mobile*/}
      </ConnectSection>
  ) : <></>;
}

const TabWrapper = styled.div`
  display: flex;
  background-color: rgba(255, 255, 255, 0.07);
  flex-direction: column;
  padding: 5vh 5vw;
  justify-content: center;
  align-items: center;
  min-height: 40vh;
  gap: 10px;

  p {
    text-align: center;
    max-width: 500px;
  }
`;

const ConnectSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 20px;
  padding: 50px 0;
  p {
    text-align: center;
    max-width: 500px;
  }
`;

