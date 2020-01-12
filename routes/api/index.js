const router = require("express").Router();
const postRoutes = require("./posts");
const imageRoutes = require("./image");
const slidersRoutes = require("./sliders")

router.use("/posts", postRoutes);
router.use("/images", imageRoutes);
router.use("/sliders", slidersRoutes);

module.exports = router;