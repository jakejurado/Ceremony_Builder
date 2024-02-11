const express = require("express");
const router = express.Router();
const templateController = require("../controllers/templateController");
const userController = require("../controllers/userController")
const analyticsController = require("../controllers/analyticsController")

  //grabs all the templates of a user
router.get("/all", templateController.grabAllUserTemplates, (req, res) => {
  return res.status(200).send(res.locals.myTemplates);
});

  //adds a template to the database for a user
router.post("/userTemplate", analyticsController.recordTemplateSave, templateController.addUserTemplate, (req, res) => {
  return res.status(200).send(res.locals.templateInfo);
});

  //updates a user template in the database
router.put("/userTemplate", analyticsController.recordTemplateUpdate, templateController.updateUserTemplate, (req, res) => {
  return res.status(200).send(res.locals.templateInfo);
});

  //deletes a user template in the database
router.delete("/userTemplate", 
  userController.checkForToken,
  userController.verifyToken,
  userController.compareTokenAndUser,
  analyticsController.recordTemplateDelete,
  templateController.deleteUserTemplate, 
  (req, res) => {
    return res.status(204).send(res.locals.templateInfo);
    
  }
);

module.exports = router;
