import React from "react";
import {
  Cache,
  Template,
  TemplateSansOrder,
  Section,
  order,
} from "../../types/types";

function fillCacheWithNewSections(
  cache: Cache,
  template: TemplateSansOrder,
  sendDups: boolean = false
): Cache {
  if (sendDups) return Object.assign(template, cache);
  const newCache: Cache = { ...cache };
  for (const [key, obj] of Object.entries(template)) {
    const varname = key.split("~")[0];
    if (!newCache.hasOwnProperty(varname)) newCache[varname] = obj;
  }
  return newCache;
}

export { fillCacheWithNewSections };
