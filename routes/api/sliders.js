const router = require("express").Router();
const slidersController = require("../../controllers/slidersController");

// Matches with "/api/books"
router.route("/")
  .get(slidersController.findAll)
  .post(slidersController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(slidersController.findById)
  .put(slidersController.update)
  .delete(slidersController.remove);

module.exports = router;
