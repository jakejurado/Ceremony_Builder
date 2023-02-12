import { describe, expect, test } from "@jest/globals";
import { fillCacheWithNewSections } from "../src/functions/sectionCacheFuncs";

describe("Fill Cache With New Sections", () => {
  let cache = {};
  let template = {};

  beforeEach(() => {
    cache = {
      giving_away: {
        script: ["hi", "by", "go"],
        description: "des",
        start_pos: 0,
        title: "Giving Away",
      },
      charge: {
        script: ["hi", "by", "go"],
        description: "des",
        start_pos: 1,
        title: "Charge",
      },
      kiss: {
        script: ["hi", "by", "go"],
        description: "des",
        start_pos: 5,
        title: "The Kiss",
      },
    };

    template = {
      giving_away: {
        script: ["hi", "by", "go"],
        description: "des",
        start_pos: 0,
        title: "Giving Away",
      },
      charge: {
        script: ["hi", "by", "go"],
        description: "des",
        start_pos: 1,
        title: "Charge",
      },
      vows: {
        script: ["hi", "by", "go"],
        description: "des",
        start_pos: 10,
        title: "Vows",
      },
      "giving_away~1": {
        script: ["hi", "by", "go"],
        description: "des",
        start_pos: 0,
        title: "Giving Away",
      },
    };
  });

  it("should return an object", () => {
    const res = fillCacheWithNewSections(cache, template);
    expect(typeof res).toBe("object");
    expect(res).toHaveProperty("vows");
  });

  it("it should have 4 keys", () => {
    const res = fillCacheWithNewSections(cache, template);
    const keys = Object.keys(res);
    expect(keys.length).toBe(4);
  });

  it('should not have "giving-away~1" in the object', () => {
    const res = fillCacheWithNewSections(cache, template);
    const keys = Object.keys(res);
    expect(keys.includes("giving-away~1")).toBe(false);
  });

  it('should have "giving-away~1" in the object', () => {
    const res = fillCacheWithNewSections(cache, template, true);
    const keys = Object.keys(res);
    expect(keys.includes("giving_away~1")).toBe(true);
  });

  it("should have 5 keys", () => {
    const res = fillCacheWithNewSections(cache, template, true);
    const keys = Object.keys(res);
    expect(keys.length).toBe(5);
  });

  it("objects should be the same", () => {
    const res = fillCacheWithNewSections(cache, cache, true);
    const keys = Object.keys(res);
    expect(keys.length).toBe(3);
  });
});
