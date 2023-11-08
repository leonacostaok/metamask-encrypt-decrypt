import type { Web3ReactHooks } from "@web3-react/core";
import type { MetaMask } from "@web3-react/metamask";
import { useCallback } from "react";
import {Button} from "./Button";

export function ConnectWithSelect({
  connector,
  isActivating,
  isActive,
  error,
  setError,
}: {
  connector: MetaMask;
  isActivating: ReturnType<Web3ReactHooks["useIsActivating"]>;
  isActive: ReturnType<Web3ReactHooks["useIsActive"]>;
  error: Error | undefined;
  setError: (error: Error | undefined) => void;
}) {
  const handleConnect = useCallback(async () => {
    try {
      await connector.activate();
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
