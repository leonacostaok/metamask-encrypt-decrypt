import type { Web3ReactHooks } from '@web3-react/core'
import type { MetaMask } from '@web3-react/metamask'
import type { Network } from '@web3-react/network'
import type { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2'

import { getName } from '../utils'
import { Accounts } from './Accounts'
import { ConnectWithSelect } from './ConnectWithSelect'
import { Status } from './Status'

interface Props {
  connector: MetaMask | WalletConnectV2 | Network
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']>
  isActive: ReturnType<Web3ReactHooks['useIsActive']>
  error: Error | undefined
  setError: (error: Error | undefined) => void
  ENSNames: ReturnType<Web3ReactHooks['useENSNames']>
  provider?: ReturnType<Web3ReactHooks['useProvider']>
  accounts?: string[]
}

export function Card({
  connector,
  isActivating,
  isActive,
  error,
  setError,
  ENSNames,
  accounts,
  provider,
}: Props) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '20rem',
        padding: '1rem',
        margin: '1rem',
        overflow: 'auto',
        border: '1px solid',
        borderRadius: '1rem',
      }}
    >
      <b>{getName(connector)}</b>
      <div style={{ marginBottom: '1rem' }}>
        <Status isActivating={isActivating} isActive={isActive} error={error} />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <Accounts accounts={accounts} provider={provider} ENSNames={ENSNames} />
      </div>
      <ConnectWithSelect
        connector={connector}
        isActivating={isActivating}
        isActive={isActive}
        error={error}
        setError={setError}
      />
    </div>
  )
}
