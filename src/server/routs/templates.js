const express = require("express");
const router = express.Router();
const templateController = require("../controllers/templateController");
const userController = require("../controllers/userController")

  //grabs all the templates of a user
router.get("/all", templateController.grabAllUserTemplates, (req, res) => {
  return res.status(200).send(res.locals.myTemplates);
});

  //adds a template to the database for a user
router.post("/userTemplate", templateController.addUserTemplate, (req, res) => {
  return res.status(200).send(res.locals.templateInfo);
});

  //updates a user template in the database
router.put("/userTemplate", templateController.updateUserTemplate, (req, res) => {
  return res.status(200).send(res.locals.templateInfo);
});

  //deletes a user template in the database
router.delete("/userTemplate", 
  userController.checkForToken,
  userController.verifyToken,
  userController.compareTokenAndUser,
  templateController.deleteUserTemplate, 
  (req, res) => {
    return res.status(204).send(res.locals.templateInfo.msg);
  }
);

module.exports = router;
