const path = require("path");

const session = require("express-session");
const express = require("express");

const db = require("./data/database");
const demoRoutes = require("./routes/demo");
const SessionConf = require("./config/session");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

const sessionconf = SessionConf();
app.use(session(sessionconf));

app.use(demoRoutes);

app.use(function (error, req, res, next) {
  res.render("500");
});

db.connectToDatabase().then(function () {
  app.listen(3000);
});
