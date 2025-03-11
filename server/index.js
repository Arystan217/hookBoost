const express = require("express");
const cors = require("cors");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 5000

const app = express();

app.use(cors());

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
app.get("/download", async (req, res) => {
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