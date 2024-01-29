// a cart middleware that looks at users who either have or don't have a cart

const Cart = require("../models/cart.model");

function initializeCart(req, res, next) {
  let cart;

  if (!req.session.cart) {
    cart = new Cart();
  } else {
    const sessionCart = req.session.cart;
    cart = new Cart(
      sessionCart.items,
      sessionCart.totalQuantity,
      sessionCart.totalPrice
    );
  }

  //making the cart available using locals

  res.locals.cart = cart;

  next();
}

module.exports = initializeCart;
