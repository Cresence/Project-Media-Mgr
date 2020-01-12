const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const slidersSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  linkTo: {type: String},
  image: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const Sliders = mongoose.model("Sliders", slidersSchema);

module.exports = Sliders;