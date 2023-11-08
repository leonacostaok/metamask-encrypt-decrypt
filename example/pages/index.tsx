import { useWeb3React } from "@web3-react/core";
import { Decrypt } from "components/Decrypt";
import { Encrypt } from "components/Encrypt";
import MetaMaskCard from "components/MetaMaskCard";
import { RequestPublicKey } from "components/RequestPublicKey";
import { Tab } from "components/Tab";
import React, { useState } from "react";
import styled, { css } from "styled-components";
import {Text} from "../components/Text";

enum TabOptions {
  ENCRYPT,
  DECRYPT,
  REQUEST_PUBLIC_KEY,
}

interface TabType {
  tab: TabOptions;
  name: string;
  content: typeof Tab;
}

const tabsList: TabType[] = [
  {
    tab: TabOptions.REQUEST_PUBLIC_KEY,
    name: "Request Public Key",
    content: RequestPublicKey,
  },
  { tab: TabOptions.ENCRYPT, name: "Encrypt", content: Encrypt },
  { tab: TabOptions.DECRYPT, name: "Decrypt", content: Decrypt },
];
export default function Home() {
  const { account } = useWeb3React();
  const [activeTab, setActiveTab] = useState(TabOptions.ENCRYPT);
  return (
    <>
      {account && (
          <ScreenContainer>
            <TabsSelector>
              {tabsList.map((item) => (
                  <TabButton
                      active={activeTab === item.tab}
                      onClick={() => setActiveTab(item.tab)}
                  >
                    {item.name}
                  </TabButton>
              ))}
            </TabsSelector>
            <Tabs>
              <TabContent>
                {tabsList.map((item) => (
                    <item.content isActive={activeTab === item.tab} />
                ))}
              </TabContent>
            </Tabs>
          </ScreenContainer>
      )}
    </>
  );
}

const ScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Tabs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 20px;
`;
const TabsSelector = styled.div`
  display: flex;
  width: 50%;
  flex-direction: row;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-bottom: none;
  border-radius: 20px 20px 0 0;
  div:first-of-type {
    border-radius: 20px 0 0 0;
  }
  div:last-of-type {
    border-radius: 0 20px 0 0;
  }

  @media only screen and (max-width: 1024px) {
    flex-direction: column;
    div:first-of-type {
      border-radius: 20px 20px 0 0;
    }
    div:last-of-type {
      border-radius: 0 0 0 0;
    }
  }
  @media only screen and (max-width: 1024px) {
    flex-direction: column;
    div:first-of-type {
      border-radius: 20px 20px 0 0;
    }
    div:last-of-type {
      border-radius: 0 0 0 0;
    }
  }
  @media only screen and (max-width: 575px){
    width: 95%;
  }
`;
const TabButton = styled.div<{ active: boolean }>`
  margin: 0;
  background-color: rgba(255, 255, 255, 0.11);
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: center;
  width: 100%;
  color: rgba(255, 255, 255, 0.55);
  cursor: pointer;
  transition: all 0.3s ease-in;

  &:hover {
    background-color: rgb(42, 196, 231);
    color: white;
    font-weight: bold;
  }

  ${({active}) =>
      active &&
      css`
        background-color: rgb(42, 137, 231);
        color: white;
        font-weight: bold;
      `}
`;
const TabContent = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 0 0 20px 20px;
  width: 50%;

  @media only screen and (max-width: 575px){
    width: 95%;
  }
`;
