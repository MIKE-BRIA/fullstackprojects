//* handling products and product pages

const Product = require("../models/product.model");

//function to get all the products and display them
async function getAllProducts(req, res, next) {
  let products;
  try {
    products = await Product.findAll();
    res.render("customer/products/all-products", { products: products });
  } catch (e) {
    next(e);
  }
}

async function getProductDetails(req, res, next) {
  try {
    //removing trailing spaces from product id
    const productId = req.params.id.trim();
    const product = await Product.findById(productId);
    //render product details
    res.render("customer/products/product-details", { product: product });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = {
  getAllProducts: getAllProducts,
  getProductDetails: getProductDetails,
};
