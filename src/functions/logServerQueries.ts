import { serverQueryFn } from "./serverQuery";

export function nodesQuery(
  {logServerUrl, address} :
  {logServerUrl: string | undefined, address: `0x${string}` | undefined}
) {
  return {
    enabled: !!(logServerUrl && address),
    queryKey: ["rocketlend", "nodes", address],
    queryFn: serverQueryFn({
      onJSON: async ({nodes, untilBlock}: {nodes: `0x${string}`[], untilBlock: number}) => (
        { nodes, untilBlock }
      ),
      onNotFound: async () => ({nodes: [], untilBlock: 0}),
      url: `${logServerUrl}/nodes/${address}`,
    }),
  };
};

export function pendingNodesQuery(
  {logServerUrl, address} :
  {logServerUrl: string | undefined, address: `0x${string}` | undefined}
) {
  return {
    enabled: !!(logServerUrl && address),
    queryKey: ["rocketlend", "pendingNodes", address],
    queryFn: serverQueryFn({
      onJSON: async ({pendingNodes, untilBlock}: {pendingNodes: `0x${string}`[], untilBlock: number}) => (
        { pendingNodes, untilBlock }
      ),
      onNotFound: async () => ({pendingNodes: [], untilBlock: 0}),
      url: `${logServerUrl}/pendingNodes/${address}`,
    }),
  };
};

export function poolIdsQuery(
  {logServerUrl, address} :
  {logServerUrl: string | undefined, address: `0x${string}` | undefined}
) {
  return {
    enabled: !!(logServerUrl && address),
    queryKey: ["rocketlend", "poolIds", address],
    queryFn: serverQueryFn({
      onJSON: async ({poolIds, untilBlock}: {poolIds: string[], untilBlock: number}) => (
        { poolIds, untilBlock }
      ),
      onNotFound: async () => ({poolIds: [], untilBlock: 0}),
      url: `${logServerUrl}/poolIds/${address}`,
    }),
  };
};

export function pendingPoolIdsQuery(
  {logServerUrl, address} :
  {logServerUrl: string | undefined, address: `0x${string}` | undefined}
) {
  return {
    enabled: !!(logServerUrl && address),
    queryKey: ["rocketlend", "pendingPoolIds", address],
    queryFn: serverQueryFn({
      onJSON: async ({pendingPoolIds, untilBlock}: {pendingPoolIds: string[], untilBlock: number}) => (
        { pendingPoolIds, untilBlock }
      ),
      onNotFound: async () => ({pendingPoolIds: [], untilBlock: 0}),
      url: `${logServerUrl}/pendingPoolIds/${address}`,
    }),
  };
};
