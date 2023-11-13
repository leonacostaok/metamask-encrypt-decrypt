import { Stack } from "sst/constructs/Stack";

export const HOSTED_ZONE = "dandelionlabs.io";
export const PRODUCTION_STAGE = "production";

export const WALLET_CONNECT_PROJECT_ID = "a6cc11517a10f6f12953fd67b1eb67e7"

export const isProduction = (stack: Stack) => stack.stage === PRODUCTION_STAGE;

export const buildDomainName = (stack: Stack) =>
  isProduction(stack) ? `metamask-encrypt-decrypt.${HOSTED_ZONE}` : `${stack.stage}.metamask-encrypt-decrypt.${HOSTED_ZONE}`;
