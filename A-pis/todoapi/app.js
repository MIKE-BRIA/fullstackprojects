const express = require("express");

const db = require("./data/database");
const todosroutes = require("./routes/todos.routes");

const app = express();

app.use(express.json());

app.use("/todos", todosroutes);

//handling errors
app.use(function (error, req, res, next) {
  res.status(500).json({
    message: "Something is not right my guy",
  });
});

db.initDb()
  .then(() => {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("connecting to the database failed");
  });
