const {
  addUserToDB,
  getUsersFromDB,
  updateUserToDB,
  deleteUserFromDB,
} = require("../repository/databaseFunctions.js");
const { client } = require("../infrastructure/redis.js");

const addUserService = async (filter) => {
  try {
    const addedUser = await addUserToDB(filter);
    if (!addedUser) {
      return "User could not be created";
    }
    await client.del("users");
    return addedUser;
  } catch (error) {
    return error;
  }
};

const getUsersService = async () => {
  try {
    const cacheValue = await client.get("users");
    if (cacheValue) {
      return JSON.parse(cacheValue);
    }
    const users = await getUsersFromDB();
    if (!users) {
      return false;
    }
    await client.set("users", JSON.stringify(users), "EX", 300);
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
    await client.del("users");
    return updatedUser;
  } catch (error) {
    return error;
  }
};

const deleteUserService = async (filter) => {
  try {
    const deletedUser = await deleteUserFromDB(filter);
    if (!deletedUser) {
      return false;
    }
    await client.del("users");
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
