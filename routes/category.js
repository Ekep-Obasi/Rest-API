const express = require("express");
const router = express.Router();

const {
  getAllCategories,
  createCategory,
  getOneCategory,
  updateOneCategory,
  patchOneCategory,
  deleteOneCategory,
} = require("../controllers/categoriesController");

router.route("/").get(getAllCategories).post(createCategory);
router
  .route("/:id")
  .get(getOneCategory)
  .put(updateOneCategory)
  .patch(patchOneCategory)
  .delete(deleteOneCategory);

module.exports = router;
