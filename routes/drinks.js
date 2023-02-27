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

router.route("/").get(getAllDrinks).post(createDrink);
router.route("/:category").get(getDrinkByCategory);
router
  .route("/:id")
  .get(getOneDrink)
  .patch(patchOneDrink)
  .put(updateOneDrink)
  .delete(deleteOneDrink);

module.exports = router;
