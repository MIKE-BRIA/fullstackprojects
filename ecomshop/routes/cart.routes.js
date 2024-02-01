//import express for use in routers
const express = require("express");

//requiring authcontrollers
const cartController = require("../controllers/cart.controller");

const router = express.Router();

router.get("/", cartController.getCart);

router.patch("/items", cartController.updateCartItem);

router.post("/items", cartController.addCartItem);

module.exports = router;
