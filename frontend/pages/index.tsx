import { Decrypt } from "components/Decrypt";
import { Encrypt } from "components/Encrypt";
import { GetPublicKey } from "components/GetPublicKey";
import { Tab } from "components/Tab";
import React, { useState } from "react";
import styled, { css } from "styled-components";
import {HowTo} from "../components/HowTo";

export enum TabOptions {
  ENCRYPT,
  DECRYPT,
  GET_PUBLIC_KEY,
  HOW_TO
}

interface TabType {
  tab: TabOptions;
  name: string;
  content: typeof Tab;
}

const tabsList: TabType[] = [
  {
    tab: TabOptions.HOW_TO,
    name: "How to",
    content: HowTo,
  },
  {
    tab: TabOptions.GET_PUBLIC_KEY,
    name: "Get Public Key",
    content: GetPublicKey,
  },
  { tab: TabOptions.ENCRYPT, name: "Encrypt", content: Encrypt },
  { tab: TabOptions.DECRYPT, name: "Decrypt", content: Decrypt },
];
export default function Home() {
  const [activeTab, setActiveTab] = useState(TabOptions.HOW_TO);
  return (
    <ScreenContainer>
      <TabsSelector>
        {tabsList.map((item) => (
            <TabButton
                key={`tab-button-${item.name}`}
                className={activeTab === item.tab ? 'active' : ''}
                onClick={() => setActiveTab(item.tab)}
            >
              {item.name}
            </TabButton>
        ))}
      </TabsSelector>
      <Tabs>
        <TabContent>
          {tabsList.map((item) => (
              <item.content key={`tab-content-${item.name}`}
                            isActive={activeTab === item.tab}
                            setActiveTab={setActiveTab}
              />
          ))}
        </TabContent>
      </Tabs>
    </ScreenContainer>
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
  width: 60%;
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

  @media only screen and (max-width: 1200px) {
    width: 75%;
  }

  @media only screen and (max-width: 1024px) {
    flex-direction: column;
    width: 85%;
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
const TabButton = styled.div`
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

  &.active {
    background-color: rgb(42, 137, 231);
    color: white;
    font-weight: bold;
  }
`;
const TabContent = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 0 0 20px 20px;
  width: 60%;
  
  @media only screen and (max-width: 1200px) {
    width: 75%;
  }
  
  @media only screen and (max-width: 1024px) {
    width: 85%;
  }
  @media only screen and (max-width: 575px){
    width: 95%;
  }
`;
