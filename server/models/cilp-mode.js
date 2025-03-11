const {Schema, model} = require("mongoose")

const ClipModel = new Schema({
  key: {type: String, required: true},
  gifPreviewLink: {type: String, required: true},
  fullVideoLink: {type: String, required: true},
  duration: {type: String, required: true},
  authors: {type: String, required: true},
  frameRate: {type: String, required: true},
  format: {type: String, required: true},
  aspectRation: {type: String, required: true},
  size: {type: String, required: true},
  loopable: {type: Boolean, required: true},
  sound: {type: Boolean, required: true},
})

module.exports = model("Clip", ClipModel)