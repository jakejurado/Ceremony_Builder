import { createCardIndexUpdater } from "../helper_closures/closure";
import { fetchSection } from "./selectorBoxFuncs";

//removes section from display
function removeSection(name, currState, setCurrState) {
  const newOrder = [];
  for (let item of currState) {
    if (item[0] !== name) newOrder.push(item);
  }
  setCurrState([...newOrder]);
}

//receives the name of the section and the direction of the arrow and updates display state.
const updateCardIndex = createCardIndexUpdater();

//adds section to the display
function addSection(
  varname,
  index,
  currState,
  setCurrState,
  currTemplate,
  setCurrTemplate,
  currCache,
  setCurrCache
) {
  const isInDisplay = currState.some((e) => e[0] === varname);
  const isInTemplate = currTemplate.hasOwnProperty(varname);
  console.log({ varname });
  console.log({ index });
  console.log({ currState });
  console.log({ setCurrState });
  console.log({ currTemplate });
  console.log({ currCache });
  console.log({ setCurrCache });

  console.log("add section");
  if (isInDisplay) {
    console.log("its in display");
    //duplicate section
    const newTemplate = { ...currTemplate };
    const num = newTemplate.hasOwnProperty("duplicates")
      ? newTemplate.duplicates + 1
      : 1;
    let newVarname = varname + "-" + `${num}`;
    newTemplate[newVarname] = { ...newTemplate[varname] };
    newTemplate[newVarname].title += "1";
    setCurrTemplate(newTemplate);
    //add to template.
  } else if (isInTemplate) {
    console.log("its in the template");
    insertSection(varname, index, currState, setCurrState, currTemplate);
  } else {
    console.log("fetch it");
    fetchSection(
      varname,
      currTemplate,
      setCurrTemplate,
      currCache,
      setCurrCache
    );
  }
  console.log("addSection", varname, index);
}

function insertSection(varname, index, currState, setCurrState, template) {
  const tempOrder = [];
  const arrData = Object.values(currState);
  for (let i = 0; i < arrData.length; i++) {
    const [key, value] = arrData[i];
    if (i === index) tempOrder.push([varname, template[varname].start_pos]);
    tempOrder.push(arrData[i]);
  }
  console.log({ tempOrder });
  setCurrState([...tempOrder]);
  console.log("???");
}

function addSelectorSection(position, setNewState) {
  setNewState({ isVisible: true, position: parseInt(position) });
}

function addContentsToCache(arr, cache) {
  const newCache = { ...cache };
  Object.values(arr).forEach((entry) => {
    for (const [varname, object] of Object.entries(entry)) {
      if (!newCache.hasOwnProperty(varname)) newCache[varname] = object;
    }
  });
  return newCache;
}

export {
  removeSection,
  updateCardIndex,
  addSection,
  addSelectorSection,
  addContentsToCache,
};
