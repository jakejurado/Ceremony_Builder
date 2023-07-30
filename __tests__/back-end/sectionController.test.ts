const sectionController = require("../../src/server/controllers/sectionController");
// Mock the 'db' module
const db = require("../../src/server/databaseModels/sqlModel");
jest.mock("../../src/server/databaseModels/sqlModel");

describe('sectionController', () => {

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    db.query.mockClear();
  });

  it('grabSection should get a section and call next', async () => {
    const req = {};
    const res = {
      locals: {
        myData: {
          varname: 'sectionTitle',
        },
        mySection: [],
      },
    };
    const next = jest.fn();
    db.query.mockResolvedValueOnce({ rows: ['data'] });

    await sectionController.grabSection(req, res, next);
    expect(db.query).toHaveBeenCalledWith(
      expect.any(String),
      expect.arrayContaining([res.locals.myData.varname])
    );
    expect(res.locals.mySection).toEqual(['data']);
    expect(next).toHaveBeenCalled();
  });

  it('grabAllSectionTitles should get all section titles and call next', async () => {
    const req = {};
    const res = {
      locals: {
        allTitles: [],
      },
    };
    const next = jest.fn();
    db.query.mockResolvedValueOnce({ rows: ['title1', 'title2'] });

    await sectionController.grabAllSectionTiles(req, res, next);
    expect(db.query).toHaveBeenCalledWith(expect.any(String));
    expect(res.locals.allTitles).toEqual(['title1', 'title2']);
    expect(next).toHaveBeenCalled();
  });

  xit('grabSection should handle db query errors', async () => {
    const req = {};
    const res = {
      locals: {
        myData: {
          varname: 'sectionTitle',
        },
        mySection: [],
      },
    };
    const next = jest.fn();
    db.query.mockRejectedValueOnce(new Error('DB error'));

    await sectionController.grabSection(req, res, next);
    expect(db.query).toHaveBeenCalledWith(
      expect.any(String),
      expect.arrayContaining([res.locals.myData.varname])
    );
    expect(next).toHaveBeenCalledWith({
      log: "Express error handler caught in grabSection middleware error",
      status: 500,
      message: { err: "An error in grabSection" },
    });
  });

  xit('grabAllSectionTitles should handle db query errors', async () => {
    const req = {};
    const res = {
      locals: {
        allTitles: [],
      },
    };
    const next = jest.fn();
    db.query.mockRejectedValueOnce(new Error('DB error'));

    await sectionController.grabAllSectionTiles(req, res, next);
    expect(db.query).toHaveBeenCalledWith(expect.any(String));
    expect(next).toHaveBeenCalledWith({
      log: "Express error handler caught in grabAllSectionTitles middleware error",
      status: 500,
      message: { err: "An error in GrabAllSectionTitles" },
    });
  });
});
