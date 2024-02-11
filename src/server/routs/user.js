const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
// const analyticsController = require("../controllers/analyticsController");

  //creates a user to the database
router.post("/signup", userController.createUser, (req, res) => {
  return res.status(200).send(res.locals.userCreated);
});

  //deletes a user from the database
router.delete("/signup", 
  userController.authenticateUser,
  userController.deleteUser, 
  userController.removeToken,
  (req, res) => {
    return res.status(200).send(res.locals.userDeleted);
  }
);

  //resets a user's password
router.put("/signup", 
  userController.authenticateUser,
  userController.resetUserPassword,
  (req, res) => {
    return res.status(200).send(res.locals.resetPassword);
});

  //authenticates a user for login
router.get("/login", userController.authenticateUser, userController.createToken,  (req, res) => {
  return res.status(200).send(res.locals.userAuthenticated);
})

  //creates new password and sends it in email.
router.put('/forgot', 
  userController.checkUserExistence,
  userController.generatePassword, 
  userController.resetUserPassword,
  userController.emailPassword,
  (req, res) => {
  return res.status(200).send(res.locals.resetPassword)
})

  //checks the browswer for a cookie to see if a user is logged in
router.get("/access", userController.checkForToken, userController.verifyToken,  (req, res) => {
  return res.status(200).send(res.locals.foundtoken);
});

  //sign out and remove cookies and token
router.get("/signout", userController.removeToken, (req, res) => {
  return res.status(200).send(res.locals.foundtoken);
});

module.exports = router;
