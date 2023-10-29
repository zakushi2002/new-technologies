const { planets } = require("../models/planets");

const getAllPlanets = (req, res) => {
  res.status(200).json(planets);
};

module.exports = { getAllPlanets };
