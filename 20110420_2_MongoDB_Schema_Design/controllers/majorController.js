const Major = require("../models/major");

const createMajor = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Missing name field!" });
    }
    const major = new Major({ name });

    await major.save();
    res.status(201).json(major);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getMajors = async (req, res) => {
  let { page, limit, name, id } = req.query;
  page = parseInt(page) || 0;
  limit = parseInt(limit) || 10;

  const skip = page * limit;

  const query = {};
  if (name) {
    query.name = name;
  }
  if (id) {
    query._id = id;
  }

  try {
    const majors = await Major.find(query).skip(skip).limit(limit);
    res.status(200).json(majors);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getMajorById = async (req, res) => {
  const { id } = req.params;
  try {
    const major = await Major.findById(id);
    res.status(200).json(major);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateMajorById = async (req, res) => {
  const { id, name } = req.body;
  if (!id || !name) {
    return res.status(400).json({ message: "Missing name or id field!" });
  }

  try {
    const major = await Major.findById(id);
    if (name) {
      major.name = name;
    }
    await major.save();
    res.status(200).json(major);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteMajorById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Missing id field!" });
  }

  try {
    const major = await Major.findById(id);
    await Major.deleteOne(major);
    res.status(200).json({ message: "Delete major successfully!" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
module.exports = {
  createMajor,
  getMajors,
  getMajorById,
  updateMajorById,
  deleteMajorById,
};
