const db = require("../databaseModels/sqlModel");
const templateController = {};

templateController.grabAllUserTemplates = async (req, res, next) => {
  try {
    const { userId } = req.query;
    const sql_queryAll = "SELECT * from templates where _id = $1";
    const { rows } = db.query(sql_query, [userId]);
    res.locals.myTemplates = rows;
    return next();
  } catch (err) {
    return next({
      log: "Express Error handler caught in grabAllUserTemplates err",
      status: 500,
      message: { err: "No able to grab templates" },
    });
  }
};


templateController.addTemplate = async (req, res, next) => {
  try {
    const { userId, template } = req.query;
    const sql_query_add = "INSERT INTO templates(creator, template) VALUES($1, $2)";
    db.query(sql_query_add, [userId, template]);
    next();
  } catch(err){
    return next({
      log: "Express Error handler caught in addTemplate err",
      status: 500,
      message: { err: "No able to add Template" },
    });
  }
};

templateController.updateTemplate = async (req, res, next) => {
  try {
    const { template, templateId, creatorId } = req.body;
    const sql_query_add = "UPDATE templates SET template = $1 WHERE _id = $2 AND creator = $3;";
    db.query(sql_query_add, [template, templateId, creatorId]);
    next();
  } catch(err){
    return next({
      log: "Express Error handler caught in addTemplate err",
      status: 500,
      message: { err: "No able to add Template" },
    });
  }
};

templateController.deleteTemplate = async (req, res, next) => {
  try {
    const { userId, templateId } = req.query;
    const sql_query_add = "DELETE from templates WHERE _id = $1 AND creator = $2;";
    db.query(sql_query_add, [templateId, userId]);
    next();
  } catch(err){
    return next({
      log: "Express Error handler caught in addTemplate err",
      status: 500,
      message: { err: "No able to add Template" },
    });
  }
};

module.exports = templateController;