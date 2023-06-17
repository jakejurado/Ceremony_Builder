import { Order, OrderNonEmpty, updateSecPayload } from "../../types/types";

function updateCardIndex(order: OrderNonEmpty, payload: updateSecPayload): OrderNonEmpty {
  let { cardIndex, numOfCards, index, add } = payload;
  const orderCopy: OrderNonEmpty = [...order];
  let updatedCardIndex: number = cardIndex + add;
  orderCopy[index][1] =
    updatedCardIndex > numOfCards
      ? 0
      : updatedCardIndex < 0
      ? numOfCards
      : updatedCardIndex;
  return orderCopy;
}

export { updateCardIndex };
