//importing the sequelize ORM for interacting with postgresql DB.
const { Sequelize } = require("sequelize");

//importing the postgresql configuration.
const sequelize = require("../infrastructure/postgresql.js");

// exporting the user module.
module.exports = sequelize.define(
  "user",
  {
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
  },
  { timestamps: false }
);
