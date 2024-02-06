const mongodb = require("mongodb");

//create a mongodb client
const MongoClient = mongodb.MongoClient;

let mongodbUrl = "mongodb://127.0.0.1:27017";

if (process.env.MONGODB_URL) {
  mongodbUrl = process.env.MONGODB_URL;
}

//connection to the database
let database;

async function connectToDatabase() {
  const client = await MongoClient.connect(mongodbUrl);
  database = client.db("online-shop");
}

//checking if we have the database
function getDb() {
  if (!database) {
    throw new Error("You must connect first!!");
  }

  return database;
}

module.exports = {
  connectToDatabase: connectToDatabase,
  getDb: getDb,
};
