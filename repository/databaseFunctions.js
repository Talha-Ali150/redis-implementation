//importing sequelize config 
const sequelize = require("../infrastructure/postgresql.js");

//importing user model to perform db requests.
const User = require("../models/user.model.js");

//connecting to DB function
const connectToDB = async () => {
  try {
    //connecting to DB
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // syncing the models with database to create table if not created.
    await sequelize.sync();
    console.log("Database synchronized successfully.");
  } catch (error) {
    //return error in case of failure.
    console.error("Unable to connect to the database:", error);
  }
};


//add user to DB.
const addUserToDB = async (filter) => {
  //create user in and save it to database based on the filter data.
  return await User.create(filter);
};

//get user from DB.
const getUsersFromDB = async () => {
  return await User.findAll();
};

//update user data in DB.
const updateUserToDB = async (filter) => {
  //extracting used data from filter.
  const { name, id } = filter;
  //update the user based on the query.
  //where targets the id.
  //returning true will return the updated data.
  return await User.update({ name }, { where: { id }, returning: true });
};

// delete user from DB
const deleteUserFromDB = async (filter) => {
  //delete user from DB based on filter
  return await User.destroy({
    where: {
      id:filter,
    },
  });
};

// export all the DB functions.
module.exports = {
  connectToDB,
  addUserToDB,
  getUsersFromDB,
  updateUserToDB,
  deleteUserFromDB,
};
