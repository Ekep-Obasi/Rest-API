const express = require("express");
const router = express.Router();
const {
  getAllDrinks,
  createDrink,
  getOneDrink,
  updateOneDrink,
  deleteOneDrink,
  patchOneDrink,
  getDrinkByCategory,
} = require("../controllers/drinksController");

router.route("/:category").get(getDrinkByCategory);
router.route("/").get(getAllDrinks).post(createDrink);
router
  .route("/:id")
  .get(getOneDrink)
  .patch(patchOneDrink)
  .put(updateOneDrink)
  .delete(deleteOneDrink);
router.param("category", function (req, res, next, category) {
  next();
});

module.exports = router;
