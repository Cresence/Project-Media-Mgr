var router = require("express").Router();
var fetchController = require("../../controllers/fetchController");

router.get("/", fetchController.scrapeHeadlines);

module.exports = router;
