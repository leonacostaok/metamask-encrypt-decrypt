import { SSTConfig } from "sst";

import { StaticSites } from "./stacks/StaticSites";

export default {
  config() {
    return {
      name: "metamask-encrypt-decrypt",
      // profile: "metamask-encrypt-decrypt",
      region: "ap-southeast-1",
    };
  },
  stacks(app) {
    app.stack(StaticSites);
  },
} satisfies SSTConfig;
