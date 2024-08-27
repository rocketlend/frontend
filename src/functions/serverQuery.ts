export function serverQueryFn<T>(
  {onJSON, onNotFound, url} : {
    onJSON: (j: any) => Promise<T>; // TODO: could we improve on this `any` by depending on `url`'s value?
    onNotFound: () => Promise<T>;
    url: string
  }
) {
  const queryFn = () => fetch(url).then(
    r => r.status === 200 ? r.json().then(onJSON) :
         r.status === 404 ? onNotFound() :
         r.text().then(msg => { throw new Error(`${r.status} error fetching ${url}: ${msg}`) }));
  return queryFn;
};
