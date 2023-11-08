import styled, {css} from "styled-components";
import {LinkText, Text} from "./Text";
import {MainHeading} from "./Heading";
import MetaMaskCard from "./MetaMaskCard";
import React from "react";
import {useWeb3React} from "@web3-react/core";
import {shortenAddress} from "../utils";

export const Header = () => {
    const { account, connector } = useWeb3React();
    return (
        <HeaderContainer>
            <HeaderWrapper>
                <MainHeading>
                    MetaMask Encrypt/Decrypt
                </MainHeading>
                {!account ? (
                    <ConnectSection>
                        <Text>Use the section below to connect to MetaMask wallet provider</Text>
                        <MetaMaskCard />
                    </ConnectSection>
                ) : (
                    <>
                        <Text>
                            Connected as: {shortenAddress(account)}
                            <br/>
                            <LinkText onClick={() => {
                                if (connector?.deactivate) connector.deactivate()
                                if (connector?.resetState) connector.resetState()
                            }}>
                                Disconnect
                            </LinkText>
                        </Text>
                    </>
                )}
            </HeaderWrapper>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  max-width: 800px;
`

const ConnectSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 20px;
`;
