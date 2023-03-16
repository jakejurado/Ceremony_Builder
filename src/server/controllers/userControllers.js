const db = require("../databaseModels/sqlModel");
const userController = {};

//INPUT: object => {user: 'string', password: 'string'}
//OUTPUT: string => new user created
userControllers.createUser = (req, res, next) => {
  const { name, password } = req.body;

  //check that all fields are not empty
  if (!name || !password)
    return next({
      log: "Express Error handler caught in createUser err",
      status: 500,
      message: { err: "field is empty" },
    });

  //signup user
  const sql_userInsert = "INSERT INTO users (name) VALUES ($1)";
  db.query(sql_userInsert, [name])
    .then((result) => {
      res.locals.userCreated = "user has been created";
      return next();
    })
    .catch((err) => {
      return next({
        log: "Express Error handler caught in createUser err",
        status: 500,
        message: { err: "user already exists" },
      });
    });
};

//verifies user exists, sending them back to the signup page if they don't, and sending them to the main page if they do.
//INPUT: object => {user: 'string'}
//OUTPUT: 1)if not a user then send status 200 and redirect.  2) send object with user info {name, ect...} to next middleware.
userControllers.verifyUser = (req, res, next) => {
  console.log("entered verifyUser");
  const { name } = req.body;
  const sqlVerify = "SELECT name FROM users WHERE name = $1";
  db.query(sqlVerify, [name])
    .then((result) => {
      res.locals.currUser = result.rows[0];
      return next();
    })
    .catch((err) => {
      console.log("entered errror");
      return next({
        log: "Express Error handler caught in verifyUser err",
        status: 500,
        message: { err: "wrong username" },
      });
    });
};

userControllers.createToken = (req, res, next) => {
  console.log("entered create token");
  console.log("here is the header", req.header);
  const { name } = req.body;
  jwt.sign(
    { name },
    process.env.JWT_SECRET,
    { expiresIn: "72h" },
    (err, token) => {
      res.locals.myToken = { token };
      console.log(token);
      res.cookie("authorization", token, { HttpOnly: true });
      next();
    }
  );
};

userControllers.checkForToken = (req, res, next) => {
  console.log("entered check for token");
  const token = req.cookies.authorization;
  if (typeof token !== "undefined") {
    req.token = token;
    return next();
  } else {
    //If header is undefined return (401)
    // res.sendStatus(401);
    return next({
      log: "Express error handler caught in loginControllers.verifyToken middleware error",
      status: 401,
      message: { err: "Could not connect to the protected route" },
    });
  }
};

userControllers.verifyToken = (req, res, next) => {
  //verify the JWT token generated for the user
  jwt.verify(req.token, process.env.JWT_SECRET, (err, authorizedData) => {
    if (err) {
      //If error send (401)
      console.log("ERROR: Could not connect to the protected route");
      // res.sendStatus(401);
      return next({
        log: "Express error handler caught in loginControllers.verifyToken middleware error",
        status: 401,
        message: { err: "Could not connect to the protected route" },
      });
    } else {
      //If token is successfully verified, we can send the autorized data
      res.locals.name = authorizedData.name;
      // res.json({
      //   message: 'Successful log in',
      //   authorizedData
      // });
      console.log("SUCCESS: Connected to protected route");
      return next();
    }
  });
};

module.exports = userController;
