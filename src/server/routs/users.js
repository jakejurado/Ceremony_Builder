const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//create a user
router.post("/account", userController.createUser, (req, res) => {
  return res.status(200).send(res.locals.userCreated);
});

//login user
router.get(
  "/account",
  userController.verifyPassword,
  userController.createToken,
  (req, res) => {
    return res.status(200).send(res.locals.userDeleted);
  }
);

//verify user
router.get(
  "/verifyToken",
  userController.checkForToken,
  userController.verifyToken,
  (req, res) => {
    return res.status(200).send(res.locals.userInfo);
  }
);

module.exports = router;
