const {Schema, model} = require("mongoose")

const ClipModel = new Schema({
  key: {type: String, required: true},
  gifPreviewLink: {type: String, required: false},
  genre: {type: String, required: false},
  fullVideoLink: {type: String, required: false},
  duration: {type: String, required: true},
  authors: {type: String, required: true},
  linkForAuthors: {type: String, required: false},
  frameRate: {type: String, required: true},
  format: {type: String, required: true},
  aspectRation: {type: String, required: true},
  size: {type: String, required: true},
  resolution: {type: String, required: true},
  sound: {type: Boolean, required: true},
  description: {type: String, required: false}
})

module.exports = model("Clip", ClipModel)