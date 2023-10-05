const express = require("express");
const router = express.Router();
const {
  findAllByPostId,
  create,
  update,
  deleteById,
} = require("../controllers/commentController");

router.get("/list/:postId", findAllByPostId);
router.post("/create", create);
router.put("/update", update);
router.delete("/delete/:id", deleteById);

module.exports = router;
