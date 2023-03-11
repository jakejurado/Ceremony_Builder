//This function takes a varname of a section and adds the section to the template.
function addSecToTemplate(
  varname,
  index,
  order,
  template,
  cache,
  setUpdatedData
) {
  let newTemplate = JSON.parse(JSON.stringify(template)); //copy the template
  let orderCopy = [...order]; //copy order
  const isInOrder = order.some((e) => e[0] === varname); //is new sec in the order?

  //if the new section is not in the cache
  if (!cache.hasOwnProperty(varname)) {
    orderCopy = insertSection(varname, index, orderCopy);
    fetchSection(varname, orderCopy, template, setUpdatedData);
    return { ...newTemplate, order: orderCopy };
    //if new sec is not in template order then insert it from the cache
  } else if (!isInOrder) {
    newTemplate.order = insertSection(varname, index, orderCopy);
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

//This function adds the array containing the section varname and starting Index to the passed in order
function addSecToOrder(varname, index, order, template) {
  const isInOrder = order.some((e) => e[0] === varname); //checks if already in order

  //duplicate section if varname is already in order
  if (isInOrder) {
    const newVarname = duplicateVarname(varname, template);
    const dupSection = duplicateSection(varname, newVarname, template);
    // setTemplate({ ...dupSection });
    const newOrder = insertSection(newVarname, index, order);
    return {
      varname: newVarname,
      order: newOrder,
      template: dupSection,
      dup: isInOrder,
    };
  }
  //return when section is not in order
  const newOrder = insertSection(varname, index, order);
  return {
    varname: varname,
    order: newOrder,
    template: false,
    dup: isInOrder,
  };
}

//This function duplicates a section, updating the important properties with the new suffix.
function duplicateSection(varname, newVarname, template, cache) {
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
function insertSection(varname, index, order) {
  const newOrder = [];
  order.forEach((set, i) => {
    if (i === index) newOrder.push([varname, 0]);
    newOrder.push([...set]);
  });
  return newOrder;
}

//This function fetches a section from the backend and then updates state
function fetchSection(varname, order, currTemplate, setState) {
  fetch(`/sections/grab?sec=${varname}`)
    .then((res) => res.json())
    .then((res) => {
      //build the new section
      const sec = {};
      const scripts = res.map((obj) => obj.script);
      sec.description = res[0].description;
      sec.start_pos = 0;
      sec.title = res[0].title;
      sec.script = scripts;
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

export { addSecToOrder, fetchSection, addSecToTemplate };
