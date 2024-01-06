//import express for use in routers
const express = require("express");

//requiring authcontrollers
const authController = require("../controllers/auth.controller");

const router = express.Router();

//route for signup page
router.get("/signup", authController.getSignup);

//post route for signup page
router.post("/signup", authController.signup);

//route for login page
router.get("/login", authController.getLogin);

//post route for login page
router.post("/login", authController.login);

//post route for logout page
router.post("/logout", authController.logout);

module.exports = router;
