const express = require("express");
const router = express.Router();
const templateController = require("../controllers/templateController");

router.get("/all", templateController.grabAllUserTemplates, (req, res) => {
  return res.status(200).send(res.locals.myTemplates);
});

function helpme(){
  console.log('entered help me');
  return next();
}

router.post("/userTemplate", templateController.addUserTemplate, (req, res) => {
  return res.status(200).send(res.locals.templateInfo);
});

router.put("/userTemplate", templateController.updateUserTemplate, (req, res) => {
  return res.status(200).send(res.locals.templateInfo);
});

router.delete("/userTemplate", templateController.deleteUserTemplate, (req, res) => {
  return res.status(200).send(res.locals.templateInfo);
});

module.exports = router;
