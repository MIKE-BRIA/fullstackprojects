//functions that handle requests

const User = require("../models/user.model");

//function for the signup page get request
function getSignup(req, res) {
  res.render("customer/auth/signup");
}

//function for signup post request
async function signup(req, res) {
  //extracting and storing user data
  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city
  );

  await user.signup();

  res.redirect("/login");
}

//function for the loginpage get request
function getLogin(req, res) {
  res.render("customer/auth/login");
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
};
