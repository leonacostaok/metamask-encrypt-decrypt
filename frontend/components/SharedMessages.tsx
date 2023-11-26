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

    function removeDuplicates(array: SharedMessage[]) {
        const newArray = [array[0]];
        for (let i= 1; i < array.length; i++) {
            if (array[i].id !== array[i-1].id) newArray.push(array[i]);
        }
        return newArray
    }

    const handleGetMessages = async () => {
        try {
            const response = await get(`shared-messages${publicKey ? `?toPublicKey=${publicKey}` : ''}`)

            if (response && 'data' in (response as any)) {
                const {sent, received} = (response as any).data
                let sharedMessagesList = Array.from(sent).concat(Array.from(received)) as SharedMessage[]
                sharedMessagesList = sharedMessagesList.sort((sm, sm2) => sm.id < sm2.id ? -1 : 0)
                setSharedMessages(removeDuplicates(sharedMessagesList));
            }
        } catch (e) {
            console.error(e);
        }
    }
  return (
      <Tab isActive={isActive} requiresConnection={true}>
          <RequestSection>
              <Text>
                  Enter a public key to check on received messages
              </Text>
              <RequestInputWithButton>
                  <RequestInput
                      type={"text"}
                      id="public-key"
                      autoComplete="off"
                      placeholder="..."
                      value={publicKey}
                      onChange={(e) => setPublicKey(e.target.value)}
                  />
                  <RequestButton onClick={handleRequestPublicKey}>Request</RequestButton>
              </RequestInputWithButton>
              <Button onClick={handleGetMessages}>Get Messages</Button>
          </RequestSection>
        <Table data={sharedMessages}/>
    </Tab>
  );
}

const RequestSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 50px;
`

const RequestInputWithButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 0;
`

const RequestInput = styled(Input)`
  border-radius: 10px 0 0 10px;
`

const RequestButton = styled(Button)`
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 0 10px 10px 0;
`
