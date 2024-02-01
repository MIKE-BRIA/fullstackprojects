//* all the functions that are dealing with handling the cart items

const Product = require("../models/product.model");

//get cart
function getCart(req, res) {
  res.render("customer/cart/cart");
}

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

//updating the cart items
function updateCartItem(req, res, next) {
  const cart = res.locals.cart;

  const updatedItemData = cart.updateCartItem(
    req.body.productId,
    req.body.quantity
  );

  req.session.cart = cart;

  res.json({
    message: "Cart updated successfully updated successfully",
    updatedCartData: {
      newTotalQuantity: cart.totalQuantity,
      newTotalPrice: cart.totalPrice,
      updatedItemPrice: updatedItemData.updatedItemPrice,
    },
  });
}

module.exports = {
  addCartItem: addCartItem,
  getCart: getCart,
  updateCartItem: updateCartItem,
};
