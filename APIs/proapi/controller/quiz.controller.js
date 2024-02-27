const Quiz = require("../model/quiz.model");

//!geting all quiz
async function getAllQuiz(req, res, next) {
  let quiz;

  try {
    quiz = await Quiz.getAllQuiz();
  } catch (error) {
    return next(error);
  }

  res.json({
    quiz: quiz,
  });
}

//!adding quiz
async function addQuiz(req, res, next) {
  const quizText = req.body.text;
  const answer = req.body.answer;

  const quiz = new Quiz(quizText, answer);

  let insertedId;

  try {
    const result = await quiz.save();
    insertedId = result.insertedId;
  } catch (error) {
    return next(error);
  }

  quiz.id = insertedId.toString();
  res.json({ message: "Added quiz successfully", createdquiz: quiz });
}
//!deleting quiz
async function deleteQuiz(req, res, next) {
  const quizId = req.params.id;

  const quiz = new Quiz(null, null, quizId);

  try {
    await quiz.delte();
  } catch (error) {
    return next(error);
  }

  res.json({
    message: " quiz deleted successfully",
    updatedquiz: quiz,
  });
}

//!updating quiz
async function updateQuiz(req, res, next) {
  const quizId = req.params.id;
  const newquizText = req.body.newtext;
  const newAnswer = req.body.newanswer;

  const quiz = new Quiz(newquizText, newAnswer, quizId);

  try {
    await quiz.save();
  } catch (error) {
    return next(error);
  }

  res.json({
    message: "Updated quiz successfully",
    updatedquiz: quiz,
  });
}

module.exports = {
  getAllQuiz: getAllQuiz,
  addQuiz: addQuiz,
  deleteQuiz: deleteQuiz,
  updateQuiz: updateQuiz,
};
