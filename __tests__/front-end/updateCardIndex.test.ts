import { updateCardIndex } from "../../src/functions/sections/updateSec";
import { OrderNonEmpty } from "../../src/types/types";

describe("update card index", () => {
  let order: OrderNonEmpty = [
    ["vows", 2],
    ["charge", 0],
    ["kiss", 5],
  ];

  beforeEach(() => {
    order = [ // Assign a new array to order in each test
      ["vows", 2],
      ["charge", 0],
      ["kiss", 5],
    ];
  });

  it("increase the number from 2 to 3", () => {
    const newOrder = updateCardIndex(order, {
      cardIndex: 2,
      numOfCards: 3,
      index: 0,
      add: 1,
    });
    expect(newOrder[0][1]).toBe(3);
  });

  it("decreases the number from 2 to 1", () => {
    const newOrder = updateCardIndex(order, {
      cardIndex: 2,
      numOfCards: 3,
      index: 0,
      add: -1,
    });
    expect(newOrder[0][1]).toBe(1);
  });

  it("goes to last card if index is -1", () => {
    const newOrder = updateCardIndex(order, {
      cardIndex: 0,
      numOfCards: 4,
      index: 1,
      add: -1,
    });
    expect(newOrder[1][1]).toBe(4);
  });

  it("goes to first index (0) if index is greater than number of cards", () => {
    const newOrder = updateCardIndex(order, {
      cardIndex: 5,
      numOfCards: 5,
      index: 2,
      add: 1,
    });
    expect(newOrder[2][1]).toBe(0);
  });
});
