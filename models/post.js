const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  news_title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  news_body: { type: String, required: true },
  date: { type: Date, default: Date.now },
  image_url: { type: String, required: true },
  author: { type: String, required: true },
  author_photo: { type: String, required: true },
  tags: {type: String }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
