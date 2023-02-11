import { displaySet, displayU } from "../../types/types";

//DRAG & DROP FUNCTIONALITY
//The sourceIndex is the array being moved.  The destIndex is where it will be inserted.  CurrDisplay is the current state.
function updateSectionOrder(sourceIndex: number, destIndex: number, currState: displayU): displayU | undefined{
  if (sourceIndex === destIndex) return;
  const newOrder: Array<displaySet | undefined> = [];
  for (let i = 0; i < currState.length; i++) {
    if (i === destIndex && sourceIndex > destIndex){
      newOrder.push( currState[sourceIndex] );
    }
    if (i !== sourceIndex) newOrder.push(currState[i]);  
    if (i === destIndex && sourceIndex < destIndex)
      newOrder.push(currState[sourceIndex]);
  }
  return newOrder;
}



export { updateSectionOrder };