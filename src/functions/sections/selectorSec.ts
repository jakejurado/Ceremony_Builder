import { selectorSec } from "../../types/types";

// type selectorSec = {
//   isVisible: boolean;
//   position: number | undefined;
// };

  //add box selector to display
function addSelectorSection(position: string): selectorSec {
  return { isVisible: true, position: parseInt(position) };
}

export { addSelectorSection };
