const db = require("../server/sqlModel");

const { flushSync } = require("react-dom");
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
