const router = require("express").Router();
const postRoutes = require("./posts");
const imageRoutes = require("./image");
const slidersRoutes = require("./sliders")
const userRoutes = require("./users")

router.use("/posts", postRoutes);
router.use("/images", imageRoutes);
router.use("/sliders", slidersRoutes);
router.use("/users", userRoutes);

module.exports = router;