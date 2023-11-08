import type { Web3ReactHooks } from "@web3-react/core";

export function Status({
  isActivating,
  isActive,
  error,
}: {
  isActivating: ReturnType<Web3ReactHooks["useIsActivating"]>;
  isActive: ReturnType<Web3ReactHooks["useIsActive"]>;
  error?: Error;
}) {
  return (
    <>
      {error ? (
        <div>
          🔴 {error.name ?? "Error"}
          {error.message ? `: ${error.message}` : null}
        </div>
      ) : isActivating ? (
        <div>🟡 Connecting</div>
      ) : isActive && (
        <div>🟢 Connected</div>
      )}
    </>
  );
}
