const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/account", userController.createUser, (req, res) => {
  return res.status(200).send(res.locals.userCreated);
});

router.get(
  "/account",
  userController.verifyPassword,
  userController.createToken,
  (req, res) => {
    return res.status(200).send(res.locals.userDeleted);
  }
);

router.get(
  "/verifyToken",
  userController.checkForToken,
  userController.verifyToken,
  (req, res) => {
    return res.status(200).send(res.locals.userinfo);
  }
);

// router.get("/access", userControllers._______, (req, res) => {
//   return res.status(200).send(res.locals._____________);
// });

module.exports = router;
