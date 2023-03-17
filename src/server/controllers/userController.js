const db = require("../databaseModels/sqlModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userController = {};

//CREATE A USER
//INPUT: object => {email: 'string', password: 'string'}
//OUTPUT: string => new user created
userController.createUser = async (req, res, next) => {
  const { email, password } = req.body;

  //check that all fields are not empty
  if (email === undefined || password === undefined)
    return next({
      log: "Express Error handler caught in createUser err",
      status: 500,
      message: { err: "field is empty" },
    });

  //database string
  const sql_userCreate =
    "INSERT INTO public.users(user_email, user_password) VALUES ($1, $2)";

  //encrypt password
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    await db.query(sql_userCreate, [email, hash]);
    const verified = await bcrypt.compare(password, hash);
    console.log({ verified });
    res.locals.userCreated = "user has been created";
    console.log({ email, password });
    return next();
  } catch (err) {
    return next({
      log: "Express Error handler caught in createUser err",
      status: 500,
      message: { err: "user already exists" },
    });
  }
};

userController.deleteUser = (req, res, next) => {
  const { email, password } = req.body;

  //check that all fields are not empty
  if (email === undefined || password === undefined)
    return next({
      log: "Express Error handler caught in createUser err",
      status: 500,
      message: { err: "field is empty" },
    });

  //database string
  const sql_userCreate = "DELETE FROM users WHERE user_email = $1";

  //encrypt password
  bcrypt.hash(password, saltRounds, function (err, hash) {
    const values = [email, hash];
    console.log({ values, password });
    db.query(sql_userCreate, values)
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
  });
};

//VERIFY PASSWORD: verifies user exists by checking the password.
//INPUT: object => {email: 'string', password: 'string'}
//OUTPUT: 1)if not a user then send status 200 and redirect.  2) send object with user email {email} to next middleware.
userController.verifyPassword = async (req, res, next) => {
  console.log("entered verifyPassword");
  const { email, password } = req.query;

  const sqlPassword = "SELECT user_password FROM users WHERE user_email = $1";

  try {
    const { rows } = await db.query(sqlPassword, [email]);
    const verified = await bcrypt.compare(password, rows[0].user_password);
    req.email = email;
    if (verified) return next();
    else throw error;
  } catch (err) {
    return next({
      log: "Express Error handler caught in verifyPassword err",
      status: 500,
      message: { err: "No able to verify credentials" },
    });
  }
};

//CREATE JWT TOKEN
//INPUT: { email }
//OUTPUT:
userController.createToken = async (req, res, next) => {
  try {
    const email = req.email;

    // Create a JWT token with a payload containing the user's email
    const token = await new Promise((resolve, reject) => {
      jwt.sign(
        { email },
        process.env.JWT_SECRET,
        { expiresIn: "72h" },
        (err, token) => {
          if (err) reject(err);
          resolve(token);
        }
      );
    });

    // Set the token in a cookie with the HttpOnly and Secure flags
    res.cookie("authorization", token, {
      httpOnly: true, // Prevent client-side access to the cookie
      secure: true, // Only send the cookie over HTTPS
      sameSite: "strict", // Prevent cross-site request forgery attacks
      maxAge: 3 * 24 * 60 * 60 * 1000, // Expire the cookie after 3 days
    });

    // Pass the token to the next middleware or controller
    res.locals.myToken = { token };
    next();
  } catch (err) {
    // Handle any errors that occurred while creating the token
    next(err);
  }
};

// userControllers.createToken = (req, res, next) => {
//   const { email } = req.body;

//   // Create a JWT token with a payload containing the user's email
//   jwt.sign(
//     { email },
//     process.env.JWT_SECRET,
//     { expiresIn: "72h" },
//     (err, token) => {
//       if (err) {
//         // Handle any errors that occurred while creating the token
//         return next(err);
//       }

//       // Set the token in a cookie with the HttpOnly and Secure flags
//       res.cookie("authorization", token, {
//         httpOnly: true, // Prevent client-side access to the cookie
//         secure: true, // Only send the cookie over HTTPS
//         sameSite: "strict", // Prevent cross-site request forgery attacks
//         maxAge: 3 * 24 * 60 * 60 * 1000, // Expire the cookie after 3 days
//       });

//       // Pass the token to the next middleware or controller
//       res.locals.myToken = { token };
//       next();
//     }
//   );
// };

// userControllers.createToken = (req, res, next) => {
//   console.log("entered create token");
//   console.log("here is the header", req.header);
//   const { email } = req.body;
//   console.log({ email });
//   jwt.sign(
//     { email },
//     process.env.JWT_SECRET,
//     { expiresIn: "72h" },
//     (err, token) => {
//       res.locals.myToken = { token };
//       console.log(token);
//       res.cookie("authorization", token, { HttpOnly: true });
//       next();
//     }
//   );
//   next();
// };

userController.checkForToken = (req, res, next) => {
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

userController.verifyToken = async (req, res, next) => {
  try {
    const authorizedData = await jwt.verify(req.token, process.env.JWT_SECRET);
    res.locals.myEmail = authorizedData.email;
    console.log(res.locals.myEmail);
    console.log("SUCCESS: Connected to protected route");
    next();
  } catch (err) {
    console.log("ERROR: Could not connect to the protected route");
    res.sendStatus(401);
    next({
      log: "Express error handler caught in loginControllers.verifyToken middleware error",
      status: 401,
      message: { err: "Could not connect to the protected route" },
    });
  }
};

module.exports = userController;
