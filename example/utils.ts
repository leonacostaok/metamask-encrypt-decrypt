import { MetaMask } from "@web3-react/metamask";
import type { Connector } from "@web3-react/types";

export function getName(connector: Connector) {
  if (connector instanceof MetaMask) return "MetaMask";
  return "Unknown";
}
