import { useState } from 'react'
import { useWeb3React } from '@web3-react/core';
import { Button } from './Button';
import styled from 'styled-components';
import { TextArea } from './TextArea';
import {CopyToClipboard} from 'react-copy-to-clipboard';

interface RevealableMessageProps {
    encryptedMessage: string
}

export default function RevealableMessage({encryptedMessage}: RevealableMessageProps) {
    const { account, provider } = useWeb3React()
    const [copied, setCopied] = useState(false)
    const [revealedMessage, setRevealedMessage] = useState<string | null>(null)

    const handleRevealMessage = async () => {
        if (encryptedMessage !== "") {
            try {
                setRevealedMessage(
                    await provider.send('eth_decrypt', [encryptedMessage, account])
                );
            } catch (e) {
                console.error(e);
                setRevealedMessage(e.message);
                setTimeout(() => {
                    setRevealedMessage(null);
                }, 3000);
            }
        } else {
            setRevealedMessage("Encrypted message must have a value");
            setTimeout(() => {
                setRevealedMessage(null);
            }, 3000);
        }
    }

    return revealedMessage ? (
        <RevealableMessageWrapper>
            <TextArea disabled={true}>{revealedMessage}</TextArea>
            <CopyToClipboard text={encryptedMessage} onCopy={() => {
                setCopied(true)
                setTimeout(() => setCopied(false), 3000)
            }}>
                <RevealButton disabled={copied}>{copied ? 'Copied!' : 'Copy'}</RevealButton>
            </CopyToClipboard>
        </RevealableMessageWrapper>
    ) : (
        <RevealButton onClick={handleRevealMessage}>Reveal</RevealButton>
    )
}

const RevealableMessageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 10px;
`
const RevealButton = styled(Button)`
  font-size: 10px;
  padding: 5px 12px;
`
