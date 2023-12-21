// * Storing the product information and extracting it to the database
const db = require("../data/database");

class Product {
  //this is all the product data that will be stored
  constructor(productData) {
    this.title = productData.title;
    this.description = productData.description;
    this.price = +productData.price;
    this.image = productData.image; // the name of the image file
    this.summary = productData.summary;
    this.imagePath = `product-data/images/${productData.image}`;
    this.imageUrl = `/products/assets/images/${productData.image}`;
  }

  //store product data to the database
  async save() {
    const productData = {
      title: this.title,
      description: this.description,
      price: this.price,
      image: this.image,
      summary: this.summary,
    };
    await db.getDb().collection("products").insertOne(productData);
  }
}

module.exports = Product;
