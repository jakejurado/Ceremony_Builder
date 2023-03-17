const db = require("../databaseModels/sqlModel");
const templateController = {};

templateController.grabAlltemplates = async (req, res, next) => {
  const { email, password } = req.body;
  next();
};

templateController.addTemplate = async (req, res, next) => {
  const { email, password } = req.body;
  next();
};

templateController.updateTemplate = async (req, res, next) => {
  const { email, password } = req.body;
  next();
};

templateController.deleteTemplate = async (req, res, next) => {
  const { email, password } = req.body;
  next();
};

module.exports = templateController;
