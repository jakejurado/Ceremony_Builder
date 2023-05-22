import { order, Template, Cache, Section } from "../../types/types";

//This function takes a varname of a section and adds the section to the template.
function addSecToTemplate(
  varname,
  index,
  template,
  cache,
  setFetchedData,
  ) {
  const {order} = template 
  let newTemplate = Object.assign({}, template) //JSON.parse(JSON.stringify(template)); //copy the template
  let orderCopy = [...order]; //copy order
  const isInOrder = order.some((e) => e[0] === varname); //is new sec in the order?

  console.log('+++++++++ENTERED ADDSECTOTEMPLATE+++++++')

  //if the new section is not in the cache then fetch it
  if (!cache.hasOwnProperty(varname)) {
    console.log('entered cache')
    newTemplate['order'] = insertSection(varname, index, orderCopy);
    fetchingData(varname, newTemplate['order'], setFetchedData);
    return template;
    
  //if it's not in the current template then it is in the cache, so we add it from there to the current template
  } else if (!isInOrder) {
    newTemplate["order"] = insertSection(varname, index, orderCopy);
    newTemplate[varname] = JSON.parse(JSON.stringify(cache[varname]));
    return newTemplate;

    //if the section is already in the template order then duplicate it and rename it
  } else {
    const newVarname = duplicateVarname(varname, template); //create new varname
    orderCopy = insertSection(newVarname, index, orderCopy); //insert varname into the order
    //duplicate section from cache
    let updatedTemplate = duplicateSection(
      varname,
      newVarname,
      template,
      cache
    );
    //add duplicate to template from cache
    return { ...updatedTemplate, order: orderCopy };
  }
}

//fetches data from the backend and then signals it is ready to load.
async function fetchingData(varname, order, setState){
  try{
    const response = await fetch(`/sections/grab?sec=${varname}`);
    const data = await response.json();
    const scripts = await data.map((obj) => obj.script);
    const sec = await {
      description: data[0].description,
      start_pos: 0,
      title: data[0].title,
      script: scripts,
    }
    setState({type: 'loadFetch', payload: {sec, varname, newOrder: order}})

  }catch (error){
    console.log(error);
    setState({type: 'initialLoad'})
  }

}

//This function duplicates a section, updating the important properties with the new suffix.
function duplicateSection(varname, newVarname, template, cache): Template {
  const templateCopy = { ...template };
  const [_, suffix] = newVarname.split("~");
  templateCopy[newVarname] = JSON.parse(JSON.stringify(cache[varname]));
  templateCopy[newVarname].title += ` ${suffix}`;
  templateCopy[varname].duplicates = parseInt(suffix);
  return templateCopy;
}

//This function takes a varname and duplicates it and adds a suffix
function duplicateVarname(varname, template) {
  const suffixNum = template[varname].duplicates || 1;
  const newName = `${varname}~${suffixNum + 1}`;
  return newName;
}

//This function inserts a Section into the order.
function insertSection(varname: string, index: number, order: order): order {
  const newOrder: order = [];
  if(!order.length) newOrder.push([varname, 0])
  order.forEach((set, i) => {
    if (i === index) newOrder.push([varname, 0]);
    newOrder.push([...set]);
  });
  
  return newOrder;
}

export {addSecToTemplate };
