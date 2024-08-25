export function serverQueryFn({onJSON, onNotFound, url}) {
  const queryFn = () => fetch(url).then(
    r => r.status === 200 ? r.json().then(onJSON) :
         r.status === 404 ? onNotFound() :
         r.text().then(msg => { throw new Error(`${r.status} error fetching ${url}: ${msg}`) }));
  return queryFn;
};
