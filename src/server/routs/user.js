const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");

router.post("/signup", userController.createUser, (req, res) => {
  return res.status(200).send(res.locals.userCreated);
});

router.get("/login", userController.authenticateUser, userController.createToken,  (req, res) => {
  return res.status(200).send(res.locals.userAuthenticated);
})

router.post("/access", userController.checkForToken, userController.verifyToken, (req, res) => {
  return res.status(200).send(res.locals.foundtoken);
});

module.exports = router;
