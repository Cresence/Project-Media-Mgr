const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const db = require("./models");
const cloudinary = require('cloudinary');
const bodyParser = require("body-parser");
const jwt = require('express-jwt');
const jwksRsa = require("jwks-rsa");
require('dotenv').config();


// Define Cloudinary config (dotenv)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Define Cloudinary config
// cloudinary.config({
//   cloud_name: "dylavxosa",
//   api_key: "143846381816841",
//   api_secret: "IqLOEY6uxfY7-u_1EhmmbzJ2Vs0"
// });

//File upload Code start
const fileUpload = require('express-fileupload');

app.use(fileUpload());
// Upload Endpoint
app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    try {
      cloudinary.uploader.upload(`${__dirname}/client/public/uploads/${file.name}`, response => {
        db.Image.create({
          name: file.name,
          url: response.url
        });
        res.json({ url: response.url });
      });
    }
  
  catch (err) {
    console.log(err)
  }
  });
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/TestMgr");

// Retrieving all media on server load
app.get("/api/images", (req, res) => {
  db.Image.findAll({}).then(result => res.json(result));
});


// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});