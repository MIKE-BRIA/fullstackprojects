//import express for use in routers
const express = require("express");

const router = express.Router();

//get route for product
router.get("/", function (req, res) {
  res.redirect("/products");
});

module.exports = router;
