import { createCardIndexUpdater } from "../helper_closures/closure";

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
  currCache,
  setCurrCache
) {
  if (!currState.hasOwnProperty(varname)) {
    //check if template has the section.
    if(currCache.hasOwnProperty(varname)){
      //duplicate section
      //add to current template
      //update display
    }
    //-if not then
    //--fetch call
    //---update cache
    //---update display
    //-if so then
    //--check if it is already in the display.
    //---if so then
    //----see how many other ones there are and add to cache with extra number
    //---if not then add to cache and update state
  }

  //function fetchSection(varname, currCache, setCurrCache){
  //
  // }

  console.log("addSection", varname, index);
}

function addSelectorSection(position, setNewState) {
  setNewState({ isVisible: true, position: parseInt(position) });
}

function addContentsToCache(arr, cache) {
  const newCache = { ...cache };
  arr.forEach((entry) => {
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
