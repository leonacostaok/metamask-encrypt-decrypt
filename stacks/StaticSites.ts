import {StackContext, StaticSite, use} from "sst/constructs";

import {buildDomainName, HOSTED_ZONE, WALLET_CONNECT_PROJECT_ID} from "./Constants";
import {Apis} from "./Apis";

export async function StaticSites(sc: StackContext) {
  const {api} = use(Apis)
  // Deploy our React app
  const site = new StaticSite(sc.stack, "MetamaskEncryptDecryptApp", {
    path: "frontend",
    customDomain: {
      domainName: buildDomainName(sc.stack),
      hostedZone: HOSTED_ZONE,
    },
    buildCommand: "yarn build",
    buildOutput: "out",
    environment: {WALLET_CONNECT_PROJECT_ID,API_URL: api.url},
  });

  // Show the URLs in the output
  sc.stack.addOutputs({
    SiteUrl: site.url,
  });
}
