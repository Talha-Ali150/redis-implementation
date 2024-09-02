//importing all the logic based functions.
const {
  addUserService,
  getUsersService,
  updateUserService,
  deleteUserService,
} = require("../services/userServices");

//deal with add user request and response.
const addUserController = async (req, res) => {
  try {
    //extract name and email from request.
    const { name, email } = req.body;

    // providing arguments to add user service function.
    const result = await addUserService({ name, email });

    //check if user was not created and return the response accordingly.
    if (!result) {
      return res.status(400).send({
        status: false,
        data: result,
        message: "failed to create user",
      });
    }
    //otherwise,
    // return successful response.
    return res.send({
      status: true,
      data: result,
      message: "user added successfully",
    });
  } catch (error) {
    //any other error.
    return res.send({
      status: false,
      data: error,
      message: "internal server error",
    });
  }
};

//deal with get users request and response.
const getUsersController = async (req, res) => {
  try {
    //calling the get users service function.
    const result = await getUsersService();
    //check if users were not found and return the response accordingly.
    if (result.length === 0) {
      //if no users were found return response accordingly.
      return res.status(200).send({
        status: true,
        data: result,
        message: "no users found",
      });
    }
    // otherwise,
    // return successful response.
    return res.send({
      status: true,
      data: result,
      message: "users fetched successfully",
    });
  } catch (error) {
    //any other error.
    return res.send({
      status: false,
      data: error,
      message: "internal server error",
    });
  }
};

//deal with update user request and response.
const updateUserController = async (req, res) => {
  //extracting name from request.
  const { name } = req.body;
  //extracting id from URL params.
  const { id } = req.params;
  //creating an object to contain the name and id.
  const filter = { name, id };
  try {
    //calling the update user service function.
    const [count, change] = await updateUserService(filter);
    //check if user was updated successfully.
    if (count === 0) {
      //if user was not updated return response accordingly.
      return res.status(400).send({
        status: false,
        data: change,
        message: "user not found",
      });
    }
    // otherwise,
    // return successful response.
    return res.send({
      status: true,
      data: change[0],
      message: "users updated successfully",
    });
  } catch (error) {
    //any other error.
    return res.send({
      status: false,
      data: error,
      message: "internal server error",
    });
  }
};

//deal with delete user request and response.
const deleteUserController = async (req, res) => {
  //extracting id from URL params.
  const { id } = req.params;
  try {
    //calling the delete user service function.
    const result = await deleteUserService(id);
    //check if user was deleted successfully.
    if (!result) {
      return res.status(400).send({
        status: false,
        message: "user not found",
      });
    }
    // otherwise,
    // return successful response.
    return res.send({
      status: true,
      message: "user deleted successfully",
    });
  } catch (error) {
    //any other error.
    return res.send({
      status: false,
      data: error,
      message: "internal server error",
    });
  }
};

//export all the user controllers.
module.exports = {
  addUserController,
  getUsersController,
  updateUserController,
  deleteUserController,
};
