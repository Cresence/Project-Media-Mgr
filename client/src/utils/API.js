import axios from "axios";

export default {
 
  getPosts: function() {
    return axios.get("/api/posts");
  },
  // Gets the book with the given id
  getPost: function(id) {
    return axios.get("/api/posts/" + id);
  },
  // Deletes the book with the given id
  deletePost: function(id) {
    return axios.delete("/api/posts/" + id);
  },
  // Saves a book to the database
  savePost: function(postData) {
    return axios.post("/api/posts", postData);
  },
  updatePost: function(id, data){
    return axios.put("/api/posts/" + id, data);
  },

  postImage: function(postImageData) {
    return axios.post("/api/images", postImageData);
  },

  getImages: function() {
    return axios.get("/api/images");
  }
};

