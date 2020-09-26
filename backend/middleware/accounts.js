const express = require("express");
const pool = require("../database");
const app = express.Router();

app.post("/accounts", async (req, res) => {
  try {
    const { title, category, quantity, type, date, user_id } = req.body;
    const newAccount = await pool.query(
      "INSERT INTO accounts (title, category, quantity, type, date, user_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
      [title, category, quantity, type, date, user_id]
    );
    console.log(newAccount.rows[0]);
    res.json(newAccount.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/accounts", async (req, res) => {
  try {
    const { id } = req.params;
    const allAccounts = await pool.query(
      "SELECT * FROM accounts WHERE id =$1",
      [id]
    );
    console.log(allAccounts.rows[0]);
    res.json(allAccounts.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/accounts/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const accounts = await pool.query(
      "SELECT * FROM accounts WHERE user_id = $1",
      [user_id]
    );
    console.log("hiho:");
    res.json(accounts.rows);
  } catch (err) {
    console.error(err.message);
  }
});
app.get("/accounts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const accounts = await pool.query("SELECT * FROM accounts WHERE id = $1", [
      id,
    ]);
    res.json(accounts.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.put("/accounts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, quantity, category, date, type } = req.body;

    const updateAccount = await pool.query(
      "UPDATE accounts SET (title, quantity, category, date, type) = ($1, $2, $3, $4, $5) WHERE id = $6",
      [title, quantity, category, date, type, id]
    );
    res.json("Account was updated");
  } catch (err) {
    console.error(err.message);
  }
});

app.delete("/accounts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteAccount = await pool.query("DELETE FROM accounts WHERE id=$1", [
      id,
    ]);
    res.json("Account was deleted");
  } catch (err) {
    console.error(err.message);
  }
});
module.exports = app;
