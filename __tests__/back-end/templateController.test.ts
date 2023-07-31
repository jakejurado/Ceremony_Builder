const templateController = require("../../src/server/controllers/templateController");

const dbase = require("../../src/server/databaseModels/sqlModel");
jest.mock("../../src/server/databaseModels/sqlModel");

describe('templateController', () => {

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    dbase.query.mockClear();
  });

  it('grabAllUserTemplates should get all templates for a user and call next', async () => {
    const req = {};
    const res = {
      locals: {
        myData: {
          userId: 'user1',
        },
        myTemplates: [],
      },
    };
    const next = jest.fn();
    dbase.query.mockResolvedValueOnce({ rows: ['template1', 'template2'] });

    await templateController.grabAllUserTemplates(req, res, next);
    expect(dbase.query).toHaveBeenCalledWith(expect.any(String), [res.locals.myData.userId]);
    expect(res.locals.myTemplates).toEqual(['template1', 'template2']);
    expect(next).toHaveBeenCalled();
  });

  it('addUserTemplate should add a template for a user and call next', async () => {
    const req = {};
    const res = {
      locals: {
        myData: {
          userId: 'user1',
          templateTitle: 'template1',
          userTemplate: 'content',
        },
        templateInfo: {},
      },
    };
    const next = jest.fn();
    dbase.query.mockResolvedValueOnce({ rows: [{ _id: 'id1', title: 'template1' }] });

    await templateController.addUserTemplate(req, res, next);
    expect(dbase.query).toHaveBeenCalledWith(
      expect.any(String),
      [res.locals.myData.userId, res.locals.myData.userTemplate, res.locals.myData.templateTitle]
    );
    expect(res.locals.templateInfo).toEqual({ _id: 'id1', title: 'template1' });
    expect(next).toHaveBeenCalled();
  });

  // xit('updateUserTemplate should update a template for a user and call next', (){
  //   const req = {};
  //   const res = {
  //     locals: {
  //       myData: {
  //         userId: 'user1',
  //         templateTitle: 'theTitle',
  //         templateId: 27,
  //         userTemplate: 'this is the updatedTemplate'
  //       }
  //     }
  //   }
  //   const next = jest.fn();
  //   dbase.query.mockRejectedValueOnce({rows: [{}]})

  // });

  
});
