const sequelize = require("../../infrastructure/postgresql.js");
const User = require("../models/user.model.js");

const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync();
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const addUserToDB = async (filter) => {
  return await User.create(filter);
};

const getUsersFromDB = async () => {
  return await User.findAll();
};

const updateUserToDB = async (filter) => {
  const { name, id } = filter;

  return await User.update({ name }, { where: { id }, returning: true });
};

const deleteUserFromDB = async (filter) => {
  return await User.destroy({
    where: {
      id: filter,
    },
  });
};

module.exports = {
  connectToDB,
  addUserToDB,
  getUsersFromDB,
  updateUserToDB,
  deleteUserFromDB,
};
