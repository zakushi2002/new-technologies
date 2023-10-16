const express = require("express");
const { addComment } = require("../controllers/commentController");
const router = express.Router();
//middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});
router.post("/addcomment/:id", addComment);
module.exports = router;
