import axios from "axios";

export default {
 
  getPosts: function() {
    return axios.get("/api/posts");
  },
  // Gets the post with the given id
  getPost: function(id) {
    return axios.get("/api/posts/" + id);
  },
  // Deletes the post with the given id
  deletePost: function(id) {
    return axios.delete("/api/posts/" + id);
  },
  // Saves a post to the database
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
  },

  getImage: function(id) {
    return axios.get("/api/images/" + id);
  },

  getSliders: function() {
    return axios.get("/api/sliders");
  },
  getSlider: function(id) {
    return axios.get("/api/sliders/" + id);
  },
  deleteSlider: function(id) {
    return axios.delete("/api/sliders/" + id);
  },
  saveSlider: function(postData) {
    return axios.post("/api/sliders", postData);
  },
  updateSlider: function(id, data){
    return axios.put("/api/sliders/" + id, data);
  },
  getUsers: function() {
    return axios.get("/api/users");
  },
  getUser: function(id) {
    return axios.get("/api/users/" + id);
  },
  updateUser: function(id, data){
    return axios.put("/api/posts/" + id, data);
  },
  saveUser: function(userData) {
    return axios.post("/api/users", userData);
  }

};

