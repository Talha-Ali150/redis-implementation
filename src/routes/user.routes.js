const express = require("express");

const {
  addUserController,
  getUsersController,
  updateUserController,
  deleteUserController,
} = require("../controllers/user.controllers.js");

const router = express.Router();

router.route("/addUser").post(addUserController);
router.route("/").get(getUsersController);
router.route("/updateUser/:id").put(updateUserController);
router.route("/deleteUser/:id").delete(deleteUserController);

module.exports = router;
