const path = require("path");
const pool = require("./database");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const jwtGenerator = require("./utils/jwtGenerator");
const bcrypt = require("bcrypt");
const authorization = require("./middleware/authorization");
const passport = require("passport");
var session = require("express-session");
const todos = require("./middleware/todos");
const compression = require("compression");

// const initializePassport = require("./passportConfig");

// initializePassport(passport);

const ENV = process.env.NODE_ENV;
console.log(`ENV ${ENV}`);
const PORT = process.env.PORT || 5000;
console.log(`PORT ${PORT}`);

app.use(cors());
app.use(compression());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(
//   session({
//     secret: "secret",
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());
// Use the session middleware

app.use(bodyParser.json());
if (ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  // app.use((req, res) => {
  //   console.log("kurwa mać");
  //   res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  // });
} else {
  app.use(express.static("frontend/build"));
}

app.post("/user/register", async (req, res) => {
  console.log("po register");
  try {
    const { login, email, password } = req.body;
    console.log(req.body);
    const allUsers = await pool.query("SELECT login, email FROM logintable");
    const user = allUsers.rows.filter(
      (el) => el.login === login || el.email === email
    );

    if (user.length > 0) {
      res.json("User already exist!");
    } else {
      let hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await pool.query(
        "INSERT INTO logintable (login, email, password) VALUES ($1, $2, $3) RETURNING *",
        [login, email, hashedPassword]
      );
      const token = jwtGenerator(newUser.rows[0].id);
      const resOb = {
        ...newUser.rows,
        token,
      };
      res.send(resOb);
      res.redirect("/user/login");
      // console.log("Token: " + token);
      // console.log(res.json({ token }));
      // return res.json({ token });
    }
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query("SELECT * FROM logintable WHERE email=$1", [
      email,
    ]);
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (user.rows.length === 0 || !validPassword) {
      return res.status(403).send("Password or email is incorrect");
    }
   

    const token = jwtGenerator(user.rows[0].id);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
  }
});
app.get("/user/dashboard", authorization, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT login, id FROM logintable WHERE id = $1",
      [req.user.id]
    );
    console.log(user.rows[0]);
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("server Error");
  }
});
// app.post("/authentication/verify", authorization, async (req, res) => {
//   try {
//     return res.json(true);
//   } catch (err) {
//     res.status(500).send("Server error");
//   }
// });

app.use("/", todos);
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

module.exports = app;
