const db = require("../databaseModels/sqlModel");
const original_template = require("../files/serverDB");

const fs = require("fs");
const path = require("path");

const goatcheese = {
  name: "my_saves",
  entries: [
    [
      ["vows", "01"],
      ["kiss", "01"],
    ],
    [
      ["opening_remarksOP", "14"],
      ["vows", "00"],
      ["kiss", "04"],
    ],
  ],
};

const controller = {};

controller.loadPage = (req, res, next) => {
  console.log("entered load page");
  res.locals.myTemplates = original_template;
  next();
};

controller.saveCeremonyScript = (req, res, next) => {
  console.log("save ceremony script enter");
  console.log("here is the request body", req.body);
  console.log(typeof req.body);
  fs.writeFile(
    path.join(__dirname, "/files/ceremonyArr.json"),
    JSON.stringify(req.body),
    (err) => {
      if (err) {
        console.error(err);
      } else {
        res.locals.mySave = JSON.stringify(req.body);
      }
      next();
    }
  );
};

controller.getCeremonyScripts = (req, res, next) => {
  console.log("entered getCeremonyScripts");
  fs.readFile(
    path.join(__dirname, "/files/ceremonyArr.json"),
    "utf8",
    (err, data) => {
      if (err) console.error(err);
      else {
        //console.log('here is the data', typeof data);
        res.locals.myScripts = data;
      }
      next();
    }
  );
};

module.exports = controller;
