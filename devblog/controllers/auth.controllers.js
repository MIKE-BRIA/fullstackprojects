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

  if (email !== confirmemail || password.length < 6 || !email.includes("@")) {
    return res.render("/signup");
  }

  //*user exists
  const existingUser = await db
    .getDb()
    .collection("user")
    .findOne({ email: email });

  if (existingUser) {
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
    console.log("User not found");
    return res.redirect("/login");
  }

  //*compare entered password
  const comparePassword = await bcrypt.compare(password, existingUser.password);

  if (!comparePassword) {
    console.log("You enterd wrong password");
    return res.redirect("/login");
  }

  req.session.user = {
    id: existingUser._id,
    email: existingUser.email,
  };
  req.session.isAuthenticated = true;

  console.log(req.session);

  //writing the session to the database
  req.session.save(() => {
    res.redirect("/"); //save the session then redirect user to admin page
  });
}

// console.log("User is authenticated");

module.exports = {
  signup: signup,
  login: login,
};
