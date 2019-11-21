const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  name: "String",
  url: "String",
  userEmail: "String",
  date: { type: Date, default: Date.now }
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
