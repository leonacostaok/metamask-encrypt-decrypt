import { useState } from 'react'

import { hooks, walletConnect } from 'connectors/walletConnect'
import { Card } from './Card'

const { useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } = hooks

export default function WalletConnectCard() {
  const accounts = useAccounts()
  const isActivating = useIsActivating()

  const isActive = useIsActive()

  const provider = useProvider()
  const ENSNames = useENSNames(provider)

  const [error, setError] = useState(undefined)

  return (
    <Card
      connector={walletConnect}
      isActivating={isActivating}
      isActive={isActive}
      error={error}
      setError={setError}
      accounts={accounts}
      provider={provider}
      ENSNames={ENSNames}
    />
  )
}
