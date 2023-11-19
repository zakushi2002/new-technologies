const express = require("express");
const router = express.Router();
const {
  createLecturer,
  getLecturer,
  getAllLecturers,
  findAll,
} = require("../controllers/lecturerController");

router.post("/create", createLecturer);
router.get("/get/:id", getLecturer);
router.get("/getAll", getAllLecturers);
router.get("/list", findAll);

module.exports = router;
