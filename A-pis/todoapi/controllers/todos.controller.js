//all functions
const Todo = require("../model/todo.model");

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

function updateTodo(req, res, next) {}

function deleteTodo(req, res, next) {}

module.exports = {
  getAllTodos: getAllTodos,
  addTodo: addTodo,
  updateTodo: updateTodo,
  deleteTodo: deleteTodo,
};
