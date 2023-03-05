import { display } from "../../types/types";

function updateCardIndex(order, payload) {
  let { cardIndex, numOfCards, index, add } = payload;
  const orderCopy = [...order];
  let updatedCardIndex = cardIndex + add;
  orderCopy[index][1] =
    updatedCardIndex > numOfCards
      ? 0
      : updatedCardIndex < 0
      ? numOfCards
      : updatedCardIndex;
  return orderCopy;
}

export { updateCardIndex };

//receives the name of the section and the direction of the arrow and updates display state.
// function updateCardIndex(display: display, cardIndex: number, numOfCards: number, index: number): display {
//   const displayCopy: display = [...display];
//   //check if cardIndex has exceeded the number of cards for this section
//   cardIndex =
//     cardIndex > numOfCards ? 0 : cardIndex < 0 ? numOfCards : cardIndex;
//   //update the card index
//   displayCopy[index][1] = cardIndex;
//   return [...displayCopy];
// }
