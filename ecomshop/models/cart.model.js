//* All data about the cart

class cart {
  constructor(items = [], totalQuantity = 0, totalPrice = 0) {
    this.items = items;
    this.totalQuantity = totalQuantity;
    this.totalPrice = totalPrice;
  }

  //adding items to the cart
  addItem(product) {
    //cartitmes
    const cartItem = {
      product: product,
      quantity: 1,
      totalPrice: product.price,
    };

    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item.product.id === product.id) {
        cartItem.quantity = cartItem.quantity + 1;
        //upading the total price
        cartItem.totalPrice = cartItem.totalPrice + product.price;
        this.items[i] = cartItem; //replacing the items with the upated cart item

        this.totalQuantity++;
        this.totalPrice += product.price;
        return;
      }
    }

    this.items.push(cartItem);
    this.totalQuantity++;
    this.totalPrice += product.price;
  }
}

module.exports = cart;
