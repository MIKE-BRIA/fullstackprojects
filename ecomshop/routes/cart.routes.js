//import express for use in routers
const express = require("express");

//requiring authcontrollers
const cartController = require("../controllers/cart.controller");

const router = express.Router();

router.post("/items", cartController.addCartItem);

module.exports = router;
