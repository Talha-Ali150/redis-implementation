// importing all the required function to interact with the database.
const {
  addUserToDB,
  getUsersFromDB,
  updateUserToDB,
  deleteUserFromDB,
} = require("../repository/databaseFunctions.js");

// importing the redis client for initiating redis requests.
const { client } = require("../../infrastructure/redis.js");

//add user logic.
const addUserService = async (filter) => {
  try {
    //add user to database using the filter provided.
    const addedUser = await addUserToDB(filter);

    //if failed to add user to the database.
    if (!addedUser) {
      // return this.
      return "User could not be created";
    }
    //otherwise
    // clearing the redis cache
    await client.del("users");
    //returning the added user.
    return addedUser;
  } catch (error) {
    //returning error in case of failure.
    return error;
  }
};

// get all users logic
const getUsersService = async () => {
  try {
    //getting all users from redis cache.
    const cacheValue = await client.get("users");
    // checking if cache exists.
    if (cacheValue) {
      //if cache exists return the cache instead of making request to DB, saving resources and time.
      return JSON.parse(cacheValue);
    }
    //other wise requestin gusers from DB.
    const users = await getUsersFromDB();

    // if request fails
    if (!users) {
      // return false to show failure.
      return false;
    }
    // other wise set the cache with a 5 minute expiration timer.
    await client.set("users", JSON.stringify(users), "EX", 300);
    //return the fetched users.
    return users;
  } catch (error) {
    //return error in case of failure.
    return error;
  }
};

// update user logic
const updateUserService = async (filter) => {
  try {
    //finding user to update based on the provided filter.
    const updatedUser = await updateUserToDB(filter);
    // if no user found with provided filter.
    if (!updatedUser) {
      // return failed to update user.
      return "User could not be updated";
    }
    //otherwise clear the redis cache.
    await client.del("users");
    // this will return an array which will have two elements.
    // 1. updated count.
    // 2. array with updated user info.
    return updatedUser;
  } catch (error) {
    //return error in case of failure.
    return error;
  }
};

//delete user logic
const deleteUserService = async (filter) => {
  try {
    // finding user to delete based on the provided filter.
    const deletedUser = await deleteUserFromDB(filter);
    // if no user found with provided filter.
    if (!deletedUser) {
      // return failed to delete user.
      return false;
    }
    // otherwise clear the redis cache.
    await client.del("users");
    // return true to show deletion success.
    return deletedUser;
  } catch (error) {
    //return error in case of failure.
    return error;
  }
};

//exporting all the logic based services to be used by the controllers.
module.exports = {
  addUserService,
  getUsersService,
  updateUserService,
  deleteUserService,
};
