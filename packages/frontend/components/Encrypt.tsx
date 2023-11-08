import {Tab} from "./Tab";
import {useState} from "react";
import styled from "styled-components";
import {encrypt} from '@metamask/eth-sig-util'
import {bufferToHex} from 'ethereumjs-util'

export function Encrypt({isActive}: {isActive: boolean}) {
    const [publicKey, setPublicKey] = useState<string | null>(null)
    const [message, setMessage] = useState("");
    const [encryptedMessage, setEncryptedMessage] = useState("");
    const [error, setError] = useState<string | null>(null)
    const handleEncrypt = (e) => {
        e.preventDefault();
        setEncryptedMessage(bufferToHex(
            Buffer.from(
                JSON.stringify(
                    encrypt({
                        publicKey: publicKey,
                        data: message,
                        version: 'x25519-xsalsa20-poly1305',
                    })
                ),
                'utf8'
            )
        ))
    }
    const handleClear = () => {
        setEncryptedMessage(null)
    }
    return (
        <Tab isActive={isActive}>
            {encryptedMessage ? (
                <>
                    <label htmlFor="encrypted-message">Encrypted message</label>
                    <TextArea
                        id="encrypted-message"
                        autoComplete="off"
                        disabled={true}
                        placeholder="Lorem impsum ..."
                        value={encryptedMessage}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button onClick={handleClear}>
                        Clear
                    </button>
                </>
            ) : (
                <>
                    <label htmlFor="public-key">Enter the public key of the destination user</label>
                    <Input
                        type={'text'}
                        id="public-key"
                        autoComplete="off"
                        placeholder="..."
                        value={publicKey}
                        onChange={(e) => setPublicKey(e.target.value)}
                    />
                    <label htmlFor="message">Enter a message</label>
                    <TextArea
                        id="message"
                        autoComplete="off"
                        placeholder="Lorem impsum ..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button onClick={handleEncrypt}>
                        Encrypt
                    </button>
                </>
            )}
            {error && <TextRed>{error}</TextRed>}
        </Tab>
    )
}

const TextArea = styled.textarea`
  max-width: 600px;
  width: 100%;
  height: 150px;
`

const Input = styled.input`
  max-width: 500px;
  width: 100%;
`

const TextRed = styled.p`
    color: red;
`
