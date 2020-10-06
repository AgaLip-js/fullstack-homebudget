const express = require("express");
const pool = require("../database");
const app = express.Router();

app.get("/accounts/sum/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const sum_accounts = await pool.query(
      "SELECT category, type, SUM(quantity) FROM accounts WHERE user_id = $1 GROUP BY category, type",
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
      "SELECT category, type, SUM(quantity) FROM expenses WHERE user_id = $1 GROUP BY category, type",
      [user_id]
    );

    res.json(sum_expenses.rows);
  } catch (err) {
    console.error(err.message);
  }
});
app.get("/expenses/sum-group/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const sum_group = await pool.query(
      "SELECT groupcategory, category, SUM(quantity) FROM expenses WHERE user_id = $1 GROUP BY groupcategory, category",
      [user_id]
    );
    res.json(sum_group.rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = app;
