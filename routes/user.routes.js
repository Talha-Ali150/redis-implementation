const express = require("express");
const {
  addUserController,
  getUsersController,
  updateUserController,
  deleteUserController,
} = require("../controllers/user.controllers");
const router = express.Router();
// //method, entry-point, function

router.route("/addUser").post(addUserController);
router.route("/").get(getUsersController);
router.route("/updateUser/:id").put(updateUserController);
router.route("/deleteUser/:id").delete(deleteUserController);

// // router.route("/").get(getUsers);
// // router.route("/addUser").post(addUser);
// // router.route("/updateUser/:id").put(updateUser);
// // router.route("/deleteUser/:id").delete(deleteUser);

// router.route("/addUser").post(addUser);

module.exports = router;
