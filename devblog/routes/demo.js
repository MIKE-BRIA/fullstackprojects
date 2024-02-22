const express = require("express");
const authcontrollers = require("../controllers/getauth.contollers");
const postcontrol = require("../controllers/auth.controllers");

const db = require("../data/database");

const router = express.Router();

router.get("/", authcontrollers.getHomePage);

router.get("/signup", authcontrollers.getSignupPage);

router.get("/login", authcontrollers.getLoginPage);

router.get("/admin", authcontrollers.getAdminPage);

router.post("/signup", postcontrol.signup);

router.post("/login", postcontrol.login);

module.exports = router;
