//Data about the todo
const mongodb = require("mongodb");
const db = require("../data/database");

class Todo {
  constructor(text, id) {
    this.text = text;
    this.id = id;
  }

  //getting todos
  static async getAllTodos() {
    const todoDocuments = await db.getDb().collection("todos").find().toArray();

    return todoDocuments.map((todoDocument) => {
      return new Todo(todoDocument.text, todoDocument._id);
    });
  }

  //saving the Todos to the database
  save() {
    if (this.id) {
      //saving an already existing Todo that is upating it
      const todoId = new mongodb.ObjectId(this.id);
      return (
        db
          .getDb()
          .collection("todos")
          //update when _id in database is same as todoId
          .updateOne({ _id: todoId }, { $set: { text: this.text } })
      );
    } else {
      //saving a todo for the first time
      return db.getDb().collection("todos").insertOne({ text: this.text });
    }
  }

  //method for deleting todos from the database
  delete() {
    if (!this.id) {
      throw new Error(
        "Niggah you are trying to delete a todo without an id in our database"
      );
    }

    const todoId = new mongodb.ObjectId(this.id);

    return db.getDb().collection("todos").deleteOne({ _id: todoId });
  }
}

module.exports = Todo;
