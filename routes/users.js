const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  createUser,
  getOneUser,
  updateOneUser,
  patchOnUser,
  deleteOneUser,
} = require("../controllers/usersController");

router.route("/").get(getAllUsers).post(createUser);
router
  .route("/:id")
  .get(getOneUser)
  .put(updateOneUser)
  .patch(patchOnUser)
  .delete(deleteOneUser);

module.exports = router;
