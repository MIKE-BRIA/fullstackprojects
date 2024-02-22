//*get signup page
function getSignupPage(req, res) {
  res.render("signup");
}

//*get login page
function getLoginPage(req, res) {
  res.render("login");
}

//*get admin page
function getAdminPage(req, res) {
  res.render("admin");
}

//*get home page
function getHomePage(req, res) {
  res.render("welcome");
}

module.exports = {
  getSignupPage: getSignupPage,
  getLoginPage: getLoginPage,
  getAdminPage: getAdminPage,
  getHomePage: getHomePage,
};
