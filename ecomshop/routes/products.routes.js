//import express for use in routers
const express = require("express");

const router = express.Router();

//get route for product
router.get("/products", function (req, res) {
  res.render("customer/products/all-products");
});

module.exports = router;
