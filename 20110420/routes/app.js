const express = require("express");
const router = express.Router();
const { main } = require("../controllers/mainController");

router.get("/", main);
router.get("/new", (req, res) => {
  res.render("new");
});

module.exports = router;
