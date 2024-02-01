//import express for use in routers
const express = require("express");
//import products controller
const productsController = require("../controllers/products.controller");

const router = express.Router();

//get route for product
router.get("/products", productsController.getAllProducts);

//get product details route
router.get("/products/:id", productsController.getProductDetails);

module.exports = router;
