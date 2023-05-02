const express = require("express");
const router = express.Router();
const templateController = require("../controllers/templateController");

router.get("/all", templateController.grabAlltemplates, (req, res) => {
  return res.status(200).send(res.locals.templates);
});

router.post("/add", templateController.addTemplate, (req, res) => {
  return res.status(200).send(res.locals.templates);
});

router.put("/update", templateController.updateTemplate, (req, res) => {
  return res.status(200).send(res.locals.templates);
});

router.delete("/delete", templateController.deleteTemplate, (req, res) => {
  return res.status(200).send(res.locals.templates);
});

module.exports = router;