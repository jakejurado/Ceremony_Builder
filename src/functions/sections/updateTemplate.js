import { fetchSection } from "./addSec";

function updateTemplate(varname, sections, data, setUpdatedData, sectionCache) {
  let newTemplate = { ...sections };

  const isDuplicate = data.dup;
  const notInTemplate = !sections.hasOwnProperty(varname);
  const notInCache = !sectionCache.hasOwnProperty(varname);

  if (isDuplicate) {
    newTemplate = { ...data.template };
  } else if (notInTemplate && notInCache) {
    fetchSection(varname, data.order, sections, setUpdatedData);
  } else if (notInTemplate) {
    newTemplate[varname] = sectionCache[varname];
  }

  return newTemplate;
}


function updateTemplate2(varname, sections, data, setUpdatedData, sectionCache) {
  let newTemplate = { ...sections };

  //check if it is a duplicate
  const isDuplicate = data.dup;
  // const notInTemplate = !sections.hasOwnProperty(varname);
  const notInCache = !sectionCache.hasOwnProperty(varname);

  //if 
  if (isDuplicate) {
    newTemplate = { ...data.template };
  } else if (notInTemplate && notInCache) {
    fetchSection(varname, data.order, sections, setUpdatedData);
  } else if (notInTemplate) {
    newTemplate[varname] = sectionCache[varname];
  }

  return newTemplate;
}

export { updateTemplate };
