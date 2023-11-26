const db = require("../databaseModels/sqlModel");
const analyticsController = {};

//SECTION
analyticsController.recordSection = async (req, res, next) => {
  const sectionTitle = res.locals.myData.varname;
  const currUser = res.locals.myData.userId === 'null' ? 1 : res.locals.myData.userId;
  const action = 'grab'; // Assuming 'grab' is the intended action
  const query = `INSERT INTO analytics (type, user_id, action, name) VALUES ($1, $2, $3, $4)`;
  console.log({sectionTitle, currUser, action})
  console.log('res.locals.myData:', res.locals.myData);
  console.log('res.locals.myData.userId:', res.locals.myData.userId);
  try {
    await db.query(query, ['section', currUser, action, sectionTitle]);
    next();
  } catch (error) {
    console.log(error)
    const errorQuery = `INSERT INTO errorlog (controller, message) VALUES ($1, $2)`
    db.query(errorQuery, ['recordSection', error.message]);
    next()
  }
};

//TEMPLATE
analyticsController.recordTemplateSave = async (req, res, next) => {
  const currUser = res.locals.myData.userId
  const templateId = 'new';
  const type = 'template'
  const action = 'save'

  const query = `INSERT INTO analytics (type, user_id, action, name) VALUES ($1, $2, $3, $4)`;
  try{
    await db.query(query, [type, currUser, action, templateId]);
    next();
  }catch (error) {
    const errorQuery = `INSERT INTO errorlog (controller, message) VALUES ($1, $2)`
    db.query(errorQuery, ['recordTemplateSave', error.message]);
    next()
  }
}

analyticsController.recordTemplateDelete = async (req, res, next) => {
  const currUser = res.locals.myData.userId
  const teplateId = res.locals.myData.templateId
  const action = 'delete'
  const type = 'template'
  
  const query = 'INSERT INTO analytics (type, user_id, action, name) VALUES ($1, $2, $3, $4)';
  try{
    db.query(query, [type, currUser, action, teplateId]);
    next();
  } catch{
    db.query(errorQuery, ['recordTemplateDelete', error.message]);
    next()
  }
}

analyticsController.recordTemplateUpdate = async (req, res, next) => {
  const currUser = res.locals.myData.userId
  const templateId = res.locals.myData.templateId 
  const type = 'template'
  const action = 'update'
  const query = 'INSERT INTO analytics (type, user_id, action, name) VALUES ($1, $2, $3, $4)';
  try{
    db.query(query, [type, currUser, action, templateId]);
    next();
  } catch{
    db.query(errorQuery, ['recordTemplateUpdate', error.message]);
    next()
  }
}


//USER
analyticsController.recordNewUser = async (req, res, next) => {
  const username = 'new-user'
  const action = 'create'
  const type = 'user'
  const query = `INSERT INTO analytics (type, user_id, action) VALUES ($1, $2, $3)`;
  try{
    db.query(query, [type, username, action]);
    next();
  } catch{
    db.query(errorQuery, ['recordNewUser', error.message]);
    next()
  } 
}

analyticsController.recordUserDelete = async (req, res, next) => {
  const currUser = res.locals.myData.userId
  const action = 'delete'
  const type = 'user'
  const query = 'INSERT INTO analytics (type, user_id, action) VALUES ($1, $2, $3)';
  try{
    db.query(query, [type, currUser, action]);
    next();
  } catch{
    db.query(errorQuery, ['recordUserDelete', error.message]);
    next()
  }
}

analyticsController.recordSignout = async (req, res, next) => {
  const currUser = res.locals.myData.userId | 500
  const type = 'user'   
  const action = 'signout'
  const query = 'INSERT INTO analytics (type, user_id, action) VALUES ($1, $2, $3)';
  try{
    db.query(query, [type, currUser, action])
    next();
  } catch {
    db.query(errorQuery, ['recordUserSignout', error.message]);
    next()
  }

}





module.exports = analyticsController;