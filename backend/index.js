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

const initializePassport = require("./passportConfig");

initializePassport(passport);

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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
var MemoryStore = require("memorystore")(session);

app.use(
  session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    }),
    secret: "secretkey",
  })
);

// Access the session as req.session
app.get("/", function (req, res, next) {
  if (req.session.views) {
    req.session.views++;
    res.setHeader("Content-Type", "text/html");
    res.write("<p>views: " + req.session.views + "</p>");
    res.write("<p>expires in: " + req.session.cookie.maxAge / 1000 + "s</p>");
    res.end();
  } else {
    req.session.views = 1;
    res.end("welcome to the session demo. refresh!");
  }
});

app.use(bodyParser.json());
app.use(express.static("frontend/build"));
if (ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  });
}
app.post("/user/register", async (req, res) => {
  try {
    const { login, email, password } = req.body;
    const allUsers = await pool.query("SELECT login, email FROM logintable");

    const user = allUsers.rows.filter(
      (el) => el.login === login || el.email === email
    );
    console.log(" user: ");

    console.log(user);
    if (user.length > 0) {
      console.log("USER exists");
      res.json("User already exist!");
    } else {
      let hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await pool.query(
        "INSERT INTO logintable (login, email, password) VALUES ($1, $2, $3) RETURNING *",
        [login, email, hashedPassword]
      );
      console.log("New user: ");
      console.log(newUser);
      res.send(newUser.rows);
      res.redirect("/user/login");
      const token = jwtGenerator(newUser.rows[0].id);
      console.log("Token: ");
      console.log(res.json({ token }));
      return res.json({ token });
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
    if (user.rows.length === 0) {
      return res.json("Password or email is incorrect");
    }
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    console.log(validPassword);
    if (!validPassword) {
      return res.json("password or Email is incorrect");
    }
    const token = jwtGenerator(user.rows[0].id);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
  }
});
app.post("/user/dashboard", authorization, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT login FROM logintable WHERE id = $1",
      [req.user.id]
    );
    console.log(res);
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("server Error");
  }
});
app.post("/authentication/verify", authorization, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

module.exports = app;
