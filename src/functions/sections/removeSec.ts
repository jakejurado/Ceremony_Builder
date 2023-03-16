import { order } from "../../types/types";

//Removes the section from the order
function removeSection(index: number, order: order): order {
  const newOrder: order = [];
  order.forEach((set, i) => {
    if (i !== index) newOrder.push(set);
  });
  return newOrder;
}

export { removeSection };
