const express = require("express");
const pool = require("../database");
const app = express.Router();

app.get("/expenses", async (req, res) => {
  try {
    const { id } = req.params;
    const allExpenses = await pool.query(
      "SELECT * FROM expenses WHERE id =$1",
      [id]
    );
    console.log(allAccounts.rows[0]);
    res.json(allExpenses.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/expenses/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const expenses = await pool.query(
      "SELECT * FROM expenses WHERE user_id = $1",
      [user_id]
    );
    console.log("expenses:");
    res.json(expenses.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/expenses", async (req, res) => {
  try {
    const {
      title,
      category,
      quantity,
      type,
      date,
      user_id,
      groupcategory,
      idaccount,
    } = req.body;
    const newExpense = await pool.query(
      "INSERT INTO expenses (title, category, quantity, type, date, user_id, groupcategory, idaccount) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [title, category, quantity, type, date, user_id, groupcategory, idaccount]
    );
    console.log(newExpense.rows[0]);
    res.json(newExpense.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = app;
