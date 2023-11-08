import { Stack } from "sst/constructs/Stack";

export const HOSTED_ZONE = "dandelionlabs.io";
export const PRODUCTION_STAGE = "production";

export const isProduction = (stack: Stack) => stack.stage === PRODUCTION_STAGE;

export const buildDomainName = (stack: Stack) =>
  isProduction(stack) ? HOSTED_ZONE : `${stack.stage}.${HOSTED_ZONE}`;
