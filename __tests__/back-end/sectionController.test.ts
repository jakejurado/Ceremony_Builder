import sectionController from "../../src/server/controllers/sectionController copy";
import db from "../../src/server/databaseModels/sqlModel"
import { Request, Response, NextFunction } from 'express';

// Mock the db.query function
jest.mock("../../src/server/databaseModels/sqlModel", () => {
  return {
    query: jest.fn(),
  };
});

describe("sectionController", () => {
  let mockRequest: Partial<Request>;
  let nextFunction: NextFunction = jest.fn();
  let mockResponse: Response;

  beforeEach(() => {
    mockResponse = {
      locals: {},
    } as Response;
  });

  it("grabSection should populate res.locals.mySection with data from db", async () => {
    const mockDbResponse = {
      rows: [{ /* mock data here */ }],
    };
    
    // set up our mockResponse to have the expected shape
    mockResponse.locals.myData = { varname: "test" };
    
    // mock our db.query to return our mockDbResponse when called
    (db.query as jest.MockedFunction<typeof db.query>).mockResolvedValueOnce(mockDbResponse);

    await sectionController.grabSection(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(db.query).toBeCalledWith(expect.any(String), ["test"]);
    expect(mockResponse.locals.mySection).toEqual(mockDbResponse.rows);
    expect(nextFunction).toBeCalledWith();
  });

  it("grabAllSectionTitles should populate res.locals.allTitles with data from db", async () => {
    const mockDbResponse = {
      rows: [{ /* mock data here */ }],
    };

    // mock our db.query to return our mockDbResponse when called
    (db.query as jest.MockedFunction<typeof db.query>).mockResolvedValueOnce(mockDbResponse);

    await sectionController.grabAllSectionTitles(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(db.query).toBeCalledWith(expect.any(String));
    expect(mockResponse.locals.allTitles).toEqual(mockDbResponse.rows);
    expect(nextFunction).toBeCalledWith();
  });
});
