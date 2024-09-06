import { serverQueryFn } from "./serverQuery";

export function lenderIdsQuery(
  {logServerUrl, address} :
  {logServerUrl: string | undefined, address: `0x${string}` | undefined}
) {
  return {
    enabled: !!(logServerUrl && address),
    queryKey: ["rocketlend", "lenderIds", address],
    queryFn: serverQueryFn({
      onJSON: async ({lenderIds, untilBlock}: {lenderIds: string[], untilBlock: number}) => (
        { lenderIds, untilBlock }
      ),
      onNotFound: async () => ({lenderIds: [], untilBlock: 0}),
      url: `${logServerUrl}/lenderIds/${address}`,
    }),
  };
};

export function pendingLenderIdsQuery(
  {logServerUrl, address} :
  {logServerUrl: string | undefined, address: `0x${string}` | undefined}
) {
  return {
    enabled: !!(logServerUrl && address),
    queryKey: ["rocketlend", "pendingLenderIds", address],
    queryFn: serverQueryFn({
      onJSON: async ({pendingLenderIds, untilBlock}: {pendingLenderIds: string[], untilBlock: number}) => (
        { pendingLenderIds, untilBlock }
      ),
      onNotFound: async () => ({pendingLenderIds: [], untilBlock: 0}),
      url: `${logServerUrl}/pendingLenderIds/${address}`,
    }),
  };
};
