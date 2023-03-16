const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");

router.post("/create", userController.createUser, (req, res) => {
  return res.status(200).send(res.locals.________);
});

router.get("/access", userController._______, (req, res) => {
  return res.status(200).send(res.locals._____________);
});

module.exports = router;
