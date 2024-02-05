//import express for use in routers
const express = require("express");

//requiring authcontrollers
const ordersController = require("../controllers/orders.controller");

const router = express.Router();

router.post("/", ordersController.addOrder); //get orders

router.get("/", ordersController.getOrders); //get orders page

router.get("/success", ordersController.getSuccess); //get success page

router.get("/failure", ordersController.getFailure); //get failure page

module.exports = router;
