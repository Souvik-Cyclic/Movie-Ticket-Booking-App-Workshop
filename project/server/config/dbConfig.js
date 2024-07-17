const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DATABASE_URL);

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Connection Successful");
});
connection.on("error", () => {
  console.log("Failed to connect to database server.");
});
