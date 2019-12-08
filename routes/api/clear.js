var router = require("express").Router();
var clearController = require("../../controllers/clearController");

router.get("/", clearController.clearDB);

module.exports = router;
