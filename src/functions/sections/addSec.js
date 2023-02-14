//adds section to the order
function addSecToOrder(varname, index, order, template) {
  const isInOrder = order.some((e) => e[0] === varname);

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
  const newOrder = insertSection(varname, index, order);
  return {
    varname: varname,
    order: newOrder,
    template: false,
    dup: isInOrder,
  };
}

//duplcate a section
function duplicateSection(varname, newVarname, template) {
  const templateCopy = { ...template };
  const [_, suffix] = newVarname.split("~");
  templateCopy[newVarname] = { ...template[varname] };
  templateCopy[newVarname].title += ` ${suffix}`;
  templateCopy[varname].duplicates = parseInt(suffix);
  return templateCopy;
}

//duplicate a varname
function duplicateVarname(varname, template) {
  const suffixNum = template[varname].duplicates || 1;
  const newName = `${varname}~${suffixNum + 1}`;
  return newName;
}

//insert Section into the order.
function insertSection(varname, index, order) {
  const newOrder = [];
  order.forEach((set, i) => {
    if (i === index) newOrder.push([varname, 0]);
    newOrder.push([...set]);
  });
  return newOrder;
}

//add contents to cache
function addContentsToCache(arr, cache) {
  const newCache = { ...cache };
  Object.values(arr).forEach((entry) => {
    for (const [varname, object] of Object.entries(entry)) {
      if (!newCache.hasOwnProperty(varname)) newCache[varname] = object;
    }
  });
  return newCache;
}

//fetch specific section
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
      console.log({ newState });
      setState({ type: "loadSEC", payload: newState });
    })
    .catch((error) => {
      console.error("Error occured in fetchTitles:", error);
    });
}

export { addSecToOrder, fetchSection };
