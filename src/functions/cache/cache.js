//add contents to cache
function addContentsToCache(arr, cache) {
  const newCache = { ...cache };
  Object.values(arr).forEach((entry) => {
    for (const [varname, object] of Object.entries(entry)) {
      if (!newCache.hasOwnProperty(varname)) newCache[varname] = object;
    }
  });
  return newCache;
}

export { addContentsToCache };
