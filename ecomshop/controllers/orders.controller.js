const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");
const Order = require("../models/order.model");
const User = require("../models/user.model");

async function getOrders(req, res, next) {
  try {
    const orders = await Order.findAllForUser(res.locals.uid);
    res.render("customer/orders/all-orders", {
      orders: orders,
    });
  } catch (error) {
    next(error);
  }
}

//this is where the customer buys the order
async function addOrder(req, res, next) {
  let userDocument;
  try {
    userDocument = await User.findById(res.locals.uid);
  } catch (error) {
    return next(error);
  }

  const cart = req.session.cart;

  if (!cart) {
    return res.status(400).send("Cart is empty");
  }

  const order = new Order(cart, userDocument);

  try {
    await order.save();
  } catch (error) {
    next(error);
    return;
  }

  req.session.cart = null;

  //payment session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: cart.items.map(function (item) {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.product.title,
          },
          unit_amount: +item.product.price.toFixed(2) * 100,
        },
        quantity: item.quantity,
      };
    }),
    mode: "payment",
    success_url: "http://localhost:3000/orders/success",
    cancel_url: "http://localhost:3000/orders/failure",
  });

  res.redirect(303, session.url);
}

function getSuccess(req, res) {
  res.render("customer/orders/success");
}

function getFailure(req, res) {
  res.render("customer/orders/failure");
}

module.exports = {
  addOrder: addOrder,
  getOrders: getOrders,
  getSuccess: getSuccess,
  getFailure: getFailure,
};
