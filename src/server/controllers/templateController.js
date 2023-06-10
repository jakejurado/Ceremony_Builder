const db = require("../databaseModels/sqlModel");
const templateController = {};

templateController.grabAllUserTemplates = async (req, res, next) => { 
  try {
    const { userId } = req.query;
    const sql_queryAll = "SELECT * from templates WHERE creator = $1";
    const { rows } = await db.query(sql_queryAll, [userId]);
    res.locals.myTemplates = rows;
    next();
  } catch (err) {
    return next({
      log: "Express Error handler caught in grabAllUserTemplates err",
      status: 500,
      message: { err: "Not able to grab templates" },
    });
  }
};


templateController.addUserTemplate = async (req, res, next) => {
  const { userId, templateTitle, userTemplate } = req.body;
  try {
    const sql_query_add = "INSERT INTO templates (creator, template, title) VALUES ($1, $2, $3) RETURNING _id, title";
    const results = await db.query(sql_query_add, [userId, userTemplate, templateTitle])
    const {_id, title} = results.rows[0]
    res.locals.templateInfo = { _id, title };
    console.log({_id, title})
    next();
  } catch(err){
    return next({
      log: "Express Error handler caught in addUserTemplate err",
      status: 500,
      message: { err: "No able to add Template" },
    });
  }
};

templateController.updateUserTemplate = async (req, res, next) => {
  const { userId, templateTitle, userTemplate, templateId } = req.body;
  try {
    const sql_query_add = "UPDATE public.templates SET title = $1, template = $2 WHERE _id = $3 AND creator = $4;";
    const results = await db.query(sql_query_add, [templateTitle, userTemplate, templateId, userId]);
    res.locals.templateInfo = results;
    next();
  } catch(err){
    return next({
      log: "Express Error handler caught in updateUserTemplate err",
      status: 500,
      message: { err: "No able to update Template" },
    });
  }
};

templateController.deleteUserTemplate = async (req, res, next) => {
  const { userId, templateId } = req.query;
  try {
    const sql_query_add = "DELETE from templates WHERE _id = $1 AND creator = $2;";
    const results = await db.query(sql_query_add, [templateId, userId]);
    res.locals.templateInfo = {msg: 'item deleted', results}
    next();
  } catch(err){
    return next({
      log: "Express Error handler caught in deleteUserTemplate err",
      status: 500,
      message: { err: "No able to delete Template" },
    });
  }
};

module.exports = templateController;