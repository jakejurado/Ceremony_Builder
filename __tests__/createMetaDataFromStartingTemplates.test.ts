import { createMetaDataFromStartingTemplates } from "../src/functions/metaData/createMetaDataFromStartingTemplates"
describe("createMetaDataFromStartingTemplates", () => {
  test("should add meta data from starting templates to metaData state", () => {
    const templates = {
      template1: {},
      template2: {},
      template3: {},
    };

    const metaData = new Map();

    const setMetaData = jest.fn();

    createMetaDataFromStartingTemplates(templates, metaData, setMetaData);

    expect(setMetaData).toHaveBeenCalledTimes(1);

    const updatedMetaData = setMetaData.mock.calls[0][0];

    expect(updatedMetaData instanceof Map).toBe(true);
    expect(updatedMetaData.size).toBe(Object.keys(templates).length);

    Object.keys(templates).forEach((el) => {
      expect(updatedMetaData.get(el)).toEqual({
        title: el,
        number: null,
      });
    });
  });
});
