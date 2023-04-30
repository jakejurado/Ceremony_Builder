const db = require("../databaseModels/sqlModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const userController = {};

//creates a user in the database
userController.createUser = async ( req, res, next) => {
  let {email, password } = req.query;

  //check that all fields are not empty
  if(!email || !password){
    return next({
      log: "Express Error handler caught in createUser err",
      status: 500,
      message: { err: "field is empty" },
    });
  }

  try {
     //hash password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    //signup user
    const sql_userInsert =  "INSERT INTO users (user_email, user_password) VALUES ($1, $2)";
    await db.query(sql_userInsert, [email, hashedPassword]);
    res.locals.userCreated = "user has been created";
    return next();

  } catch (err) {
    return next({
      log: "Express Error handler caught in createUser err",
      status: 500,
      message: { err: "user already exists" },
    });
  }
}

//Confirms that user and password are correct
userController.authenticateUser = async (req, res, next) => {
  const {email, password} = req.query;

  //both values must not be truthy
  if(!email || !password){
    return next({
      log: "Express Error handler caught in createUser err",
      status: 500,
      message: { err: "field is empty" },
    });
  }

  try{
    //grab stored password
    const sql_verifyUser = "SELECT user_password FROM users where user_email = ($1)";
    const storedPasswordResult = await db.query(sql_verifyUser, [email]);
    const storedPassword = storedPasswordResult.rows[0].user_password;

    //check if passwords match
    const passwordsMatch = await bcrypt.compare(password, storedPassword);

    //password
    if(passwordsMatch){
      res.locals.userAuthenticated = 'user is authenticated'
      return next();
    } else{
      return next({
        log: "Express Error handler caught in authenticate user err",
        status: 500,
        message: { err: "user does not authenticate" },
      });
    }
  } catch (err) {
    return next({
      log: "Express Error handler caught in authenticate err",
      status: 500,
      message: { err: "caught error in authentication" },
    });
  }
}

//INPUT: 
//OUTPUT: 
//creates a token and places in cookie
userController.createToken = async (req, res, next) => {
  const { email } = req.query;
  try {
    const token = await new Promise((resolve, reject) => {
      jwt.sign(
        { email },
        process.env.JWT_SECRET,
        { expiresIn: "72h" },
        (err, token) => {
          if (err) {
            reject(err);
          } else {
            resolve(token);
          }
        }
      );
    });

    res.locals.myToken = { token };
    res.cookie("authorization", token, { HttpOnly: true });
    next();
  } catch (error) {
    next({
      log: "Express error handler caught in createToken middleware error",
      status: 500,
      message: { err: "An error occurred while creating a token" },
    });
  }
};


//INPUT
//OUTPUT
//confirms that user has a token.
userController.checkForToken = (req, res, next) => {

  const {email} = req.body
  const token = req.cookies.authorization;

  if (typeof token !== "undefined") {
    req.token = token;
    res.locals.foundtoken = 'found the token';
    return next();
  } else {
    return next({
      log: "Express error handler caught in checkForToken error",
      status: 401,
      message: { err: "user is not authorized" },
    });
  }
};

//INPUT: 
//OUTPUT
//verifies current user matches token user.
userController.verifyToken = async (req, res, next) => {
  const {email} = req.query;
  //verify the JWT token generated for the user

  try {
    const decoded = await jwt.verify(req.token, process.env.JWT_SECRET)
    if(decoded.email === email){
      res.locals.userToken = 'permission granted';
      return next();
    } else{
      return next({
        log: "user is not authorized at all!!!",
        status: 401,
        message: { err: "User is not authorized" },
      });
    }

  } catch (err) {
    return next({
      log: "Express error handler caught in loginControllers.verifyToken middleware error",
      status: 401,
      message: { err: "Could not connect to the protected route" },
    });
  }
};



module.exports = userController;
