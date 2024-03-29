const mongodb = require("mongodb");

//create a mongodb client
const MongoClient = mongodb.MongoClient;

let mongodbUrl = "mongodb://127.0.0.1:27017";

if (process.env.MONGODB_URL) {
  mongodbUrl = process.env.MONGODB_URL;
}

//initialising the database
let database;

async function initDb() {
  const client = await MongoClient.connect(mongodbUrl);
  database = client.db("Quotes-api");
}

function getDb() {
  if (!database) {
    throw new Error("Database not initialized");
  }

  return database;
}

module.exports = {
  initDb: initDb,
  getDb: getDb,
};
