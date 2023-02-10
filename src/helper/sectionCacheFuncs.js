function fillCacheWithNewSections(cache, template, sendDups = false) {
  if (sendDups) return Object.assign(template, cache);
  const newCache = { ...cache };
  for (const [key, obj] of Object.entries(template)) {
    const varname = key.split("~")[0];
    if (!newCache.hasOwnProperty(varname)) newCache[varname] = obj;
  }
  console.log(newCache);
  return newCache;
}

export { fillCacheWithNewSections };
