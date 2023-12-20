//require path package for giving path to viewe folder
const path = require("path");

const express = require("express");
const csrf = require("csurf"); //dealing with csrf attack
const expressSession = require("express-session"); //foe sessions

const createsessionConfig = require("./config/session");

//importing database
const db = require("./data/database");

//cutom made csrftoken middleware
const addCsrfTokenMiddleware = require("./middlewares/csrf-tokens");
//errorhandler middleware
const errorHandlerMiddleware = require("./middlewares/error-handler");
//authentication middlieware
const checkAuthStatusMiddleware = require("./middlewares/check-auth");

//importing routes
const authRoutes = require("./routes/auth.routes");
const productsRoutes = require("./routes/products.routes");
const baseRoutes = require("./routes/base.routes");

const app = express();

//setting up ejs
app.set("view engine", "ejs");
//views path
app.set("views", path.join(__dirname, "views"));

//for css and styling
app.use(express.static("public"));
//for extracting data from request
app.use(express.urlencoded({ extended: false }));

const sessionconfig = createsessionConfig();

app.use(expressSession(sessionconfig));
app.use(csrf());

app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);

app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);

app.use(errorHandlerMiddleware);

//checks if we connected to the database
db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Failed to connect to the database");
    console.log(error);
  });
