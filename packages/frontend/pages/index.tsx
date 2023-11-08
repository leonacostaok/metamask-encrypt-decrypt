import ModalConnect from "components/ModalConnect";
import useModalConnect from "hooks/useModalConnect";
import {useWeb3React} from "@web3-react/core";
import styled, {css} from "styled-components";
import {useState} from "react";
import {Decrypt} from "components/Decrypt";
import {Tab} from "components/Tab";
import {Encrypt} from "components/Encrypt";
import {RequestPublicKey} from "../components/RequestPublicKey";

enum TabOptions {
    ENCRYPT,
    DECRYPT,
    REQUEST_PUBLIC_KEY
}

interface TabType {tab: TabOptions, name: string, content: typeof Tab}

const tabsList: TabType[] = [
    {tab: TabOptions.REQUEST_PUBLIC_KEY, name: 'REQUEST_PUBLIC_KEY', content: RequestPublicKey},
    {tab: TabOptions.ENCRYPT, name: 'ENCRYPT', content: Encrypt},
    {tab: TabOptions.DECRYPT, name: 'DECRYPT', content: Decrypt},
]
export default function Home() {
    const { account } = useWeb3React()
    const {showModalConnect, setShowModalConnect} = useModalConnect()
    const [activeTab, setActiveTab] = useState(TabOptions.ENCRYPT)
    return (
        <>
            {account ? (
                <Tabs>
                    <p>Connected with account: {account}</p>
                    <TabsSelector>
                        {tabsList.map((item) => (
                            <TabButton active={activeTab === item.tab} onClick={() => setActiveTab(item.tab)}>{item.name}</TabButton>
                        ))}
                    </TabsSelector>
                    <TabContent>
                        {tabsList.map((item) => (
                            <item.content isActive={activeTab === item.tab}/>
                        ))}
                    </TabContent>
                </Tabs>
            ): (
                <>
                    <button onClick={() => setShowModalConnect(true)}>Connect</button>
                    <ModalConnect onDismiss={() => setShowModalConnect(false)} isOpen={showModalConnect}/>
                </>
            )}
        </>
    )
}

const Tabs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`
const TabsSelector = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`
const TabButton = styled.button<{active: boolean}>`
  margin: 0;
  background-color: #cecece;
  padding: 10px 40px;
  ${({active}) => active && css`
    background-color: white;
    font-weight: bold;
  `}
`
const TabContent = styled.div`
  border: solid 1px black;
  max-width: 700px;
  width: 50%;
  height: 300px;
`
