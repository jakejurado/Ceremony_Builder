import { display, displaySet } from '../../types/types'

//Removes the section from the display
function removeSection(index: number, display: display ): display {
  const newOrder: display = [];
  display.forEach((set, i) => {
    if (i !== index) newOrder.push(set);
  });
  return newOrder;
}

export { removeSection }