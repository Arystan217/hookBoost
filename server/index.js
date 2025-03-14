const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const uuid = require("uuid")
const Clip = require("./models/cilp-model")
const authRoutes = require("./routes/authRoutes")
const protectedRoutes = require("./routes/protectedRoutes")
const cookieParser = require("cookie-parser");
require("dotenv").config();

const PORT = process.env.PORT || 5000

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use(cors({
  origin: process.env.FRONT_URL,
  credentials: true, 
}));

app.use("/api", authRoutes);
app.use("", protectedRoutes);





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