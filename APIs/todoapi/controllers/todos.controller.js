//all functions
const Todo = require("../model/todo.model");

//!getting the todos
async function getAllTodos(req, res, next) {
  let todos;

  try {
    todos = await Todo.getAllTodos();
  } catch (err) {
    return next(err);
  }

  res.json({
    todos: todos,
  });
}

//!adding todo
async function addTodo(req, res, next) {
  const todoText = req.body.text;

  const todo = new Todo(todoText);

  let insertedId;
  try {
    const results = await todo.save();
    insertedId = results.insertedId;
  } catch (e) {
    return next(e);
  }

  todo.id = insertedId.toString();

  res.json({
    message: "The todo has been added successfully",
    createdTodo: todo,
  });
}

//!updating todo
async function updateTodo(req, res, next) {
  const todoId = req.params.id;
  const newTodoText = req.body.text;

  const todo = new Todo(newTodoText, todoId);

  try {
    await todo.save();
  } catch (e) {
    return next(e);
  }

  res.json({
    message: "The todo has been updated successfully",
    UpdatedTodo: todo,
  });
}

//!deleting todo
async function deleteTodo(req, res, next) {
  const todoId = req.params.id;

  const todo = new Todo(null, todoId);

  try {
    await todo.delete();
  } catch (e) {
    return next(e);
  }

  res.json({ message: "The todo has been deleted successfully" });
}

module.exports = {
  getAllTodos: getAllTodos,
  addTodo: addTodo,
  updateTodo: updateTodo,
  deleteTodo: deleteTodo,
};
