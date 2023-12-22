// MongoDB Schema Design: Can you create a video showing how to design and
// implement a MongoDB schema for the Topic Management system using Mongoose?
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const hostName = process.env.HOST_NAME || "localhost";
const databaseName = process.env.DB_NAME || "topic-management-system";
const databaseUrl =
  process.env.DB_URL ||
  "mongodb+srv://20110420:2002@new-technologies.wqpnhlj.mongodb.net/";
const api = require("./routes/api");

// Connect to MongoDB
const database = async () => {
  await mongoose
    .connect(databaseUrl, {
      useNewUrlParser: true,
      dbName: databaseName,
    })
    .then(() => {
      console.log("Connected to MongoDB successfully!");
    })
    .catch((err) => {
      console.log("Failed to connect to MongoDB!");
      console.log(err);
    });
};

database();

app.get("/", (req, res) => {
  res.send(
    "Connected to server successfully! Connected to MongoDB successfully!"
  );
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/v1", api);

app.listen(port, hostName, () => {
  console.log(`Server is running at http://${hostName}:${port}`);
});
