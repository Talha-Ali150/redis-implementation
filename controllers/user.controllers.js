const {
  addUserService,
  getUsersService,
  updateUserService,
  deleteUserService,
} = require("../services/userServices");

const addUserController = async (req, res) => {
  try {
    const { name, email } = req.body;
    const result = await addUserService({ name, email });
    if (!result) {
      return res.status(400).send({
        status: false,
        data: result,
        message: "failed to create user",
      });
    }
    return res.send({
      status: true,
      data: result,
      message: "user added successfully",
    });
  } catch (error) {
    return res.send({
      status: false,
      data: error,
      message: "internal server error",
    });
  }
};

const getUsersController = async (req, res) => {
  try {
    const result = await getUsersService();
    console.log("this is result", result);
    if (result.length === 0) {
      return res.status(200).send({
        status: true,
        data: result,
        message: "no users found",
      });
    }
    return res.send({
      status: true,
      data: result,
      message: "users fetched successfully",
    });
  } catch (error) {
    return res.send({
      status: false,
      data: error,
      message: "internal server error",
    });
  }
};

const updateUserController = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const filter = { name, id };
  try {
    const [count, change] = await updateUserService(filter);
    if (count === 0) {
      return res.status(400).send({
        status: false,
        data: change,
        message: "user not found",
      });
    }
    return res.send({
      status: true,
      data: change[0],
      message: "users updated successfully",
    });
  } catch (error) {
    return res.send({
      status: false,
      data: error,
      message: "internal server error",
    });
  }
};

const deleteUserController = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteUserService(id);
    console.log("this is result", result);
    if (!result) {
      return res.status(400).send({
        status: false,
        message: "user not found",
      });
    }
    return res.send({
      status: true,
      message: "user deleted successfully",
    });
  } catch (error) {
    return res.send({
      status: false,
      data: error,
      message: "internal server error",
    });
  }
};

module.exports = {
  addUserController,
  getUsersController,
  updateUserController,
  deleteUserController,
};
