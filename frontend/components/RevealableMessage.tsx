import { useState } from 'react'
import { useWeb3React } from '@web3-react/core';
import { Button } from './Button';
import styled from 'styled-components';

interface RevealableMessageProps {
    encryptedMessage: string
}

export default function RevealableMessage({encryptedMessage}: RevealableMessageProps) {
    const { account, provider } = useWeb3React()
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

    return revealedMessage ? <>{revealedMessage}</> : (
        <RevealButton onClick={handleRevealMessage}>Reveal</RevealButton>
    )
}

const RevealButton = styled(Button)`
  font-size: 10px;
  padding: 5px 12px;
`
