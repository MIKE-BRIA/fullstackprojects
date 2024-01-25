// * routes for all admin routes

//import express for use in routers
const express = require("express");

const adminController = require("../controllers/admin.controller");
const imageUploadMiddleware = require("../middlewares/image-upload");

const router = express.Router();

//get route for product
router.get("/products", adminController.getProducts); // ? /admin/products

router.get("/products/new", adminController.getNewProduct); // ? /admin/products/new

router.post(
  "/products",
  imageUploadMiddleware,
  adminController.createNewProduct
); //? extraction of uploaded image

router.get("/products/:id", adminController.getUpateProduct);

router.post("products/:id",imageUploadMiddleware, adminController.updateProduct);

module.exports = router;
