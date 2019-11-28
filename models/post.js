const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
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

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
