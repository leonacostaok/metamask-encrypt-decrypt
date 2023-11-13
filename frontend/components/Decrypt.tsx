import { useWeb3React } from "@web3-react/core";
import { useState } from "react";

import { Tab } from "./Tab";
import {Text, TextError} from "./Text";
import {Button} from "./Button";
import {TextArea} from "./TextArea";

export function Decrypt({ isActive }: { isActive: boolean }) {
  const { account, provider } = useWeb3React();
  const [encryptedMessage, setEncryptedMessage] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

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
          <Button onClick={handleClear}>Clear</Button>
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


