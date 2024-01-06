//functions that handle requests

const User = require("../models/user.model");
const authUtil = require("../util/authentication");
const validation = require("../util/validation");
const sessionFlash = require("../util/session-flash");

//function for the signup page get request
function getSignup(req, res) {
  //repopulate the session
  let sessionData = sessionFlash.getSessionData(req);

  //when user hasn't tried signing up yet
  if (!sessionData) {
    sessionData = {
      email: "",
      password: "",
      confirmEmail: "",
      fullname: "",
      street: "",
      postal: "",
      city: "",
    };
  }
  res.render("customer/auth/signup", { inputData: sessionData });
}

//function for signup post request
async function signup(req, res, next) {
  //entered data
  const enteredData = {
    email: req.body.email,
    confirmEmail: req.body["confirm-email"],
    password: req.body.password,
    fullname: req.body.fullname,
    street: req.body.street,
    postal: req.body.postal,
    city: req.body.city,
  };

  //validating user input
  if (
    !validation.userDetailsAreValid(
      req.body.email,
      req.body.password,
      req.body.fullname,
      req.body.street,
      req.body.postal,
      req.body.city
    ) ||
    !validation.emailIsConfirmed(req.body.email, req.body["confirm-email"])
  ) {
    //saving session data
    sessionFlash.flashDataToSession(
      req,
      {
        errormessage: "Please fill in all the fields with correct data",
        ...enteredData,
      },
      function () {
        res.redirect("/signup");
      }
    );

    return;
  }

  //extracting and storing user data
  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city
  );

  //handling error using try and catch
  try {
    // checking existing users
    const existsAlready = await user.existsAlready();

    if (existsAlready) {
      //saving session data
      sessionFlash.flashDataToSession(
        req,
        {
          errormessage: "User already exists",
          ...enteredData,
        },
        function () {
          res.redirect("/signup");
        }
      );

      return;
    }

    await user.signup();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/login");
}

//function for the loginpage get request
function getLogin(req, res) {
  //repopulate the session
  let sessionData = sessionFlash.getSessionData(req);

  //when user hasn't tried loging in yet
  if (!sessionData) {
    sessionData = {
      email: "",
      password: "",
    };
  }
  res.render("customer/auth/login", { inputData: sessionData });
}

//function for login POST request
async function login(req, res, next) {
  //get user login credetials
  const user = new User(req.body.email, req.body.password);

  //checking existing users
  let existingUser;
  try {
    existingUser = await user.getUserWithSameEmail();
  } catch (error) {
    next(error);
    return;
  }

  //session error message
  const sessionErrorMessage = {
    errormessage: "Invalid email or password",
    email: user.email,
    password: user.password,
  };

  //checking if user does not exist
  if (!existingUser) {
    sessionFlash.flashDataToSession(req, sessionErrorMessage, function () {
      res.redirect("/login");
    });

    return;
  }

  //checking if user entered the correct password
  const passwordIsCorrect = await user.hasMatchingPassword(
    existingUser.password
  );

  if (!passwordIsCorrect) {
    sessionFlash.flashDataToSession(req, sessionErrorMessage, function () {
      res.redirect("/login");
    });

    return;
  }

  //log the user in
  authUtil.createUserSession(req, existingUser, function () {
    res.redirect("/");
  });
}

function logout(req, res) {
  authUtil.destroyUserAuthSession(req);
  res.redirect("/login");
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
  login: login,
  logout: logout,
};
