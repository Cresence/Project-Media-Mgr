const router = require("express").Router();
const postRoutes = require("./posts");
const imageRoutes = require('./image')

router.use("/posts", postRoutes);

router.use("/images", imageRoutes);

module.exports = router;
