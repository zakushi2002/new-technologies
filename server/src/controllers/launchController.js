const {
  findAll,
  existsLaunchWithId,
  abortLaunchById,
  scheduleNewLaunch,
} = require("../models/launches");
const { getPagination } = require("../services/query");

const getAllLaunches = async (req, res) => {
  const { skip, limit } = getPagination(req.query);
  return res.status(200).json(await findAll(skip, limit));
};

const createNewLaunch = async (req, res) => {
  const launch = req.body;
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      error: "Missing required launch property",
    });
  }
  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }

  await scheduleNewLaunch(launch);
  return res.status(201).json(launch);
};

const abortLaunch = async (req, res) => {
  const launchId = Number(req.params.id);
  const exists = await existsLaunchWithId(launchId);
  if (!exists) {
    return res.status(404).json({
      error: "Launch not found",
    });
  }
  const aborted = await abortLaunchById(launchId);
  if (!aborted) {
    return res.status(400).json({
      error: "Launch not aborted",
    });
  }

  return res.status(200).json({
    ok: true,
  });
};

module.exports = {
  getAllLaunches,
  createNewLaunch,
  abortLaunch,
};
