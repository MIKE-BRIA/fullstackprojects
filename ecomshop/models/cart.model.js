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
        cartItem.quantity = +item.quantity + 1;
        //upading the total price
        cartItem.totalPrice = item.totalPrice + product.price;
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

  //updating items using the update button in cart
  updateItem(productId, newQuantity) {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item.product.id === productId && newQuantity > 0) {
        const cartItem = { ...item };
        const quantityChange = newQuantity - item.quantity;
        cartItem.quantity = newQuantity;
        //upading the total price
        cartItem.totalPrice = newQuantity * item.product.price;
        this.items[i] = cartItem; //replacing the items with the upated cart item

        this.totalQuantity = this.totalQuantity + quantityChange;
        this.totalPrice += quantityChange * item.product.price;
        return { updatedItemPrice: cartItem.totalPrice };
      } else if (item.product.id === productId && newQuantity <= 0) {
        //remove the item from the cart
        this.items.splice(i, 1);
        //update the quantity and price
        this.totalQuantity = this.totalQuantity - item.quantity;
        this.totalPrice -= item.totalPrice;
        return { updatedItemPrice: 0 };
      }
    }
  }
}

module.exports = cart;
