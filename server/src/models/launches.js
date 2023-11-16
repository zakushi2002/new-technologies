const axios = require("axios");
const launches = require("./mongo/launches");
const planets = require("./mongo/planets");

let DEFAULT_FLIGHT_NUMBER = 100;
const SPACEX_API_URL = "https://api.spacexdata.com/v3/launches?limit=5";

const populateLaunches = async () => {
  console.log("Downloading launch data...");
  const response = await axios.get(SPACEX_API_URL);
  if (response.status !== 200) {
    console.log("Problem downloading launch data");
    throw new Error("Launch data download failed.");
  }
  const launchDocs = response.data;
  for (const launchDoc of launchDocs) {
    const payloads = launchDoc["rocket"]["second_stage"]["payloads"];
    const customers = payloads.flatMap((payload) => {
      return payload["customers"];
    });

    const launch = {
      flightNumber: launchDoc["flight_number"],
      mission: launchDoc["mission_name"],
      rocket: launchDoc["rocket"]["rocket_name"],
      launchDate: launchDoc["launch_date_local"],
      upcoming: launchDoc["upcoming"],
      success: launchDoc["launch_success"],
      customers,
    };

    console.log(`${launch.flightNumber} ${launch.mission}`);
    await saveLaunch(launch);
  }
};

const saveLaunch = async (launch) => {
  await launches.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
};

const loadLaunchData = async () => {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: "Falcon 1",
    mission: "FalconSat",
  });
  if (firstLaunch) {
    console.log("Launch data already loaded!");
  } else {
    await populateLaunches();
  }
};

const findAll = async (skip, limit) => {
  return await launches
    .find({}, { _id: 0, __v: 0 })
    .sort({ flightNumber: 1 })
    .skip(skip)
    .limit(limit);
};

const findLaunch = async (filter) => {
  return await launches.findOne(filter);
};

// const createLaunch = (launch) => {
//   DEFAULT_FLIGHT_NUMBER++;
//   launches.set(
//     DEFAULT_FLIGHT_NUMBER,
//     Object.assign(launch, {
//       flightNumber: DEFAULT_FLIGHT_NUMBER,
//       success: true,
//       upcoming: true,
//       customers: ["Zero to Mastery", "NASA"],
//     })
//   );
// };

const existsLaunchWithId = async (launchId) => {
  return await launches.findOne({
    flightNumber: launchId,
  });
};

const getLatestFlightNumber = async () => {
  const latestLaunch = await launches.findOne().sort("-flightNumber");
  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }
  return latestLaunch.flightNumber;
};

const scheduleNewLaunch = async (launch) => {
  const planet = await planets.findOne({
    kepler_name: launch.target,
  });
  if (!planet) {
    throw new Error("No matching planet was found");
  }

  const newFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["Zero to Mastery", "NASA"],
    flightNumber: newFlightNumber,
  });

  await saveLaunch(newLaunch);
};

const abortLaunchById = async (launchId) => {
  const aborted = await launches.updateOne(
    {
      flightNumber: launchId,
    },
    {
      upcoming: false,
      success: false,
    }
  );
  return aborted.modifiedCount === 1;
};

module.exports = {
  loadLaunchData,
  findAll,
  existsLaunchWithId,
  scheduleNewLaunch,
  abortLaunchById,
};
