const db = require("../data/database");

//*get signup page
function getSignupPage(req, res) {
  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      fullname: "",
      email: "",
      confirmemail: "",
      password: "",
    };
  }

  req.session.inputData = null;

  res.render("signup", { inputData: sessionInputData });
}

//*get login page
function getLoginPage(req, res) {
  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      email: "",
      password: "",
    };
  }

  req.session.inputData = null;

  res.render("login", { inputData: sessionInputData });
}

//*
function getProfilePage(req, res) {
  // if (!req.session.isAuth) {
  //   return res.render("401");
  // }
  res.render("profile");
}

//*get admin page
async function getAdminPage(req, res) {
  // if (!req.session.isAuth) {
  //   return res.render("401");
  // }

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
  getProfilePage: getProfilePage,
};
