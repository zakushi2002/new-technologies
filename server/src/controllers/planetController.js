const { findAll } = require("../models/planets");

const getAllPlanets = (req, res) => {
  res.status(200).json(findAll());
};

module.exports = { getAllPlanets };
