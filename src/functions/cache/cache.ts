//add contents of array to cache
import { Templates, Cache } from "../../types/types_copy";
import { fetchCall } from '../fetches/api'
// import { fetchCall } from './api';


function addContentsToCacheOLD(templates, cache) {
  const newCache = JSON.parse(JSON.stringify(cache))
  Object.values(templates).forEach((template) => {
    for (const [varname, data] of Object.entries(template)) {
      if (varname === "order") continue;
      if (!newCache.hasOwnProperty(varname)) newCache[varname] = data;
    }
  });
  return newCache;
}

function addContentsToCache(templates) {
  Object.values(templates).forEach((template) => {
    for (const [varname, data] of Object.entries(template)) {
      if (varname === "order") continue;
      if(!fetchCall.inCache(varname)){
        const cacheBuild = data.script.map(script => {
          return {
            description: data.description,
            title: data.title,
            script: script,
            varname: varname
          }
        })
        fetchCall.addToCache(varname, cacheBuild)
      }
    }
  });
}

export { addContentsToCache };
