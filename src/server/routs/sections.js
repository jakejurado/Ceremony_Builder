const express = require("express");
const router = express.Router();
const sectionController = require("../controllers/sectionController");
const analyticsController = require("../controllers/analyticsController");

  //grabs all the section titles for the user to add a section
router.get("/titles", sectionController.grabAllSectionTiles, (req, res) => {
  return res.status(200).send(res.locals.allTitles);
});

  //grabs a specific section for the user
router.get("/grab", analyticsController.recordSection, sectionController.grabSection, (req, res) => {
  return res.status(200).send(res.locals.mySection);
});

module.exports = router;
