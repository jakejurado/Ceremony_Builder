function fillCacheWithNewSections(cache: object, template: object, sendDups: boolean = false): object {
  if (sendDups) return Object.assign(template, cache);
  const newCache: object = { ...cache };
  for (const [key, obj] of Object.entries(template)) {
    const varname: string = key.split("~")[0];
    if (!newCache.hasOwnProperty(varname)) newCache[varname] = obj;
  }
  return newCache;
}

export { fillCacheWithNewSections };
