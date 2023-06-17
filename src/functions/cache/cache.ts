//add contents of array to cache
import { Templates, Cache } from "../../types/types_copy";


function addContentsToCache2(templates, cache) {
  console.log('entered add contents to cashe')
  const newCache = JSON.parse(JSON.stringify(cache))
  Object.values(templates).forEach((template) => {
    Object.assign(newCache, template);
  });
  delete newCache.order;
  return newCache;
}

function addContentsToCache(templates, cache) {
  const newCache = JSON.parse(JSON.stringify(cache))
  Object.values(templates).forEach((template) => {
    for (const [varname, data] of Object.entries(template)) {
      if (varname === "order") continue;
      if (!newCache.hasOwnProperty(varname)) newCache[varname] = data;
    }
  });
  return newCache;
}

export { addContentsToCache };
