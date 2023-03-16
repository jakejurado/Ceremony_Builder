import { addSecToTemplate } from "../src/functions/sections/addSec";

describe("Add Section To Template", () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            script: "One",
            title: "Declaration",
            varname: "declaration",
            description: "Fetch",
          },
          {
            script: "Two",
            title: "Declaration",
            varname: "declaration",
            description: "Fetch",
          },
        ]),
    })
  ) as jest.Mock;

  let order = [
    ["giving_away", 0],
    ["vows", 1],
  ];
  let index = 0;
  let varname = "giving_away";
  let setUpdatedData = (input) => {
    console.log("updated", input.payload.order);
  };

  const cache = {
    giving_away: {
      script: ["ga_cache", "ga_cache", "ga_cache"],
      description: "cache",
      start_pos: 0,
      title: "Giving Away",
    },
    charge: {
      script: ["c_cache", "c_cache", "c_cache"],
      description: "cache",
      start_pos: 1,
      title: "Charge",
    },
    vows: {
      script: ["hi", "by", "go"],
      description: "cache",
      start_pos: 10,
      title: "Vows",
    },
    kiss: {
      script: ["k_cache", "k_cache", "k_cache"],
      description: "cache",
      start_pos: 5,
      title: "The Kiss",
    },
  };

  const template = {
    giving_away: {
      script: ["ga_temp", "ga_temp", "ga_temp"],
      description: "template",
      start_pos: 0,
      title: "Giving Away",
      duplicates: 2,
    },
    vows: {
      script: ["v_temp", "v_temp", "v_temp"],
      description: "temp",
      start_pos: 10,
      title: "Vows",
    },
    kiss: {
      script: ["k_cache", "k_cache", "k_cache"],
      description: "cache",
      start_pos: 5,
      title: "The Kiss",
      duplicates: 7,
    },
    "giving_away~1": {
      script: ["hi", "by", "go"],
      description: "des",
      start_pos: 0,
      title: "Giving Away",
    },
    order: [
      ["giving_away", 0],
      ["vows", 1],
    ],
  };

  beforeEach(() => {
    cache;
    template;
    order;
    index;
    varname;
  });

  it("adds a section to the template when the section isn not already in the order", () => {
    const res = addSecToTemplate(
      "charge",
      index,
      order,
      template,
      cache,
      setUpdatedData
    );
    expect(res.hasOwnProperty("charge")).toBe(true);
  });

  it("adds a duplicated section to the template when the section is already in the order", () => {
    const res = addSecToTemplate(
      "giving_away",
      index,
      order,
      template,
      cache,
      setUpdatedData
    );
    console.log({ res });
    expect(res.hasOwnProperty("giving_away~2")).toBe(true);
    expect(res.giving_away.duplicates).toBe(2);
  });

  it("adds a section to the template from the cache and not the template when duplicating", () => {
    const res = addSecToTemplate(
      "giving_away",
      index,
      order,
      template,
      cache,
      setUpdatedData
    );
    console.log({ res });
    expect(res["giving_away~2"].description).toBe("cache");
  });

  it("adds adds/updates the duplicates property of the section when duplicated", () => {
    const first = addSecToTemplate(
      "giving_away",
      index,
      order,
      template,
      cache,
      setUpdatedData
    );
    const second = addSecToTemplate(
      "vows",
      index,
      order,
      template,
      cache,
      setUpdatedData
    );
    console.log({ first, second });
    expect(first.giving_away.duplicates).toBe(3);
    expect(second.vows.duplicates).toBe(2);
  });

  it("doesn't duplicate a section if not in the templates, but does have a duplicates property", () => {
    const res = addSecToTemplate(
      "kiss",
      index,
      order,
      template,
      cache,
      setUpdatedData
    );
    console.log({ res });
    expect(res.hasOwnProperty("kiss")).toBe(true);
  });

  it(" does not change when a fetch is made", () => {
    const res = addSecToTemplate(
      "declaration",
      index,
      order,
      template,
      cache,
      setUpdatedData
    );
    expect(res.order).toEqual(template.order);
  });
});
