import React from 'react';
import {Order, TemplateSansSection, Template, TemplatesSansContent, TemplatesWithContent, Templates} from '../../types/types';

  //adds a section to the current template
function addSectionToTemplates(myTemplates: TemplateSansSection | Template, templateTitle: string, varname: string, index: number, cache: Cache ): Templates{
    //deep copy templates
  const templates: TemplatesSansContent | TemplatesWithContent = JSON.parse(JSON.stringify(myTemplates));
    //save reference within templates
  const currTemplate: TemplateSansSection | Template = templates[templateTitle];
  let order: Order = currTemplate.order;
    //duplicate varname if needed (e.g. 'charge' -> 'charge~1')
  const sectionVarname: string = createVarname(varname, currTemplate);
    //add section to current template
  currTemplate[sectionVarname] = cache[varname];
    //check if new section is already in the template and update meta data
  const [_, suffix] = sectionVarname.split("~");
  if(suffix){
    currTemplate[sectionVarname].title = `${varname} ${suffix}`;
    currTemplate[varname].duplicates = parseInt(suffix);
  }
    //update the order
  currTemplate.order = updateOrder(sectionVarname, index, order)
  return templates;
}

  //adds the section to the order in the current template
function updateOrder(varname: string, index: number, order: Order): Order{
  const newOrder: Order = [];
  if(!order.length) newOrder.push([varname, 0])
  order.forEach((set, i) => {
    if (i === index) newOrder.push([varname, 0]);
    newOrder.push([...set]);
  });
  return newOrder;
}

  //creates a new varname if one already exist in template
  function createVarname(varname: string, template: TemplateSansSection | Template): string{
    if(!template.hasOwnProperty(varname)) return varname;
    if (isTemplate(template, varname)) {
      return duplicateVarname(varname, template);
    }
    throw new Error("Template does not contain a section.");
  }

  //adds the correct suffix to the duplicated varname
function duplicateVarname(varname: string, template: Template): string {
  const suffixNum = template[varname].duplicates || 1;
  const newName = `${varname}~${suffixNum + 1}`;
  return newName;
}

  //typeguard
function isTemplate(template: TemplateSansSection | Template, varname: string): template is Template {
  return (template as Template)[varname]?.script !== undefined;
}

export {addSectionToTemplates}






// import React from 'react';

//   //adds a section to the current template
// function addSectionToTemplates(myTemplates, templateTitle, varname, index, cache){
//     //deep copy templates
//   const templates = JSON.parse(JSON.stringify(myTemplates));
//     //save reference within templates
//   const currTemplate = templates[templateTitle];
//   let order = currTemplate.order;
//     //duplicate varname if needed (e.g. 'charge' -> 'charge~1')
//   const sectionVarname = createVarname(varname, currTemplate);
//     //add section to current template
//   currTemplate[sectionVarname] = cache[varname];
//     //check if new section is already in the template and update meta data
//   const [_, suffix] = sectionVarname.split("~");
//   if(suffix){
//     currTemplate[sectionVarname].title += ` ${suffix}`;
//     currTemplate[varname].duplicates = parseInt(suffix);
//   }
//     //update the order
//   currTemplate.order = updateOrder(sectionVarname, index, order)
//   return templates;
// }

//   //adds the section to the order in the current template
// function updateOrder(varname, index, order){
//   const newOrder = [];
//   if(!order.length) newOrder.push([varname, 0])
//   order.forEach((set, i) => {
//     if (i === index) newOrder.push([varname, 0]);
//     newOrder.push([...set]);
//   });
//   return newOrder;
// }

//   //creates a new varname if one already exist in template
// function createVarname(varname, template){
//   if(!template.hasOwnProperty(varname)) return varname;
//   return duplicateVarname(varname, template)
// }

//   //adds the correct suffix to the duplicated varname
// function duplicateVarname(varname, template) {
//   const suffixNum = template[varname].duplicates || 1;
//   const newName = `${varname}~${suffixNum + 1}`;
//   return newName;
// }

// export {addSectionToTemplates}