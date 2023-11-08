import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import {CopyToClipboard} from 'react-copy-to-clipboard';

import { Tab } from "./Tab";
import {Text} from "./Text";
import {Heading} from "./Heading";
import {Button} from "./Button";

export function RequestPublicKey({ isActive }: { isActive: boolean }) {
  const { account, provider } = useWeb3React();
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setPublicKey(null);
  }, [account]);

  const handleRequestPublicKey = async () => {
    setPublicKey(await provider.send("eth_getEncryptionPublicKey", [account]));
  };
  return (
    <Tab isActive={isActive} requiresConnection={true}>
      {publicKey ? (
        <>
          <Text>This is your public key</Text>
          <Heading>{publicKey}</Heading>
          <CopyToClipboard text={publicKey} onCopy={() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 3000)
          }}>
            <Button>Copy</Button>
          </CopyToClipboard>
          {copied && <Text>Copied!</Text>}
        </>
      ) : (
        <>
          <Text>
            Press on the button below to trigger the public key request. It will
            prompt your wallet provider to get your PUBLIC key information.
          </Text>
          <Button onClick={handleRequestPublicKey}>Request Public Key</Button>
        </>
      )}
    </Tab>
  );
}

