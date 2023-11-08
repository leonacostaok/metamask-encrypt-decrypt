import type { Web3ReactHooks } from "@web3-react/core";
import type { MetaMask } from "@web3-react/metamask";

import { getName } from "../utils";
import { Accounts } from "./Accounts";
import { ConnectWithSelect } from "./ConnectWithSelect";
import { Status } from "./Status";
import styled from "styled-components";

interface Props {
  connector: MetaMask;
  isActivating: ReturnType<Web3ReactHooks["useIsActivating"]>;
  isActive: ReturnType<Web3ReactHooks["useIsActive"]>;
  error: Error | undefined;
  setError: (error: Error | undefined) => void;
  ENSNames: ReturnType<Web3ReactHooks["useENSNames"]>;
  provider?: ReturnType<Web3ReactHooks["useProvider"]>;
  accounts?: string[];
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
    <CardWrapper>
      <b>{getName(connector)}</b>
      <Status isActivating={isActivating} isActive={isActive} error={error} />
      <Accounts accounts={accounts} provider={provider} ENSNames={ENSNames} />
      <ConnectWithSelect
        connector={connector}
        isActivating={isActivating}
        isActive={isActive}
        error={error}
        setError={setError}
      />
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 20rem;
  padding: 1rem;
  margin: 1rem;
  overflow: auto;
  border: 1px solid;
  border-radius: 1rem;
`
