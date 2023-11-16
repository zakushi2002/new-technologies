require("dotenv").config();
const mongoose = require("mongoose");
const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connection.once("open", () => {
  console.log("Connected to DB!");
});

mongoose.connection.on("error", (error) => {
  console.log(error);
});

const connectDB = async () => {
  await mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    dbName: process.env.DB_NAME,
  });
};

const disconnectDB = async () => {
  await mongoose.disconnect();
};

module.exports = { connectDB, disconnectDB };
