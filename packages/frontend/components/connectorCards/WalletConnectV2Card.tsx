import { URI_AVAILABLE } from '@web3-react/walletconnect-v2'
import { useEffect, useState } from 'react'

import { hooks, walletConnectV2 } from '../../connectors/walletConnectV2'
import { Card } from '../Card'

const { useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } = hooks

export default function WalletConnectV2Card() {
  const accounts = useAccounts()
  const isActivating = useIsActivating()

  const isActive = useIsActive()

  const provider = useProvider()
  const ENSNames = useENSNames(provider)

  const [error, setError] = useState(undefined)

  // log URI when available
  useEffect(() => {
    walletConnectV2.events.on(URI_AVAILABLE, (uri: string) => {
      console.log(`uri: ${uri}`)
    })
  }, [])

  // attempt to connect eagerly on mount
  useEffect(() => {
    walletConnectV2.connectEagerly().catch((error) => {
      console.debug('Failed to connect eagerly to walletconnect', error)
    })
  }, [])

  return (
    <Card
      connector={walletConnectV2}
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
