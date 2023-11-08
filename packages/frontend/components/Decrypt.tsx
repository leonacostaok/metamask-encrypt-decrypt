import {Tab} from "./Tab";
import {useState} from "react";
import styled from "styled-components";
import {useWeb3React} from "@web3-react/core";

export function Decrypt({isActive}: {isActive: boolean}) {
    const {account, provider} = useWeb3React()
    const [encryptedMessage, setEncryptedMessage] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState<string | null>(null)

    const handleDecrypt = async () => {
        if (encryptedMessage !== '')
            setMessage(await provider.send("eth_decrypt", [encryptedMessage, account]))
        else {
            setError('Encrypted message must have a value')
        }
    }

    const handleClear = () => {
        setEncryptedMessage(null)
        setMessage(null)
    }
    return (
        <Tab isActive={isActive}>
            {message ? (
                <>
                    <label htmlFor="message">This is your decrypted message</label>
                    <TextArea
                        id="message"
                        autoComplete="off"
                        disabled={true}
                        placeholder="Lorem impsum ..."
                        value={message}
                    />
                    <button onClick={handleClear}>
                        Clear
                    </button>
                </>
            ) : (
                <>
                    <label htmlFor="encrypted-message">Enter an encrypted message</label>
                    <TextArea
                        id="encrypted-message"
                        autoComplete="off"
                        placeholder="Lorem impsum ..."
                        value={encryptedMessage}
                        onChange={(e) => setEncryptedMessage(e.target.value)}
                    />
                    <button onClick={handleDecrypt}>
                        Decrypt
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
