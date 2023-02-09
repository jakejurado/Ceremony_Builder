//removes section from display
function removeSection(index, display) {
  const newOrder = [];
  display.forEach((set, i) => {
    if (i != index) newOrder.push(set);
  });
  return newOrder;
}

//receives the name of the section and the direction of the arrow and updates display state.
function updateCardIndex(display, cardIndex, numOfCards, index) {
  const displayCopy = [...display];
  //check if cardIndex has exceeded the number of cards for this section
  cardIndex =
    cardIndex > numOfCards ? 0 : cardIndex < 0 ? numOfCards : cardIndex;
  //update the card index
  displayCopy[index][1] = cardIndex;
  return [...displayCopy];
}

//adds section to the display
function addSecToDisplay(varname, index, display, template) {
  const isInDisplay = display.some((e) => e[0] === varname);

  //duplicate section if in already in display
  if (isInDisplay) {
    const newVarname = duplicateVarname(varname, template);
    const dupSection = duplicateSection(varname, newVarname, template);
    // setTemplate({ ...dupSection });
    const newDisplay = insertSection(newVarname, index, display);
    return {
      varname: newVarname,
      display: newDisplay,
      template: dupSection,
      dup: isInDisplay,
    };
  }
  const newDisplay = insertSection(varname, index, display);
  return {
    varname: varname,
    display: newDisplay,
    template: false,
    dup: isInDisplay,
  };
}

function duplicateSection(varname, newVarname, template) {
  const templateCopy = { ...template };
  const [_, suffix] = newVarname.split("~");
  templateCopy[newVarname] = { ...template[varname] };
  templateCopy[newVarname].title += ` ${suffix}`;
  templateCopy[varname].duplicates = parseInt(suffix);
  return templateCopy;
}

function duplicateVarname(varname, template) {
  const suffixNum = template[varname].duplicates || 1;
  const newName = `${varname}~${suffixNum + 1}`;
  return newName;
}

function insertSection(varname, index, display) {
  const newOrder = [];
  display.forEach((set, i) => {
    if (i == index) newOrder.push([varname, 0]);
    newOrder.push([...set]);
  });
  return newOrder;
}

//add box selector to display
function addSelectorSection(position) {
  return { isVisible: true, position: parseInt(position) };
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
function fetchSection(varname, currTemplate, setCurrTemplate) {
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
      const newState = { ...currTemplate };
      newState[varname] = { ...sec };
      setCurrTemplate({ ...newState });
    })
    .catch((error) => {
      console.error("Error occured in fetchTitles:", error);
    });
}

function createObjForState(varname, data, currState) {
  const newState = { ...currState };
  newState[varname] = data;
  // setCurrState({ ...newState });
  return newState;
}

export {
  removeSection,
  updateCardIndex,
  addSecToDisplay,
  addSelectorSection,
  addContentsToCache,
  fetchSection,
};
