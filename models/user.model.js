const { Sequelize } = require("sequelize");
const sequelize = require("../infrastructure/postgresql.js");

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
