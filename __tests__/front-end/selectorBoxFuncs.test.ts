import { fetchCall } from "../../src/functions/fetches/api";
import { fetchTitles, organizeDataByCategory } from '../../src/functions/fetches/selectorBoxFuncs'; // replace 'yourModule' with the actual module name
import {FetchTitles, TitlesData} from "../../src/types/dispatch"

jest.mock("../../src/functions/fetches/api", () => ({
  fetchCall: {
    get: jest.fn()
  }
}));

describe("fetchTitles", () => {
  it("fetches and organizes titles correctly", async () => {
    // Arrange
    const mockUpdateState = jest.fn();
    const mockData: FetchTitles = [
      { category: "Category1", title: "Title1", varname: "Varname1" },
      { category: "Category1", title: "Title2", varname: "Varname2" },
      { category: "Category2", title: "Title3", varname: "Varname3" },
    ];
    const expectedData: TitlesData = {
      Category1: { Title1: "Varname1", Title2: "Varname2" },
      Category2: { Title3: "Varname3" }
    };
    (fetchCall.get as jest.Mock).mockResolvedValue(mockData);

    // Act
    await fetchTitles(mockUpdateState);

    // Assert
    expect(fetchCall.get).toHaveBeenCalledWith("titles");
    expect(mockUpdateState).toHaveBeenCalledWith(expectedData);
  });
});

describe("organizeDataByCategory", () => {
  it("organizes data by category correctly", () => {
    // Arrange
    const mockData: FetchTitles = [
      { category: "Category1", title: "Title1", varname: "Varname1" },
      { category: "Category1", title: "Title2", varname: "Varname2" },
      { category: "Category2", title: "Title3", varname: "Varname3" },
    ];
    const expectedData: TitlesData = {
      Category1: { Title1: "Varname1", Title2: "Varname2" },
      Category2: { Title3: "Varname3" }
    };

    // Act
    const result = organizeDataByCategory(mockData);

    // Assert
    expect(result).toEqual(expectedData);
  });
});
