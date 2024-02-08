const express = require("express");

const app = express();
const db = require("./data/database");
//import the routes used
const quoteRoutes = require("./routes/quotes.routes");

app.use("/quotes", quoteRoutes);

//error handling
app.use(function (error, req, res, next) {
  res.status(500).json({
    message: "something went wrong",
  });
});

db.initDb()
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log("connecting to the database failed");
  });
