import { encrypt } from "@metamask/eth-sig-util";
import { bufferToHex } from "ethereumjs-util";
import { useState } from "react";

import { Tab } from "./Tab";
import {Button} from "./Button";
import {Text, TextError} from "./Text";
import {Input} from "./Input";
import {TextArea} from "./TextArea";

export function Encrypt({ isActive }: { isActive: boolean }) {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [encryptedMessage, setEncryptedMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const handleEncrypt = (e) => {
    e.preventDefault();
    if (message === '') {
        setError('Missing message!!!')
        setTimeout(() => setError(null), 3000)
        return
    }
    try {
        setEncryptedMessage(
          bufferToHex(
            Buffer.from(
              JSON.stringify(
                encrypt({
                  publicKey,
                  data: message,
                  version: "x25519-xsalsa20-poly1305",
                }),
              ),
              "utf8",
            ),
          ),
        );
    } catch (e) {
        console.error(e)
        setError(e.message)
        setTimeout(() => setError(null), 3000)
    }
  };
  const handleClear = () => {
    setEncryptedMessage(null);
  };
  return (
    <Tab isActive={isActive} requiresConnection={true}>
      {encryptedMessage ? (
        <>
          <Text>Encrypted message</Text>
          <TextArea
            id="encrypted-message"
            autoComplete="off"
            disabled={true}
            placeholder="Lorem impsum ..."
            value={encryptedMessage}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button onClick={handleClear}>Clear</Button>
        </>
      ) : (
        <>
          <Text>
            Enter the public key of the destination user
          </Text>
          <Input
            type={"text"}
            id="public-key"
            autoComplete="off"
            placeholder="..."
            value={publicKey}
            onChange={(e) => setPublicKey(e.target.value)}
          />
          <Text>Enter a message</Text>
          <TextArea
            id="message"
            autoComplete="off"
            placeholder="Lorem impsum ..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button onClick={handleEncrypt}>Encrypt</Button>
        </>
      )}
      {error && <TextError>{error}</TextError>}
    </Tab>
  );
}

