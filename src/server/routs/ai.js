const express = require("express");
const router = express.Router();
const aiController = require("../controllers/aiController");

  //sends a request to open ai to get content
router.post("/grab", aiController.writeScript, (req, res) => {
  return res.status(200).send(res.locals.aiResults);
});

module.exports = router;
