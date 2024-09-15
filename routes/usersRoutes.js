const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

//get all users
router.route("/").get(getUsers);

//create a new user
router.route("/").post(createUser);

//edit user details for a specific user
router.route("/:id").put(updateUser);

//get user by ID
router.route("/:id").get(getUser);

router.route("/:id").delete(deleteUser);

module.exports = router;
