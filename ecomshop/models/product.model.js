// * Storing the product information and extracting it to the database
const db = require("../data/database");
const mongodb = require("mongodb");

class Product {
  //this is all the product data that will be stored
  constructor(productData) {
    this.title = productData.title;
    this.description = productData.description;
    this.price = +productData.price;
    this.image = productData.image; // the name of the image file
    this.summary = productData.summary;
    this.updateImageData();
    if (productData._id) {
      this.id = productData._id.toString();
    }
  }

  //?Finding a product by Id
  //gettting product to display in admin dashboard
  static async findById(productId) {
    let prodId;

    try {
      prodId = new mongodb.ObjectId(productId);
    } catch (error) {
      error.code = 404;
      throw error;
    }

    const product = await db
      .getDb()
      .collection("products")
      .findOne({ _id: prodId });

    if (!product) {
      const error = new Error("product with provided ID does not exist");
      error.code = 404;
      throw error;
    }

    return new Product(product);
  }

  // finding product information from the database and displaying it
  static async findAll() {
    const products = await db.getDb().collection("products").find().toArray();

    return products.map(function (productDocument) {
      return new Product(productDocument);
    });
  }

  //updating imageData
  updateImageData() {
    this.imagePath = `product-data/images/${this.image}`;
    this.imageUrl = `/products/assets/images/${this.image}`;
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

    if (this.id) {
      const productId = new mongodb.ObjectId(this.id);

      //this makes the image not repleced when image is not provided in update
      if (!this.image) {
        delete productData.image;
      }

      await db
        .getDb()
        .collection("products")
        .updateOne({ _id: productId }, { $set: productData });
    } else {
      await db.getDb().collection("products").insertOne(productData);
    }
  }

  //Replacing image
  async replaceImage(newImage) {
    this.image = newImage;
    this.updateImageData();
  }

  //Deleting products from the database
  remove() {
    //get product id
    const productId = new mongodb.ObjectId(this.id);
    return db.getDb().collection("products").deleteOne({ _id: productId });
  }
}

module.exports = Product;
