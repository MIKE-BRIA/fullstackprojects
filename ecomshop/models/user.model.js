//importing bcrpt for hashing password
const bcrypt = require("bcryptjs");

const db = require("../data/database");

//this helps us collect user data
class User {
  constructor(email, password, fullname, street, postal, city) {
    this.email = email;
    this.password = password;
    this.name = fullname;
    this.address = {
      street: street,
      postalCode: postal,
      city: city,
    };
  }

  //getting already registered email
  getUserWithSameEmail() {
    return db.getDb().collection("users").findOne({ email: this.email });
  }

  // checking if user is already registered
  async existsAlready() {
    const existingUser = await this.getUserWithSameEmail();
    if (existingUser) {
      return true;
    }
    return false;
  }

  //store signup user data to the database
  async signup() {
    //hashing the password
    const hashedPassword = await bcrypt.hash(this.password, 12);

    await db.getDb().collection("users").insertOne({
      email: this.email,
      password: hashedPassword,
      name: this.name,
      address: this.address,
    });
  }

  //checking entered password
  hasMatchingPassword(hashedPassword) {
    return bcrypt.compare(this.password, hashedPassword);
  }
}

module.exports = User;
