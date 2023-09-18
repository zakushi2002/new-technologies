const express = require("express");
const router = express.Router();
const myGroupController = require("../controllers/mygroupController");
router.get("/", (req, res) => {
  myGroupController.getMyGroup(req, res);
});
router.post("/MSSV", (req, res) => {
  myGroupController.addMember(req, res);
});

router.get("/MSSV/:id", (req, res) => {
  myGroupController.findById(req, res);
});

router.get("/message/:id", (req, res) => {
  myGroupController.message(req, res);
});
router.get("/message", (req, res) => {
  myGroupController.messageAll(req, res);
});
module.exports = router;
