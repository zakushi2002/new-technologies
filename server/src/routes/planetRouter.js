const express = require("express");

const { getAllPlanets } = require("../controllers/planetController");

const planetsRouter = express.Router();

planetsRouter.get("/planets", getAllPlanets);

module.exports = planetsRouter;
