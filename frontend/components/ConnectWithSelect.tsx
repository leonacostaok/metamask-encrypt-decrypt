import type { Web3ReactHooks } from "@web3-react/core";
import type { MetaMask } from "@web3-react/metamask";
import type { WalletConnect } from "@web3-react/walletconnect-v2";
import { useCallback } from "react";
import {Button} from "./Button";
import {getConnectorName} from "../utils";

export function ConnectWithSelect({
  connector,
  isActivating,
  isActive,
  error,
  setError,
}: {
  connector: MetaMask | WalletConnect;
  isActivating: ReturnType<Web3ReactHooks["useIsActivating"]>;
  isActive: ReturnType<Web3ReactHooks["useIsActive"]>;
  error: Error | undefined;
  setError: (error: Error | undefined) => void;
}) {
  const handleConnect = useCallback(async () => {
    try {

      if (connector && connector.deactivate) connector.deactivate()
      connector.resetState()
      Object.keys(localStorage)
          .filter((x) => x.startsWith("wc@2"))
          .forEach((x) => localStorage.removeItem(x))

      await connector.activate();

      localStorage.setItem('provider', getConnectorName(connector))
      setError(undefined);
    } catch (error) {
      setError(error);
    }
  }, [connector, setError]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {isActive ? (
        error ? (
          <Button onClick={() => handleConnect()}>Try again?</Button>
        ) : (
          <Button
            onClick={() => {
              if (connector?.deactivate) {
                void connector.deactivate();
              } else {
                void connector.resetState();
              }
            }}
          >
            Disconnect
          </Button>
        )
      ) : (
        <Button onClick={() => handleConnect()} disabled={isActivating}>
          {error ? "Try again?" : "Connect"}
        </Button>
      )}
    </div>
  );
}
