import { MetaMask } from "@web3-react/metamask";
import type { Connector } from "@web3-react/types";

export function getName(connector: Connector) {
  if (connector instanceof MetaMask) return "MetaMask";
  return "Unknown";
}

import { getAddress } from '@ethersproject/address'

export function isAddress(value: any): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}
export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address.trim())
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}
