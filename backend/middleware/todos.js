const express = require("express");
const pool = require("../database");
const app = express.Router();

app.post("/todos", async (req, res) => {
  try {
    const { description, user_id} = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description, user_id) VALUES($1, $2) RETURNING *",
      [description , user_id]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/todos", async (req, res) => {
  try {
    const {id} = req.params;
    const allTodos = await pool.query("SELECT * FROM todo WHERE id =$1", [id]);
    console.log(allTodos.rows[0]);
    res.json(allTodos.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/todos/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE user_id = $1", [user_id]);
    console.log("hiho:")
    console.log(todo.rows);
    res.json(todo.rows);
  } catch (err) {
    console.error(err.message);
  }
});
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE id = $1", [id]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    console.log("ID AND DESC")
    console.log(id +","+ description);
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE id = $2",
      [description, id]
    );
    res.json("Todo was updated");
  } catch (err) {
    console.error(err.message);
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE id=$1", [id]);
    res.json("Todo was deleted");
  } catch (err) {
    console.error(err.message);
  }
});
module.exports = app;
