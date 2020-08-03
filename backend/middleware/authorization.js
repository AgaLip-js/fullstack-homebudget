const jwt = require("jsonwebtoken");
require("dotenv").config();

//this middleware will on continue on if the token is inside the local storage

module.exports = function (req, res, next) {
  // Get token from header
  console.log(`req auth: ${req}`);
  console.log(`req.header auth: ${req.header("token")}`);
  const token = req.header("token");
  console.log(`token: ${token}`);
  // Check if not token
  if (!token) {
    console.log(`token denied: ${token}`);
    return res.status(403).json({ msg: "authorization denied" });
  }

  // Verify token
  try {
    //it is going to give use the user id (user:{id: user.id})
    const verify = jwt.verify(token, "secret");
    console.log(`verify: ${verify}`);
    req.user = verify.user;
    next();
  } catch (err) {
    console.log(`catch`);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
