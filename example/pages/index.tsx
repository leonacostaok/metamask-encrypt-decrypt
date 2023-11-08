import { useWeb3React } from "@web3-react/core";
import { Decrypt } from "components/Decrypt";
import { Encrypt } from "components/Encrypt";
import MetaMaskCard from "components/MetaMaskCard";
import { RequestPublicKey } from "components/RequestPublicKey";
import { Tab } from "components/Tab";
import React, { useState } from "react";
import styled, { css } from "styled-components";

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
    name: "REQUEST_PUBLIC_KEY",
    content: RequestPublicKey,
  },
  { tab: TabOptions.ENCRYPT, name: "ENCRYPT", content: Encrypt },
  { tab: TabOptions.DECRYPT, name: "DECRYPT", content: Decrypt },
];
export default function Home() {
  const { account } = useWeb3React();
  const [activeTab, setActiveTab] = useState(TabOptions.ENCRYPT);
  return (
    <>
      <head>
        <title>MetaMask Encrypt/Decrypt</title>
        <meta name="description" content="MetaMask Encrypt and decrypt tools" />
        <meta property="og:title" content="MetaMask Encrypt/Decrypt" />
        <meta property="og:description" content="MetaMask Encrypt and decrypt tools" />
        <meta property="og:url" content="https://metamask-encrypt-decrypt.dandelionlabs.io/" />
        <meta property="og:type" content="website" />
      </head>
      {account ? (
        <Tabs>
          <p>Connected with account: {account}</p>
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
          <TabContent>
            {tabsList.map((item) => (
              <item.content isActive={activeTab === item.tab} />
            ))}
          </TabContent>
        </Tabs>
      ) : (
        <Tabs>
          <Tab isActive={true}>
            <MetaMaskCard />
          </Tab>
        </Tabs>
      )}
    </>
  );
}

const Tabs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
const TabsSelector = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const TabButton = styled.button<{ active: boolean }>`
  margin: 0;
  background-color: #cecece;
  padding: 10px 40px;
  ${({ active }) =>
    active &&
    css`
      background-color: white;
      font-weight: bold;
    `}
`;
const TabContent = styled.div`
  border: solid 1px black;
  max-width: 700px;
  width: 50%;
  height: 300px;
`;
