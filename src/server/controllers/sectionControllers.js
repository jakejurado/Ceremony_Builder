const db = require("../databaseModels/sqlModel");
const sectionController = {};

sectionController.grabSection = (req, res, next) => {
  const sectionTitle = req.query.sec;
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

// sectionController.getCompanies = (req, res, next) => {
//   const companyQuery =
//     'SELECT * FROM "company" WHERE user_id = (SELECT _id from users WHERE name = $1)';
//   const userId = [res.locals.name];
//   db.query(companyQuery, userId)
//     .then((result) => {
//       console.log(result.rows);
//       res.locals.jobs = result.rows;
//       return next();
//     })
//     .catch((err) => {
//       return next({
//         log: "Express error handler caught in getJobs middleware error",
//         status: 500,
//         message: { err: "An error in getJobs" },
//       });
//     });
// };

module.exports = sectionController;
