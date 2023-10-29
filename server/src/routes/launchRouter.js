const express = require("express");
const {
  getAllLaunches,
  createNewLaunch,
  abortLaunch,
} = require("../controllers/launchController");

const launcheRouter = express.Router();

launcheRouter.get("/", getAllLaunches);
launcheRouter.post("/", createNewLaunch);
launcheRouter.delete("/:id", abortLaunch);

module.exports = launcheRouter;
