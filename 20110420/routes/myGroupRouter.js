const express = require("express");
const router = express.Router();
const {
  getMyGroup,
  addMember,
  findById,
  message,
  messageAll,
} = require("../controllers/mygroupController");

router.get("/", getMyGroup);
router.post("/MSSV", addMember);
router.get("/MSSV/:id", findById);
router.get("/message/:id", message);
router.get("/message", messageAll);
module.exports = router;
