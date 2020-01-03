const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: String,
  plot: String,
  genre: String,
  released: String,
  rated: String,
  imdbRating: String,
  director: String,
  writer: String,
  actors: String,
  website: String
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
