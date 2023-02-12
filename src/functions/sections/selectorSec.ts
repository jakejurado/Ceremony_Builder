import { display, displaySet } from "../../types/types";

//add box selector to display
function addSelectorSection(position: string): object {
  return { isVisible: true, position: parseInt(position) };
}

export { addSelectorSection };
