import { order, Template, Cache, Section } from "../../types/types";

//This function takes a varname of a section and adds the section to the template.
function addSecToTemplate(
  varname,
  index,
  order,
  template,
  cache,
  setFetchedData,
  ) {
  let newTemplate = JSON.parse(JSON.stringify(template)); //copy the template
  let orderCopy = [...order]; //copy order
  const isInOrder = order.some((e) => e[0] === varname); //is new sec in the order?

  //if the new section is not in the cache
  if (!cache.hasOwnProperty(varname)) {
    newTemplate['order'] = insertSection(varname, index, orderCopy);
    fetchingData(varname, newTemplate, setFetchedData);
    console.log('part of fetch', {template})
    return template;
    
  } else if (!isInOrder) {
    newTemplate["order"] = insertSection(varname, index, orderCopy);
    newTemplate[varname] = JSON.parse(JSON.stringify(cache[varname]));
    return newTemplate;

    //if the section is already in the template order then duplicate it
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

async function fetchingData(varname, template, setState){
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
    template[varname] = sec
    console.log('after fetch', {template})
    console.log({setState})
    setState({type: 'loadFetch', payload: template})
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
  order.forEach((set, i) => {
    if (i === index) newOrder.push([varname, 0]);
    newOrder.push([...set]);
  });
  return newOrder;
}

//This function fetches a section from the backend and then updates state

function fetchSection(
  varname: string,
  order: order,
  currTemplate: Template,
  setState
) {
  fetch(`/sections/grab?sec=${varname}`)
    .then((res) => res.json())
    .then((res) => {
      //build the new section
      const scripts = res.map((obj) => obj.script);
      const sec: Section = {
        description: res[0].description,
        start_pos: 0,
        title: res[0].title,
        script: scripts,
      };
      return sec;
    })
    .then((sec) => {
      //update the template state
      const newState = { ...currTemplate, [varname]: sec, order };
      setState({ type: "loadSEC", payload: newState });
    })
    .catch((error) => {
      console.error("Error occured in fetchTitles:", error);
    });
}

export {addSecToTemplate };
