const express = require("express");
const db = require("./data/database");
const app = express();
const quizRoutes = require("./routes/quiz.routes");

app.use(express.json());

app.use("/quiz", quizRoutes);

app.use((req, res, error, next) => {
  res.status(500).json({
    message: "Something went wrong",
  });
});

db.initDb()
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log("connection to the databse failed");
  });
