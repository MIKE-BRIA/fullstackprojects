const db = require("../data/database");
const mongodb = require("mongodb");

//!Quiz class
class Quiz {
  constructor(text, answer, id) {
    this.id = id;
    this.text = text;
    this.answer = answer;
  }

  static async getAllQuiz() {
    const quizDocuments = await db.getDb().collection("quiz").find().toArray();

    return quizDocuments.map((quizDocument) => {
      return new Quiz(quizDocument.text, quizDocument.answer, quizDocument._id);
    });
  }

  delete() {
    if (!this.id) {
      throw new Error("trying to delete a quiz that doesn't exist");
    }
    const quizId = new mongodb.ObjectId(this.id);

    return db.getDb().collection("quiz").deleteOne({ _id: quizId });
  }

  //*saving a new quiz and an existing one
  save() {
    if (this.id) {
      //turning the id into a mongodb object id
      const quizId = new mongodb.ObjectId(this.id);
      return db
        .getDb()
        .collection("quiz")
        .updateOne(
          { _id: quizId },
          { $set: { text: this.text, answer: this.answer } }
        );
    } else {
      return db
        .getDb()
        .collection("quiz")
        .insertOne({ text: this.text, answer: this.answer });
    }
  }
}

module.exports = Quiz;
