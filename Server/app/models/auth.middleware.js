/*const jwt = require("jsonwebtoken");
const path = require("path");
const config = require("../config/auth.config.js"); // Update the path to import from the config folder
// Middleware to verify the JWT token from the request
exports.verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).json({ message: "No token provided!" });
  }

  const config = require(path.join(__dirname, "auth.config.js"));

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized!" });
    }

    req.userId = decoded.id;
    next();
  });
};
*/

const jwt = require("jsonwebtoken");
const path = require("path");
const config = require("../config/auth.config");

// Middleware to verify the JWT token from the request
exports.verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).json({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized!" });
    }

    req.userId = decoded.id;
    next();
  });
};
