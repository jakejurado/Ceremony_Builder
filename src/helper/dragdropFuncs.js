//DRAG & DROP FUNCTIONALITY
//swaps sections in display
function updateSectionOrder(sourceIndex, destIndex, currState, updateState) {
  if (sourceIndex === destIndex) return;
  const newOrder = [];
  for (let i = 0; i < currState.length; i++) {
    if (i === destIndex && sourceIndex > destIndex)
      newOrder.push(currState[sourceIndex]);
    if (i !== sourceIndex) newOrder.push(currState[i]);
    if (i === destIndex && sourceIndex < destIndex)
      newOrder.push(currState[sourceIndex]);
  }
  updateState([...newOrder]);
}

export { updateSectionOrder };
