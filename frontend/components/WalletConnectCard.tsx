import { useState } from 'react'

import { hooks, walletConnect } from 'connectors/walletConnect'
import { Card } from './Card'

const { useIsActivating, useIsActive } = hooks

export default function WalletConnectCard() {
  const isActivating = useIsActivating()

  const isActive = useIsActive()

  const [error, setError] = useState(undefined)

  return (
    <Card connector={walletConnect}
          isActivating={isActivating}
          isActive={isActive}
          error={error}
          setError={setError}
    />
  )
}
