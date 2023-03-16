import { order, updateSecPayload } from "../../types/types";

function updateCardIndex(order: order, payload: updateSecPayload): order {
  let { cardIndex, numOfCards, index, add } = payload;
  const orderCopy: order = [...order];
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
