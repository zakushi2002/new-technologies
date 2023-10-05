const express = require("express");
const router = express.Router();
const {
  findAll,
  findById,
  create,
  update,
  deleteById,
} = require("../controllers/postController");

router.get("/list", findAll);
router.get("/get/:id", findById);
router.post("/create", create);
router.put("/update", update);
router.delete("/delete/:id", deleteById);

module.exports = router;
