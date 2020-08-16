const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(id) {
  const payload = {
    user: {
      id: id,
    },
  };
  return jwt.sign(payload, "secret", { expiresIn: 3600 });
}

module.exports = jwtGenerator;
