import { updateSectionOrder } from "../src/functions/mainPage/dragdropFuncs";
import { order, moveSecPayload } from "../src/types/types";

describe("Drag Drop Section Order", () => {
  const currState: order = [
    ["first", 1],
    ["second", 2],
    ["third", 3],
  ];
  const payload: moveSecPayload = {
    destIndex: 0,
    sourceIndex: 1,
  };

  beforeEach(() => {
    currState;
    payload;
  });

  it("returns same order of destination and source then index are equal", () => {
    const res = updateSectionOrder(currState, { sourceIndex: 1, destIndex: 1 });
    expect(res).toEqual(currState);
  });

  it("returns the correct order when source is less than destination", () => {
    const res = updateSectionOrder(currState, payload);
    expect(res).toEqual([
      ["second", 2],
      ["first", 1],
      ["third", 3],
    ]);
  });

  it("returns the correct order when source is more than destination", () => {
    const res = updateSectionOrder(currState, payload);
    expect(res).toEqual([
      ["second", 2],
      ["first", 1],
      ["third", 3],
    ]);
  });

  it("returns an array of the same length", () => {
    const res = updateSectionOrder(currState, payload);
    expect(res?.length).toBe(3);
  });
});
