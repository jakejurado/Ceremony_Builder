const express = require("express");

const sectionController = require("../controllers/sectionControllers");
const router = express.Router();

router.get("/titles", sectionController.grabAllSectionTiles, (req, res) => {
  return res.status(200).send(res.locals.allTitles);
});

router.get("/grab", sectionController.grabSection, (req, res) => {
  return res.status(200).send(res.locals.mySection);
});

module.exports = router;
