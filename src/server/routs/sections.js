const express = require("express");

const sectionController = require("../controllers/sectionControllers");
const router = express.Router();

router.get("/titles", sectionController.grabAllSectionTiles, (req, res) => {
  return res.status(200).send(res.locals.allTitles);
});

router.get("/specific", sectionController.grabSection, (req, res) => {
  return res.status(200).send(res.locals.characters);
});

module.exports = router;
