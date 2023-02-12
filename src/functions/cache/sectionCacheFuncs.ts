
// interface cacheType {
//   [key: string]: object
// }

// function fillCacheWithNewSections(cache: cacheType, template: cacheType, sendDups: boolean = false): object {
//   if (sendDups) return Object.assign(template, cache);
//   const newCache: cacheType = { ...cache };
//   for (const [key, obj] of Object.entries(template)) {
//     const varname: string = key.split("~")[0];  
//     if (!newCache.hasOwnProperty(varname)) newCache[varname] = obj;
//   }
//   return newCache;
  
// }


// export { fillCacheWithNewSections };
import React from 'react'

function fillCacheWithNewSections(cache, template, sendDups = false) {
  if (sendDups) return Object.assign(template, cache);
  const newCache = { ...cache };
  for (const [key, obj] of Object.entries(template)) {
    const varname = key.split("~")[0];  
    if (!newCache.hasOwnProperty(varname)) newCache[varname] = obj;
  }
  return newCache;
  
}


export { fillCacheWithNewSections };