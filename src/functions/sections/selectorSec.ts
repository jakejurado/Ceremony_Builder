import { display, displaySet } from "../../types/types";

type stateObj = {
  isVisible: boolean;
  position: number;
};

//add box selector to display
function addSelectorSection(position: string): stateObj {
  return { isVisible: true, position: parseInt(position) };
}

export { addSelectorSection };
