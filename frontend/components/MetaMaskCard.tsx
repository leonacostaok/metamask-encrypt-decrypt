import { hooks, metaMask } from "connectors/metaMask";
import { useState } from "react";

import { Card } from "./Card";

const { useIsActivating, useIsActive } = hooks;

export default function MetaMaskCard() {
  const isActivating = useIsActivating();

  const isActive = useIsActive();

  const [error, setError] = useState(undefined);

  return (
    <Card connector={metaMask}
          isActivating={isActivating}
          isActive={isActive}
          error={error}
          setError={setError}
    />
  );
}
