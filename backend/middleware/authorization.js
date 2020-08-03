const jwt = require("jsonwebtoken");
require("dotenv").config();

//this middleware will on continue on if the token is inside the local storage

module.exports = async function (req, res, next) {
  // Get token from header
  console.log(req);
  console.log(`req json: ${req.json}`);
  console.log(req.body.token);
  console.log(`req.header auth: ${req.header("token")}`);
  const token = req.body.token;
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
    console.log(`req.user ${req.user}`);
    console.log(`verify.user ${verify.user}`);
    req.user = verify.user;
    next();
  } catch (err) {
    console.log(`catch`);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
