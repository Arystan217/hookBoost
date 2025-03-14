const express = require("express");
const router = express.Router();
const User = require("../models/user-model")
const Clip = require("../models/cilp-model")
const authenticate = require("../middlewares/authMiddleware");
// const bcrypt = require("bcrypt");
// const { generateAccessToken, generateRefreshToken } = require("../utils/jwtUtils");
// const jwt = require("jsonwebtoken")

// example of middleware usage
// router.get("/7sLWGiC5rRpU2oM7GSAejxiIoM18Qh", authenticate, async (req, res) => {
//   const devices = await Device.find()

//   return res.send(devices)
// })

// Generate a signed URL for direct download
router.get("/api/download", authenticate, async (req, res) => {
  try {
    const fileName = req.query?.file; // Pass filename as a query param
    console.log(fileName)

    console.log(`filename: ${fileName}`)

    const command = new GetObjectCommand({
      Bucket: "hookboost-test",
      Key: fileName,
      ResponseContentDisposition: "attachment; filename=" + fileName,
    });

    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600, // Link expires in 1 hour
    });

    console.log(signedUrl)

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

module.exports = router;