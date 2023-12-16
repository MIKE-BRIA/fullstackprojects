//require path package for giving path to viewe folder
const path = require("path");

const express = require("express");

//importing auth.routes
const authRoutes = require("./routes/auth.routes");

const app = express();

//setting up ejs
app.set("view engine", "ejs");
//views path
app.set("views", path.join(__dirname, "views"));

//for css and styling
app.use(express.static("public"));

app.use(authRoutes);

app.listen(3000);
