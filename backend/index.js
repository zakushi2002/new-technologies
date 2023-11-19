require("dotenv").config();
const express = require("express");
const app = express(); // app express
const helmet = require("helmet");
const cors = require("cors");
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME || `localhost` || `127.0.0.1`;
const configViewEngine = require("./config/viewEngine");
const initAPIRoutes = require("./routes/api");
const morgan = require("morgan");
const mongoose = require("mongoose");

// Connect to DB
const dbURL = process.env.DB_URL;
const database = async () => {
  try {
    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      dbName: process.env.DB_NAME,
    });
  } catch (error) {
    console.log(error);
  }
};
database();
console.log(dbURL);
// Test connect to DB
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  // we're connected!
  console.log(`Connected to DB!`);
});
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,PUT,POST,DELETE",
    optionsSuccessStatus: 200,
  })
);
app.use(helmet());
// config view engine
configViewEngine(app);

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// temp middleware
// app.use((req, res, next) => {
//   const date = new Date();
//   const time = `${date.getDate()}-${
//     date.getMonth() + 1
//   }-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
//   console.log(`${req.method} ${req.url} ${time}`);
//   next();
// });

app.use(morgan("combined"));

// Test handle 404
app.get("/", (req, res) => {
  res.render("./error/NotFound");
});

// Init API Routes
initAPIRoutes(app);

app.listen(port, hostname, () => {
  console.log(
    `Server listening on port ${port}!\nDevelopment: http://${hostname}:${port}`
  );
});
