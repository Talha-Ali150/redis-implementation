//importing sequelize.
const Sequelize = require("sequelize");

//importing .env file for secrets.
require("dotenv").config();

// exporting sequlize config
module.exports = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER_NAME,
  process.env.DATABASE_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
  }
);
