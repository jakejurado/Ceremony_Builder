//add contents of array to cache
import { Templates, Cache } from "../../types/types";

function addContentsToCache(templates, cache) {
  const newCache = { ...cache };
  Object.values(templates).forEach((template) => {
    for (const [varname, data] of Object.entries(template)) {
      if (varname === "order") continue;
      if (!newCache.hasOwnProperty(varname)) newCache[varname] = data;
    }
  });
  return newCache;
}

export { addContentsToCache };
