const {
  createMajor,
  getMajors,
  getMajorById,
  updateMajorById,
  deleteMajorById,
} = require("../controllers/majorController");
const router = require("express").Router();

router.post("/create", createMajor);
router.get("/list", getMajors);
router.get("/get/:id", getMajorById);
router.put("/update", updateMajorById);
router.delete("/delete/:id", deleteMajorById);

module.exports = router;
