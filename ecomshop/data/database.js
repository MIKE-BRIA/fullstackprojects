const mongodb = require("mongodb");

//create a mongodb client
const MongoClient = mongodb.MongoClient;

//connection to the database
let database;

async function connectToDatabase() {
  const client = await MongoClient.connect("mongodb://127.0.0.1:27017");
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
