const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//load user profile
const User = require("../../models/User");
const Account = require("../../models/Account");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const accounts = await Account.findOne({ user: req.user.id }).populate(
        "user"
      );
      if (!accounts) {
        return res.status(404).json("there is no accounts for this user");
      }
      res.json(accounts);
    } catch (err) {
      console.error(err.message);
    }
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const newAccount = new Account({
        title: req.body.title,
        category: req.body.category,
        quantity: req.body.quantity,
        type: req.body.type,
        user: req.user.id,
      });

      const createAccount = await newAccount.save();
      res.json(createAccount);
    } catch (err) {
      console.error(err.message);
    }
  }
);

module.exports = router;
