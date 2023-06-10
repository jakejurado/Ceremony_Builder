import React from 'react';

  //adds a section to the current template
function addSectionToTemplates(myTemplates, templateTitle, varname, index, cache){
    //deep copy templates
  const templates = JSON.parse(JSON.stringify(myTemplates));
    //save reference within templates
  const currTemplate = templates[templateTitle];
  let order = currTemplate.order;
    //duplicate varname if needed (e.g. 'charge' -> 'charge~1')
  const sectionVarname = createVarname(varname, currTemplate);
    //add section to current template
  currTemplate[sectionVarname] = cache[varname];
    //check if new section is already in the template and update meta data
  const [_, suffix] = sectionVarname.split("~");
  if(suffix){
    currTemplate[sectionVarname].title += ` ${suffix}`;
    currTemplate[varname].duplicates = parseInt(suffix);
  }
    //update the order
  currTemplate.order = updateOrder(sectionVarname, index, order)
  return templates;
}

  //adds the section to the order in the current template
function updateOrder(varname, index, order){
  const newOrder = [];
  if(!order.length) newOrder.push([varname, 0])
  order.forEach((set, i) => {
    if (i === index) newOrder.push([varname, 0]);
    newOrder.push([...set]);
  });
  return newOrder;
}

  //creates a new varname if one already exist in template
function createVarname(varname, template){
  if(!template.hasOwnProperty(varname)) return varname;
  return duplicateVarname(varname, template)
}

  //adds the correct suffix to the duplicated varname
function duplicateVarname(varname, template) {
  const suffixNum = template[varname].duplicates || 1;
  const newName = `${varname}~${suffixNum + 1}`;
  return newName;
}

export {addSectionToTemplates}