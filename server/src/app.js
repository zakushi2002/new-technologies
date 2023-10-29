const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

const planetRouter = require("./routes/planetRouter");
const launcheRouter = require("./routes/launchRouter");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);
app.use(morgan("combined"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(planetRouter);
app.use("/launches", launcheRouter);
app.use(`/*`, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
