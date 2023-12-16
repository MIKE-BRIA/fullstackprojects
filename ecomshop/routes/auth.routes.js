//import express for use in routers
const express = require("express");

//requiring authcontrollers
const authController = require("../controllers/auth.controller");

const router = express.Router();

//route for signup page
router.get("/signup", authController.getSignup);

//route for login page
router.get("/login", authController.getLogin);

module.exports = router;
