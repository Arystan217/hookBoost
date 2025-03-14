const express = require("express");
const router = express.Router();
const User = require("../models/user-model")
const Clip = require("../models/cilp-model")
const authenticate = require("../middlewares/authMiddleware");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const jwt = require("jsonwebtoken")
require("dotenv").config();

// const bcrypt = require("bcrypt");
// const { generateAccessToken, generateRefreshToken } = require("../utils/jwtUtils");
// const jwt = require("jsonwebtoken")

// example of middleware usage
// router.get("/7sLWGiC5rRpU2oM7GSAejxiIoM18Qh", authenticate, async (req, res) => {
//   const devices = await Device.find()

//   return res.send(devices)
// })



// Cloudflare R2 Credentials
const s3Client = new S3Client({
  region: "auto",
  endpoint: process.env.CLOUDFLARE_API_URL,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
  },
});


// Generate a signed URL for direct download
router.get("/api/download", authenticate, async (req, res) => {
  try {
    const fileName = req.query?.file; // Pass filename as a query param
    console.log(`filename: ${fileName}`)


    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
    console.log(decoded.login)
    if (!decoded.login) {
      return res.status(400).json({ e: "no login" })
    }
    const user = await User.findOne({ login: decoded.login })
    if (!user) return res.status(400).json({ e: "no login" })

    const fileKey = fileName.replace(".mp4", "");

    const clip = await Clip.findOne({ key: fileKey });
    if (!clip) return res.status(400).json({ e: "Clip not found" });

    user.downloads = user.downloads.filter(dwnld => dwnld !== fileKey);

    // Add the new download at the beginning
    user.downloads.unshift(fileKey);

    // Save changes
    await user.save();

    console.log("Updated downloads:", user.downloads);

    const command = new GetObjectCommand({
      Bucket: "hookboost-test",
      Key: fileName,
      ResponseContentDisposition: "attachment; filename=" + fileName,
    });

    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600, // Link expires in 1 hour
    });

    res.json({ url: signedUrl }); // Send the pre-signed URL to the frontend
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generating signed URL" });
  }
});

router.get("/api/getClipsInfo", authenticate, async (req, res) => {
  try {
    // const data = req.query

    const clips = await Clip.find()

    return res.json(clips)

  } catch (e) {
    console.error(e);
    return res.status(400).json({ e })
  }
})

router.get("/api/getUserDownloads", authenticate, async (req, res) => {
  try {
    // const data = req.query
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
    console.log(decoded.login)

    if (!decoded.login) {
      return res.status(400).json({ e: "no login" })
    }

    const user = await User.findOne({ login: decoded.login })

    if (!user) {
      return res.status(400).json({ e: "wrong credentials" })
    }

    const clips = await Clip.find({ key: { $in: user.downloads } });

    return res.json({ downloads: clips })



  } catch (e) {
    console.error(e);
    return res.status(400).json({ e })
  }
})

module.exports = router;