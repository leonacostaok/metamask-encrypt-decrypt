import { hooks, metaMask } from "connectors/metaMask";
import { useState } from "react";

import { Card } from "./Card";

const { useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } =
  hooks;

export default function MetaMaskCard() {
  const accounts = useAccounts();
  const isActivating = useIsActivating();

  const isActive = useIsActive();

  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  const [error, setError] = useState(undefined);

  return (
    <Card
      connector={metaMask}
      isActivating={isActivating}
      isActive={isActive}
      error={error}
      setError={setError}
      accounts={accounts}
      provider={provider}
      ENSNames={ENSNames}
    />
  );
}
