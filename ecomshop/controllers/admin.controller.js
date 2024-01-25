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

//admin page showing all the products
async function getProducts(req, res, next) {
  //retrieving all the products
  try {
    const products = await Product.findAll();
    res.render("admin/products/all-products", { products: products });
  } catch (error) {
    next(error);
    return;
  }
}

// admin page showing new products
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

//getting the updated product page
async function getUpateProduct(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);//req.params has been used to get the product through id
    res.render("admin/products/update-product", { product: product });
  } catch (error) {
    next(error);
  }
}

async function updateProduct(req, res, next) {
  const product = new Product({
    ...req.body,
    _id: req.params.id,
  });

  if (req.file) {
    //replave old image with the new one
    product.replaceImage(req.file.filename);
  }

  try {
    await product.save();
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
  getUpateProduct: getUpateProduct,
  updateProduct: updateProduct,
};
