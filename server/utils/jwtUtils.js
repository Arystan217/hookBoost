const jwt = require('jsonwebtoken');

// Generate Access Token
const generateAccessToken = (user) => {
  return jwt.sign({ login: user.login }, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.ACCESS_TOKEN_LIFETIME });
};

// Generate Refresh Token
const generateRefreshToken = (user) => {
  return jwt.sign({ login: user.login }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.REFRESH_TOKEN_LIFETIME });
};

module.exports = { generateAccessToken, generateRefreshToken };
