const session = require("express-session");
const mongodbStore = require("connect-mongodb-session");

//*config session store
function sessionStore() {
  const MongoDBStore = mongodbStore(session);

  const store = new MongoDBStore({
    uri: "mongodb://127.0.0.1:27017",
    databaseName: "blogging",
    collection: "usersessions",
  });

  return store;
}

//*session configuration
function sessionConfig() {
  return {
    secret: "hardpasswords",
    resave: false,
    saveUninitialized: false,
    store: sessionStore(),
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production", // true in production
      sameSite: "strict",
    },
  };
}

module.exports = sessionConfig;
