const db = require("../databaseModels/sqlModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const generator = require('generate-password');
const nodemailer = require("nodemailer");
const saltRounds = 10;


const userController = {};

  //creates a user in the database
userController.createUser = async ( req, res, next) => {
  let {email, password } = res.locals.myData

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
    res.locals.userCreated = { authenticated: true };
    return next();

  } catch (err) {
    return next({
      log: "Express Error handler caught in createUser err",
      status: 500,
      message: { err: "user already exists" },
    });
  }
}

  //creates a user in the database
userController.deleteUser = async (req, res, next) => {
  const { userId } = res.locals.myData;

  try {
    await db.query('BEGIN'); // Begin transaction
      //delete templates of user
    const deleteTemplatesQuery = 'DELETE FROM public.templates WHERE creator = $1';
    await db.query(deleteTemplatesQuery, [userId]);
      //delete user from database
    const deleteUserQuery = 'DELETE FROM public.users WHERE _id = $1';
    await db.query(deleteUserQuery, [userId]);
    await db.query('COMMIT'); // Commit the transaction
    res.locals.userDeleted = {userDeleted : true};
    return next();

  } catch (err) {
    await db.query('ROLLBACK'); // Rollback the transaction in case of an error
    return next({
      log: 'Express Error handler caught in deleteUser err',
      status: 500,
      message: { err: 'unable to delete user' },
    });
  }
};

userController.checkUserExistence = async (req, res, next) => {
  const { email } = res.locals.myData;

  const checkEmailQuery = 'SELECT * FROM users WHERE user_email = $1';
  const result = await db.query(checkEmailQuery, [email]);

  if (result.rows.length === 0) {
    return next({
      log: "Express error handler caught in validateEmailAndPassword",
      status: 400,
      message: { err: "user not in system" },
    });
  }

  return next();
}

  //resets a users password
userController.resetUserPassword = async ( req, res, next) => {
  let {newPassword, email } = res.locals.myData;
  try {
     //hash password
     const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    //signup user
    const changePasswordQuery = 'UPDATE users SET user_password = $1 WHERE user_email = $2';
    await db.query(changePasswordQuery, [hashedPassword, email]);
    res.locals.resetPassword = {isPasswordReset : true};
    return next();

  } catch (err) {
    return next({
      log: "Express Error handler caught in resetUserPass err",
      status: 500,
      message: { err: "unable to change password" },
    });
  }
}

  //emails newPassword to user
userController.emailPassword = async (req, res, next) => {  
  const {newPassword, email} = res.locals.myData;

  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, 
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    },
  });

  try {
    let info = await transporter.sendMail({
      from: '"Ceremony Builder" <ceremonyBuilder@jacobmarries.com>',
      to: email,
      subject: "Ceremony Builder (new password)",
      text: `Here is the password reset that you have requested: ${newPassword}`,
      html: `<p><b>Hello,</b></p><p>Here is the new passward that you reqeusted</p><p>${newPassword}</p>`,
    });
    next();
  } catch (err) {
    console.error('Failed to send email', err);
    next(err);
  }
}

//Confirms that user and password are correct
userController.authenticateUser = async (req, res, next) => {
  const {email, password} = res.locals.myData

  //both values must not truthy
  if(!email || !password){
    return next({
      log: "Express Error handler caught in createUser err",
      status: 500,
      message: { err: "field is empty" },
    });
  }

  try{
    //grab stored password
    const sql_verifyUser = "SELECT user_password, _id FROM users where user_email = ($1)";
    const storedPasswordResult = await db.query(sql_verifyUser, [email]);
    const storedPassword = storedPasswordResult.rows[0].user_password;
    const userId = storedPasswordResult.rows[0]._id;

    //check if passwords match
    const passwordsMatch = await bcrypt.compare(password, storedPassword);

    //password
    if(passwordsMatch){
      res.locals.userAuthenticated = { authenticated: true, userId };;
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

//creates a token and places in cookie
userController.createToken = async (req, res, next) => {
  const { email } = res.locals.myData
  try {
    const token = await new Promise((resolve, reject) => {
      jwt.sign(
        { email, userId : res.locals.userAuthenticated.userId },
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
      message: { err: `An error occurred while creating a token: ${err}` },
    });
  }
};

//confirms that user has a token.
userController.checkForToken = (req, res, next) => {
  const token = req.cookies.authorization;

  if (typeof token !== "undefined") {
    req.token = token;
    // res.locals.foundtoken = {email: email, authorized: false}
    return next();
  } else {
    return next({
      log: "Express error handler caught in checkForToken error",
      status: 401,
      message: { err: "user is not authorized" },
    });
  }
};

//verifies current user matches token user.
userController.verifyToken = async (req, res, next) => {

  try {
    const decoded = await jwt.verify(req.token, process.env.JWT_SECRET)
    if(decoded){
      res.locals.foundtoken = {authorized: true, email: decoded.email, userId: decoded.userId}
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

userController.compareTokenAndUser = (req, res, next) => {
  const token_userId = res.locals.foundtoken.userId;
  const currUser_userId = res.locals.myData.userId;
  if(token_userId == currUser_userId) return next();
  else{
    return next(err);
  }
}

  //removes token and cookie
userController.removeToken = (req, res, next) => {
  try {
    // Clear the 'authorization' cookie
    res.clearCookie("authorization");
    next();
  } catch (err) {
    next({
      log: "Express error handler caught in removeToken middleware error",
      status: 500,
      message: { err: "An error occurred while removing the token" },
    });
  }
};

  //generates a new random password
userController.generatePassword = async (req, res, next) => {
  const newPassword = generator.generate({
    length: 10,
    numbers: true,
  });
  res.locals.myData.newPassword = newPassword.slice(1,-1);
  next();
}



module.exports = userController;
