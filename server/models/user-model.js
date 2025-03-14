const { Schema, model } = require("mongoose")

const UserModel = new Schema({
  login: { type: String, required: true },
  password: { type: String, required: true },
  subscription: { type: String, required: true },
  downloads: [
    { type: String, required: false }
  ]
})

module.exports = model("User", UserModel)