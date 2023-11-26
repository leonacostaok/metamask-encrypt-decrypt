import { useWeb3React } from "@web3-react/core";
import { useState } from "react";

import { Tab } from "./Tab";
import {Text, TextError} from "./Text";
import {Button} from "./Button";
import {TextArea} from "./TextArea";
import styled from "styled-components";
import {CopyToClipboard} from 'react-copy-to-clipboard';

export function Decrypt({ isActive }: { isActive: boolean }) {
  const { account, provider } = useWeb3React();
  const [encryptedMessage, setEncryptedMessage] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false)

  const handleDecrypt = async () => {
    if (encryptedMessage !== "")
      try {
        setMessage(
          await provider.send("eth_decrypt", [encryptedMessage, account]),
        );
      } catch (e) {
        console.error(e)
        setError(e.message);
        setTimeout(() => setError(null), 3000)
      }
    else {
      setError("Encrypted message must have a value");
      setTimeout(() => setError(null), 3000)
    }
  };

  const handleClear = () => {
    setEncryptedMessage(null);
    setMessage(null);
  };
  return (
    <Tab isActive={isActive} requiresConnection={true}>
      {message ? (
        <>
          <Text>This is your decrypted message</Text>
          <TextArea
            id="message"
            autoComplete="off"
            disabled={true}
            placeholder="Lorem impsum ..."
            value={message}
          />
          <ButtonWrapper>
          <Button onClick={handleClear}>Clear</Button>
          <CopyToClipboard text={message} onCopy={() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 3000)
          }}>
            <Button disabled={copied}>{copied ? 'Copied!' : 'Copy'}</Button>
          </CopyToClipboard>
          </ButtonWrapper>
        </>
      ) : (
        <>
          <Text>Enter an encrypted message</Text>
          <TextArea
            id="encrypted-message"
            autoComplete="off"
            placeholder="Lorem impsum ..."
            value={encryptedMessage}
            onChange={(e) => setEncryptedMessage(e.target.value)}
          />
          <Button onClick={handleDecrypt}>Decrypt</Button>
        </>
      )}
      {error && <TextError>{error}</TextError>}
    </Tab>
  );
}

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 10px;
`
