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
function addSection(newTitle, placmentTitle, currState, setNewState) {
  //add code here
  console.log("addSection");
}

function addSelectorSection(position, setNewState) {
  setNewState({ isVisible: true, position: parseInt(position) });
}

export { removeSection, updateCardIndex, addSection, addSelectorSection };
