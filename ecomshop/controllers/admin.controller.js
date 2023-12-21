// * handling post and get request for the admin page

//importing product model
const Product = require("../models/product.model");

// products page
function getProducts(req, res) {
  res.render("admin/products/all-products");
}

// new product page
function getNewProduct(req, res) {
  res.render("admin/products/new-product");
}

// create new product page
async function createNewProduct(req, res, next) {
  const newProduct = new Product({
    ...req.body,
    image: req.file.filename,
  });

  //handling error incase on ocurrs during saving to database
  try {
    await newProduct.save();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/admin/products");
}

module.exports = {
  getProducts: getProducts,
  getNewProduct: getNewProduct,
  createNewProduct: createNewProduct,
};
