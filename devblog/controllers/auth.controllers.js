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
    return res.status(403).render("signup");
  }

  //*user exists
  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: email });

  if (existingUser) {
    console.log("user already exists");
    return res.status(403).redirect("signup");
  }

  //*hass password
  const hasspassword = await bcrypt.hash(trimpassword, 12);

  //*new user
  const user = {
    fullname: fullname,
    email: email,
    password: hasspassword,
  };

  //*store user data

  await db.getDb().collection("user").insertOne(user);

  res.redirect("login");
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
    return res.status(403).redirect("login");
  }

  //*compare entered password
  const comparePassword = await bcrypt.compare(password, existingUser.password);

  if (!comparePassword) {
    console.log("You enterd wrong password");
    return res.redirect("login");
  }

  //*storing userdata in a session
  req.session.user = { id: existingUser._id, email: existingUser.email };
  req.session.isAuth = true;
  req.session.save(() => {
    res.redirect("/");
  });
}

module.exports = {
  signup: signup,
  login: login,
};
