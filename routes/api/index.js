const router = require("express").Router();
const postRoutes = require("./posts");
const imageRoutes = require('./image');
const fetchRoutes = require("./fetch");
const noteRoutes = require("./notes");
const headlineRoutes = require("./headlines");
const clearRoutes = require("./clear");


router.use("/posts", postRoutes);
router.use("/images", imageRoutes);
router.use("/fetch", fetchRoutes);
router.use("/notes", noteRoutes);
router.use("/headlines", headlineRoutes);
router.use("/clear", clearRoutes);


module.exports = router;
