import { Order, OrderNonEmpty } from "../../types/types";

//Removes the section from the order
function removeSection(index: number, order: OrderNonEmpty): Order {
  const newOrder: Order = [];
  order.forEach((set, i) => {
    if (i !== index) newOrder.push(set);
  });
  return newOrder;
}

export { removeSection };
