const express = require("express");
const app = express();
const port = process.env.PORT || 8081;
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
// const cors = require("cors");
require("dotenv").config();


const sectionRouter = require("./routs/sections");
const userRouter = require("./routs/user");
const templateRouter = require("./routs/templates")

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Parse application/json
app.use(bodyParser.json({ limit: '500kb' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("dist"));
// app.use(cors());


//routers
app.use("/sections", sectionRouter);
app.use("/user", userRouter);
app.use("/templates", templateRouter);


app.get('/milk', () => console.log('milk'))

//serve the original page
app.get("/", (req, res) => {
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
