const express = require("express");
const router = express.Router();
const templateController = require("../controllers/templateController");
const userController = require("../controllers/userController");

router.get(
  "/all",
  userController.checkForToken,
  userController.verifyToken,
  templateController.grabAllUserTemplates,
  (req, res) => {
    return res.status(200).send(res.locals.templates);
  }
);

router.post(
  "/add",
  userController.checkForToken,
  userController.verifyToken,
  templateController.addTemplate,
  (req, res) => {
    return res.status(200).send(res.locals.templates);
  }
);

router.put(
  "/update",
  userController.checkForToken,
  userController.verifyToken,
  templateController.updateTemplate,
  (req, res) => {
    return res.status(200).send(res.locals.templates);
  }
);

router.put(
  "/updateName",
  userController.checkForToken,
  userController.verifyToken,
  templateController.updateTemplateName,
  (req, res) => {
    return res.status(200).send(res.locals.templates);
  }
);

router.delete(
  "/delete",
  userController.checkForToken,
  userController.verifyToken,
  templateController.deleteTemplate,
  (req, res) => {
    return res.status(200).send(res.locals.templates);
  }
);

module.exports = router;
