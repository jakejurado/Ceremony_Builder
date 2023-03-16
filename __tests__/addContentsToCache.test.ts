import { addContentsToCache } from "../src/functions/cache/cache";
import { Templates, Cache } from "../src/types/types";

describe("adding contents to the cache", () => {
  let template1 = {};
  let template2 = {};
  let templates;
  let cache = {};

  beforeEach(() => {
    template1 = {
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

    template2 = {
      giving_away: {
        script: ["hi", "by", "go"],
        description: "des",
        start_pos: 0,
        title: "Giving Away",
      },
      declaration: {
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
      reading: {
        script: ["hi", "by", "go"],
        description: "des",
        start_pos: 0,
        title: "Giving Away",
      },
    };
    templates = { wedding: template1, elope: template2 };
  });

  it("should return an object", () => {
    const res = addContentsToCache(templates, cache);
    expect(typeof res).toBe("object");
  });

  it("it should have 7 keys", () => {
    const res = addContentsToCache(templates, cache);
    const keys = Object.keys(res);
    expect(keys.length).toBe(6);
  });

  it("should have the corresponding sections", () => {
    const res = addContentsToCache(templates, cache);
    expect(res.hasOwnProperty("giving_away")).toBe(true);
    expect(res.hasOwnProperty("charge")).toBe(true);
    expect(res.hasOwnProperty("kiss")).toBe(true);
    expect(res.hasOwnProperty("declaration")).toBe(true);
    expect(res.hasOwnProperty("vows")).toBe(true);
    expect(res.hasOwnProperty("reading")).toBe(true);
  });

  it("should have sections with all their data", () => {
    const res = addContentsToCache(templates, cache);
    const givingAway = res.giving_away;
    console.log({ givingAway });
    expect(givingAway.hasOwnProperty("script")).toBe(true);
    expect(givingAway.hasOwnProperty("start_pos")).toBe(true);
    expect(givingAway.hasOwnProperty("title")).toBe(true);
    expect(givingAway.hasOwnProperty("description")).toBe(true);
  });
});
