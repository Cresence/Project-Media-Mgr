const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true },
  embed_src: { type: String, required: true },
  description: String,
  date_added: { type: Date, default: Date.now },
  thumbnail_url: String,
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
