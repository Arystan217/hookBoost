const express = require("express");
const cors = require("cors");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const mongoose = require("mongoose");
const uuid = require("uuid")
const Clip = require("./models/cilp-mode")
const User = require("./models/user-model")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require("./utils/jwtUtils");
require("dotenv").config();

const PORT = process.env.PORT || 5000

const app = express();
app.use(express.json());

app.use(cors({
  origin: process.env.FRONT_URL,
  credentials: true, 
}));

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
app.get("/api/download", async (req, res) => {
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

app.get("/api/getClipsInfo", async (req, res) => {
  try {
    // const data = req.query

    const clips = await Clip.find()

    console.log(clips)

    return res.json(clips)

  } catch (e) {
    console.error(e);
    return res.status(400).json({ e })
  }
})

app.post("/api/login", async (req, res) => {
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
app.post("/api/signup", async (req, res) => {
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


app.get("/uuid", async (req, res) => {
  try {
    res.send(uuid.v4())
  } catch (e) {
    res.send("error happened")
  }
})


app.post("/addClip", async (req, res) => {
  const data = req.body

  console.log(data)

  try {
    const newClip = new Clip({
      key: data.key,
      gifPreviewLink: data.gifPreviewLink,
      fullVideoLink: data.fullVideoLink,
      duration: data.duration,
      authors: data.authors,
      linkForAuthors: data.linkForAuthors,
      frameRate: data.frameRate,
      format: data.format,
      aspectRation: data.aspectRation,
      size: data.size,
      resolution: data.resolution,
      sound: data.sound,
      description: data.description,
    })

    await newClip.save()

    return res.json({message: "success"})

  } catch (e) {
    res.send("error happened")
  }
})



const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();