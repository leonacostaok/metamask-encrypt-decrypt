import { StackContext, StaticSite } from "sst/constructs";

import { buildDomainName, HOSTED_ZONE } from "./Constants";

export async function StaticSites(sc: StackContext) {
  // Deploy our React app
  const site = new StaticSite(sc.stack, "MetamaskEncryptDecryptApp", {
    path: "example",
    customDomain: {
      domainName: buildDomainName(sc.stack),
      hostedZone: HOSTED_ZONE,
    },
    buildCommand: "yarn build",
    buildOutput: "out",
    environment: {},
  });

  // Show the URLs in the output
  sc.stack.addOutputs({
    SiteUrl: site.url,
  });
}
