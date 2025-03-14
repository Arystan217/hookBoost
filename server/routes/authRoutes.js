const express = require("express");
const router = express.Router();
const User = require("../models/user-model")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs');
const { generateAccessToken, generateRefreshToken } = require("../utils/jwtUtils");


router.post("/login", async (req, res) => {
  try {
    const data = req.body

    // validate login data
    if (!data.login.trim().length || !data.password.trim().length) {
      return res.status(400).json({message: "Almost there! Just make sure all fields are filled in."})
    }

    const user = await User.findOne({login: data.login})
    if (!user) {
      return res.status(400).json({message: "Oops! We couldn’t find an account with those details. Try again?"})
    }
    const isPasswordValid = await bcrypt.compare(data.password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Oops! We couldn’t find an account with those details. Try again?" })
    }

    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    // Send refresh token as HttpOnly cookie
    res.cookie('hookBoostRefreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.isProduction || false, // Use true in production (HTTPS)
      sameSite: 'None',
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    });

    return res.status(200).json({ accessToken });
  } catch (e) {
    console.log(e)
    return res.status(400).json({e: "Oops, something went wrong, please try later"})
  }
})

router.post("/signup", async (req, res) => {
  try {
    const data = req.body

    console.log(JSON.stringify(data))

    // validate login data
    if (!data.login.trim().length || !data.password.trim().length) {
      return res.status(400).json({message: "Please make sure all fields are filled in"})
    }

    const isAlreadyUser = await User.findOne({login: data.login})

    if (isAlreadyUser) {
      return res.status(400).json({message: "Unfortunately, user with such email already exists, please try with another email"})
    }

    const hashedPassword = await bcrypt.hash(data.password, 7);

    const newUser = new User({
      login: data.login,
      password: hashedPassword,
      subscription: "free"
    })

    await newUser.save()

    const accessToken = generateAccessToken({login: data.login})
    const refreshToken = generateRefreshToken({login: data.login})

    // Send refresh token as HttpOnly cookie
    res.cookie('hookBoostRefreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.isProduction || false, // Use true in production (HTTPS)
      sameSite: 'None',
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    });

    return res.status(200).json({ accessToken });
  } catch (e) {
    console.log(e)
    return res.status(400).json({e: "Oops, something went wrong, please try later"})
  }
})

// Refresh token route
router.post('/refresh', async (req, res) => {
  console.log("client is trying to refresh jwt")
  const refreshToken = req.cookies.hookBoostRefreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token missing' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    console.log(decoded.login)

    const user = await User.findOne({ login: decoded?.login })

    if (!user) return res.status(403).json({ message: 'Invalid or expired refresh token' });

    const accessToken = generateAccessToken({ login: decoded.login, });
    return res.status(200).json({ accessToken });
  } catch (error) {
    console.log(error)
    return res.status(403).json({ message: 'Invalid or expired refresh token' });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  console.log("user wants to logout")
  res.clearCookie('hookBoostRefreshToken');
  return res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;