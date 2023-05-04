const express = require("express");
const router = express.Router();
const templateController = require("../controllers/templateController");

router.get("/all", templateController.grabAllUserTemplates, (req, res) => {
  return res.status(200).send(res.locals.myTemplates);
});

router.post("/add", templateController.addUserTemplate, (req, res) => {
  return res.status(200).send(res.locals.mytemplates);
});

// router.put("/update", templateController.updateTemplate, (req, res) => {
//   return res.status(200).send(res.locals.mytemplates);
// });

// router.delete("/delete", templateController.deleteTemplate, (req, res) => {
//   return res.status(200).send(res.locals.mytemplates);
// });

module.exports = router;
