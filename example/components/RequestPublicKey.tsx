import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";

import { Tab } from "./Tab";

export function RequestPublicKey({ isActive }: { isActive: boolean }) {
  const { account, provider } = useWeb3React();
  const [publicKey, setPublicKey] = useState<string | null>(null);

  useEffect(() => {
    setPublicKey(null);
  }, [account]);

  const handleRequestPublicKey = async () => {
    setPublicKey(await provider.send("eth_getEncryptionPublicKey", [account]));
  };
  return (
    <Tab isActive={isActive}>
      {publicKey ? (
        <>
          <p>This is your public key</p>
          <h4>{publicKey}</h4>
        </>
      ) : (
        <>
          <p>
            Press on the button below to trigger the public key request. It will
            prompt your wallet provider to get your PUBLIC key information.
          </p>
          <button onClick={handleRequestPublicKey}>Request Public Key</button>
        </>
      )}
    </Tab>
  );
}

