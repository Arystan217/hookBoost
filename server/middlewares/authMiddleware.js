const jwt = require('jsonwebtoken');
const User = require("../models/user-model")
require("dotenv").config();

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!req.headers.origin || req.headers.origin !== process.env.FRONT_URL) {
    return res.status(403).json({ error: "Forbidden request!" });
  }

  if (!authHeader || !authHeader.split(" ")[0] == "Bearer") {
    return res.status(401).json({ message: 'Access token is missing or invalid' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    // console.log("decoded")
    // console.log(decoded)
    const user = await User.findOne({ login: decoded?.login })

    if (!user) {
      console.log("From middleware: invalid or expired tokens")
      return res.status(403).json({ message: 'Invalid or expired access token' });
    }

    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired access token' });
  }
};

module.exports = authenticate;
