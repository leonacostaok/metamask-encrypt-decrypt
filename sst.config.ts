import { SSTConfig } from "sst";

import { StaticSites } from "./stacks/StaticSites";
import {DynamoTables} from "./stacks/DynamoTables";
import {Apis} from "./stacks/Apis";

export default {
  config() {
    return {
      name: "metamask-encrypt-decrypt",
      // profile: "metamask-encrypt-decrypt",
      region: "ap-southeast-1",
    };
  },
  stacks(app) {
    app.stack(DynamoTables).stack(Apis).stack(StaticSites);
  },
} satisfies SSTConfig;
