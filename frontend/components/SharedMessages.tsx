import { Tab } from "./Tab";
import {TabOptions} from "../pages";
import {styled} from "styled-components";
import {Table} from "./Table";
import {Text} from "./Text";
import {Input} from "./Input";
import {Button} from "./Button";
import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useChallengeAuthenticatedApi } from '../hooks/useChallengeAuthenticatedApi';
import { SharedMessage } from '../models/SharedMessage';

export function SharedMessages({ isActive }: {
  setActiveTab?: (el: TabOptions) => void
  isActive: boolean
}) {
    const {account, provider} = useWeb3React()
    const [publicKey, setPublicKey] = useState<string | null>(null);
    const {get} = useChallengeAuthenticatedApi()
    const [sharedMessages, setSharedMessages] = useState<SharedMessage[]>([])

    const handleRequestPublicKey = async () =>
        setPublicKey(await provider.send("eth_getEncryptionPublicKey", [account]));

    const handleGetMessages = async () => {
        try {
            const response = await get(`shared-messages${publicKey ? `?toPublicKey=${publicKey}` : ''}`)

            if (response && 'data' in (response as any)) {
                const {sent, received} = (response as any).data
                setSharedMessages(Array.from(sent).concat(Array.from(received)) as SharedMessage[]);
            }
        } catch (e) {
            console.error(e);
        }
    }
  return (
      <Tab isActive={isActive} requiresConnection={true}>
          <Text>
              Enter a public key to check on received messages
          </Text>
          <RequestInputWithButton>
              <Input
                  type={"text"}
                  id="public-key"
                  autoComplete="off"
                  placeholder="..."
                  value={publicKey}
                  onChange={(e) => setPublicKey(e.target.value)}
              />
              <Button onClick={handleRequestPublicKey}>Request</Button>
          </RequestInputWithButton>

          <Button onClick={handleGetMessages}>Get Messages</Button>
        <SharedWrapper>
            <Table data={sharedMessages}/>
        </SharedWrapper>
    </Tab>
  );
}

const SharedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  p {
    text-align: justify;
    width: 100%;
  }
`

const RequestInputWithButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 10px;
`
