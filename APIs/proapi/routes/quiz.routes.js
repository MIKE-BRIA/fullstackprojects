const express = require("express");
const quizcontroller = require("../controller/quiz.controller");
const router = express.Router();

router.get("/", quizcontroller.getAllQuiz);

router.post("/", quizcontroller.addQuiz);

router.patch("/:id", quizcontroller.updateQuiz);

router.delete("/:id", quizcontroller.deleteQuiz);

module.exports = router;
