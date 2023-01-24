const express = require("express");
const app = express();
const port = process.env.PORT || 8081;
const path = require("path");
const cookieParser = require("cookie-parser");
const controller = require("./controller");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("dist"));
app.use(cors());

//post request to /save
app.post("/save", controller.saveCeremonyScript, (req, res) => {
  console.log("fileSaved");
  return res.status(200).json(res.locals.mySave);
});

//get request to /save
app.get("/save", controller.getCeremonyScripts, (req, res) => {
  console.log("from the server the json", typeof res.locals.myScripts);
  return res.status(200).json(res.locals.myScripts);
});

//load the original page
app.get("/", (req, res) => {
  console.log("hi");
  return res
    .status(200)
    .res.sendFile(path.resolve(__dirname, "../dist/index.html"));
});

// catch all stray endpoints that don't match and send 404 status
app.use((req, res) => res.sendStatus(404));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// This displays message that the server running and listening to specified port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});