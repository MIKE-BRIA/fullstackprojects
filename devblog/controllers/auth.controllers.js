const db = require("../data/database");
const bcrypt = require("bcryptjs");

//!signup post function
async function signup(req, res, next) {
  //*get user information

  const userData = req.body;
  const fullname = userData.fullname;
  const email = userData.email;
  const confirmemail = userData.confirmemail;
  const password = userData.password;

  const trimpassword = password.trim();

  if (
    email !== confirmemail ||
    trimpassword.length < 6 ||
    !email.includes("@")
  ) {
    //*having a session data store
    req.session.inputData = {
      hasError: true,
      message: "Invalid input - check input",
      fullname: fullname,
      email: email,
      confirmemail: confirmemail,
      password: trimpassword,
    };

    req.session.save(() => {
      res.redirect("/signup");
    });
    return;
  }

  //*user exists
  const existingUser = await db
    .getDb()
    .collection("user")
    .findOne({ email: email });

  if (existingUser) {
    req.session.inputData = {
      hasError: true,
      message: "User already exists - please login",
      fullname: fullname,
      email: email,
      confirmemail: confirmemail,
      password: trimpassword,
    };

    console.log("user already exists");

    return res.redirect("/signup");
  }

  //*hass password
  const hashpassword = await bcrypt.hash(trimpassword, 12);

  //*new user
  const user = {
    fullname: fullname,
    email: email,
    password: hashpassword,
  };

  //*store user data

  await db.getDb().collection("user").insertOne(user);

  res.redirect("/login");
}

//!login post function
async function login(req, res) {
  //*user input
  const userData = req.body;
  const email = userData.email;
  const password = userData.password;

  //*user with entered email
  const existingUser = await db
    .getDb()
    .collection("user")
    .findOne({ email: email });

  if (!existingUser) {
    req.session.inputData = {
      hasError: true,
      message: "User not found - please signup",
      email: email,
      password: password,
    };

    req.session.save(() => {});

    res.redirect("/login");
    return;
  }

  //*compare entered password
  const comparePassword = await bcrypt.compare(password, existingUser.password);

  if (!comparePassword) {
    req.session.inputData = {
      hasError: true,
      message: "You entered wrong password",
      email: email,
      password: password,
    };
    console.log("You entered wrong password");

    req.session.save(() => {
      res.redirect("/login");
    });

    return;
  }

  req.session.user = {
    id: existingUser._id,
    email: existingUser.email,
  };

  req.session.isAuth = true;

  console.log(req.session);

  //writing the session to the database
  req.session.save(() => {
    res.redirect("/admin");
  });
}

//!logout post function
function logout(req, res) {
  req.session.user = null;
  req.session.isAuth = false;

  req.session.save(() => {
    res.redirect("/");
  });
}

// console.log("User is authenticated");

module.exports = {
  signup: signup,
  login: login,
  logout: logout,
};
