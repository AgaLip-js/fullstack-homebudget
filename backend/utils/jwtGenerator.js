const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(id) {
  const payload = {
    user: {
      id: id,
    },
  };
  return jwt.sign(payload, 'secretkey', { expiresIn: "1hr" }, (err, token) => {
    res.json({
      token
    }););
}

module.exports = jwtGenerator;
