// importing express for creating server.
const express = require("express");

// importing funcction for connecting database.
const { connectToDB } = require("./repository/databaseFunctions.js");

// importing the necessary routes.
const userRoutes = require("./routes/user.routes.js");

//importing dotenv configuration for secrets.
require("dotenv").config();

// creating an instance of express named app
const app = express();

//using middleware for parsing requests
app.use(express.json());

// using the imported routes to work on specified entry-point.
app.use("/api/users", userRoutes);

//specifying a fallback port.
const port = process.env.PORT || 8080;

const connectServer = () => {
  try {
    // executing the database connection function.
    connectToDB();
    // starting the server.
    app.listen(port, () => console.log(`server is running at port:${port}`));
  } catch (error) {
    // showing error in case of failure
    console.log("server could not be started", error);
  }
};

// exporting the connect to server function.
module.exports = {
  connectServer,
};
