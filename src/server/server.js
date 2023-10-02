const express = require("express");
const app = express();
const port = process.env.PORT || 8081;
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const { rateLimit } = require('express-rate-limit')
const helmet = require("helmet");

require("dotenv").config();

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	// store: ... , // Use an external store for more precise rate limiting
})
const sectionRouter = require("./routs/sections");
const userRouter = require("./routs/user");
const templateRouter = require("./routs/templates")

//use helmet
app.use(helmet());
// Apply the rate limiting middleware to all requests
app.use(limiter)
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Parse application/json
app.use(bodyParser.json({ limit: '500kb' }));
  //express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("dist"));
  //cookies
app.use(cookieParser());
  //passes all data into a localfolder myData
app.use((req, res, next) => {
  res.locals.myData = Object.entries(req.query).length? req.query : req.body
  next();
});

  //routers
app.use("/sections", sectionRouter);
app.use("/user", userRouter);
app.use("/templates", templateRouter);

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
    message: { err: "An error occurred"},
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

  // This displays message that the server running and listening to specified port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
