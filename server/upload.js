const fs = require("fs");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const client = new S3Client({
  endpoint: process.env.CLOUDFLARE_API_URL,
  region: "auto",
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
  },
});

const uploadFile = async () => {
  const fileStream = fs.createReadStream("./small.gif");

  const command = new PutObjectCommand({
    Bucket: "hookboost-test",
    Key: "small.gif",
    Body: fileStream,
  });

  await client.send(command);
  console.log("Upload successful!");
};

uploadFile();
