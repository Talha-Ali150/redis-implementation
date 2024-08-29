const {
  addUserToDB,
  getUsersFromDB,
  updateUserToDB,
  deleteUserFromDB,
} = require("../repository/databaseFunctions");

const addUserService = async (filter) => {
  try {
    const addedUser = await addUserToDB(filter);
    if (!addedUser) {
      return "User could not be created";
    }
    return addedUser;
  } catch (error) {
    return error;
  }
};

const getUsersService = async () => {
  try {
    const users = await getUsersFromDB();
    if (!users) {
      return false;
    }
    return users;
  } catch (error) {
    return error;
  }
};

const updateUserService = async (filter) => {
  try {
    const updatedUser = await updateUserToDB(filter);
    if (!updatedUser) {
      return "User could not be updated";
    }
    return updatedUser;
  } catch (error) {
    return error;
  }
};

const deleteUserService = async (filter) => {
  try {
    const deletedUser = await deleteUserFromDB(filter);
    if (!deletedUser) {
      // return "User could not be deleted";
      return false;
    }
    return deletedUser;
  } catch (error) {
    return error;
  }
};
module.exports = {
  addUserService,
  getUsersService,
  updateUserService,
  deleteUserService,
};
