const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const pool = require("./database");

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
if (ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client-app/build")));
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../client-app/build/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

module.exports = app;
