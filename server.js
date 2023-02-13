const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const db = require("./models");
const cloudinary = require('cloudinary');
const bodyParser = require("body-parser");
const { expressjwt } = require('express-jwt');
const jwksRsa = require("jwks-rsa");
require('dotenv').config();


// Define Cloudinary config (dotenv)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

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

// Define middleware that validates incoming bearer tokens
// using JWKS from Auth0 site
const checkJwt = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ["RS256"]
});

// Define an endpoint that must be called with an access token
app.get("/api/external", checkJwt, (req, res) => {
  console.log(JSON.parse(res))
  res.send({
    msg: "Your Access Token was successfully validated!"
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

  app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/TestMgr").then(() => {
  console.log("Connected to Database")
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});

// Retrieving all media on server load
app.get("/api/images", (req, res) => {
  db.Image.findAll({}).then(result => res.json(result));
});


// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});