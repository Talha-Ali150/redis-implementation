const express = require("express");
const { connectToDB } = require("./repository/databaseFunctions.js");
const userRoutes = require("./routes/user.routes.js");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use("/api/users", userRoutes);
const port = process.env.PORT || 8080;

const connectServer = () => {
  try {
    connectToDB();
    app.listen(port, () => console.log(`server is running at port:${port}`));
  } catch (error) {
    console.log("server could not be started", error);
  }
};

module.exports = {
  connectServer,
};
