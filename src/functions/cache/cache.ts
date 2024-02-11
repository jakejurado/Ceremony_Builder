//add contents of array to cache
import { fetchCall } from '../fetches/api'


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
