//importing express
const express = require("express");
//importing all the required controller functions to be used by the router.
const {
  addUserController,
  getUsersController,
  updateUserController,
  deleteUserController,
} = require("../controllers/user.controllers");
//creating an instance of express Router.
const router = express.Router();

// route to add user.
router.route("/addUser").post(addUserController);
// route to get all users.
router.route("/").get(getUsersController);
// route to update user.
router.route("/updateUser/:id").put(updateUserController);
// route to delete user.
router.route("/deleteUser/:id").delete(deleteUserController);
// exporting the router to be used by the server.
module.exports = router;
