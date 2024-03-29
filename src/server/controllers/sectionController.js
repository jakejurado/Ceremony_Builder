const db = require("../databaseModels/sqlModel");
const sectionController = {};

  //grabs a section at the request of a user
sectionController.grabSection = (req, res, next) => {
  const sectionTitle = res.locals.myData.varname;
  const sectionQuery =
    "SELECT scripts.script, meta_data.title, meta_data.varname, meta_data.description FROM scripts JOIN meta_data on scripts.section = $1 AND meta_data.varname = $1";
  db.query(sectionQuery, [sectionTitle])
    .then((result) => {
      res.locals.mySection = result.rows;
      return next();
    })
    .catch((err) => {
      return next({
        log: "Express error handler caught in grabSection middleware error",
        status: 500,
        message: { err: "An error in grabSection" },
      });
    });
};

  //grabs all the section titles for user to select a Section to add to their database
sectionController.grabAllSectionTiles = (req, res, next) => {
  const sectionQuery = "SELECT title, varname, category FROM meta_data;";
  db.query(sectionQuery)
    .then((result) => {
      res.locals.allTitles = result.rows;
      return next();
    })
    .catch((err) => {
      return next({
        log: "Express error handler caught in grabAllSectionTitles middleware error",
        status: 500,
        message: { err: "An error in GrabAllSectionTitles" },
      });
    });
};


module.exports = sectionController;
