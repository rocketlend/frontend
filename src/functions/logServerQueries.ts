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
      onJSON: async ({pendingNodes, untilBlock}: {pendingNodes: string[], untilBlock: number}) => (
        { pendingNodes, untilBlock }
      ),
      onNotFound: async () => ({pendingNodes: [], untilBlock: 0}),
      url: `${logServerUrl}/pendingNodes/${address}`,
    }),
  };
};

export function poolIdsQuery(
  {logServerUrl, lenderId} :
  {logServerUrl: string | undefined, lenderId: string | undefined}
) {
  return {
    enabled: !!(logServerUrl && lenderId),
    queryKey: ["rocketlend", "poolIds", lenderId],
    queryFn: serverQueryFn({
      onJSON: async ({poolIds, untilBlock}: {poolIds: string[], untilBlock: number}) => (
        { poolIds, untilBlock }
      ),
      onNotFound: async () => ({poolIds: [], untilBlock: 0}),
      url: `${logServerUrl}/poolIds/${lenderId}`,
    }),
  };
};
