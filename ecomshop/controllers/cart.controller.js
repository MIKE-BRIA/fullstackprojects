//* all the functions that are dealing with handling the cart items

const Product = require("../models/product.model");

//adding cartitem
async function addCartItem(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.body.productId);
  } catch (e) {
    next(e);
    return;
  }

  const cart = res.locals.cart;
  cart.addItem(product);
  //updating the session with updated cart items
  req.session.cart = cart;

  res.status(201).json({
    message: "Cart added successfully",
    newTotalItems: cart.totalQuantity,
  });
}

module.exports = {
  addCartItem: addCartItem,
};
