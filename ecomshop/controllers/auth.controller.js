//functions that handle requests

//function for the signup page get request
function getSignup(req, res) {
  res.render("customer/auth/signup");
}

//function for signup post request
function signup(req, res) {}

//function for the loginpage get request
function getLogin(req, res) {
  res.render("customer/auth/login");
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
};
