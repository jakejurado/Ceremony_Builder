const db = require("../databaseModels/sqlModel");
const sectionController = {};

sectionController.grabSection = (req, res, next) => {
  const sectionTitle = req.query.sec;
  const sectionQuery =
    "SELECT scripts.script, meta_data.title, meta_data.varname, meta_data.description FROM scripts JOIN meta_data on scripts.section = $1 AND meta_data.varname = $1";
  db.query(sectionQuery, [sectionTitle])
    .then((result) => {
      res.locals.mySection = result.rows;
      console.log("rows", result.rows);
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




sectionController.grabSection2 = async (req, res, next) => {
  const sectionTitle = req.query.sec;
  const sectionQuery =
    "SELECT scripts.script, meta_data.title, meta_data.varname, meta_data.description FROM scripts JOIN meta_data on scripts.section = $1 AND meta_data.varname = $1";
  try {
    const result = await db.query(sectionQuery, [sectionTitle]);
    res.locals.mySection = result.rows;
    console.log("rows", result.rows);
    return next();
  } catch (err) {
    return next({
      log: "Express error handler caught in grabSection middleware error",
      status: 500,
      message: { err: "An error in grabSection" },
    });
  }
};


module.exports = sectionController;
