const express = require("express");
const app = express();
const port = process.env.PORT || 8081;
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const { rateLimit } = require('express-rate-limit')
const helmet = require("helmet");
const { getSecrets } = require("./envSecrets/envfiles");
require("dotenv").config();

async function startServer(){
  const secrets = await getSecrets();
  process.env.MYURL = secrets.MYURL;
  process.env.JWT_SECRET = secrets.JWT_SECRET;
  process.env.SECRET_KEY = secrets.SECRET_KEY;
  process.env.SMTP_HOST = secrets.SMTP_HOST;
  process.env.SMTP_PORT = secrets.SMTP_PORT;
  process.env.SMTP_USER = secrets.SMTP_USER;
  process.env.SMTP_PASSWORD = secrets.SMTP_PASSWORD;
  process.env.OPENAI_KEY = secrets.OPENAI_KEY;
  

  app.set('trust proxy', false);

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    // store: ... , // Use an external store for more precise rate limiting
  })
  const sectionRouter = require("./routs/sections");
  const userRouter = require("./routs/user");
  const templateRouter = require("./routs/templates");
  const aiRouter = require("./routs/ai");

  //use helmet
  app.use(helmet());
  // Apply the rate limiting middleware to all requests
  app.use(limiter)
  // Parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));
  // Parse application/json
  app.use(bodyParser.json({ limit: '500kb' }));
    //express
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
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
  app.use("/ai", aiRouter);

    //serve the original page
  app.get("/", (req, res) => {
    return res
      .status(200)
      .sendFile(path.resolve(__dirname, "../dist/index.html"));
  });

    // catch all stray endpoints that don't match and send 404 status
  app.use((req, res) => res.sendStatus(404));

    // Global error handler
  app.use((err, req, res, next) => {
    const defaultErr = {
      log: "Express error handler caught unknown middleware error",
      status: 400,
      message: { err: "An error occurredd " + err},
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });

    // This displays message that the server running and listening to specified port
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}
startServer().catch(console.error);
