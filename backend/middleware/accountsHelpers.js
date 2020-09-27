const express = require("express");
const pool = require("../database");
const app = express.Router();

app.get("/accounts/sum/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const sum_accounts = await pool.query(
      "SELECT category, SUM(quantity) FROM accounts WHERE user_id = $1 GROUP BY category",
      [user_id]
    );

    res.json(sum_accounts.rows);
  } catch (err) {
    console.error(err.message);
  }
});
app.get("/expenses/sum/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const sum_expenses = await pool.query(
      "SELECT category, SUM(quantity) FROM expenses WHERE user_id = $1 GROUP BY category",
      [user_id]
    );

    res.json(sum_expenses.rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = app;
