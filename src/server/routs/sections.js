const express = require("express");
const router = express.Router();
const sectionController = require("../controllers/sectionControllers");

router.get("/titles", sectionController.grabAllSectionTiles, (req, res) => {
  return res.status(200).send(res.locals.allTitles);
});

router.get("/grab", sectionController.grabSection, (req, res) => {
  return res.status(200).send(res.locals.mySection);
});

module.exports = router;
