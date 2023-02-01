//removes section from display
function removeSection(name, currState, setCurrState) {
  const newOrder = [];
  for (let item of currState) {
    if (item[0] !== name) newOrder.push(item);
  }
  setCurrState([...newOrder]);
}

//receives the name of the section and the direction of the arrow and updates display state.
function updateCardIndex(title, dir, currState, setCurrState, template) {
  const stateCopy = new Map(currState);
  const len = template[title].script.length - 1;
  //adds/subtracts from the current position
  let pos = stateCopy.get(title) + dir;
  //loops the cards when you reach the end or beginning
  pos = pos > len ? 0 : pos < 0 ? len : pos;
  //updates state
  stateCopy.set(title, pos);
  setCurrState([...stateCopy]);
}

//adds section to the display
function addSection(newTitle, placmentTitle, currState, setNewState) {
  //add code here
  console.log("addSection");
}

function addSelectorSection(position, setNewState) {
  setNewState({ isVisible: true, position: parseInt(position) });
}

export { removeSection, updateCardIndex, addSection, addSelectorSection };
