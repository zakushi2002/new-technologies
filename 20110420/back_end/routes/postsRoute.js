const express = require("express");
const {
  getAllPost,
  addPost,
  detailPost,
  deletePost,
  detailPostEdit,
  editPost,
} = require("../controllers/postController");
const { addComment } = require("../controllers/commentController");
const router = express.Router();
//middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});
//define the home page route
router.get("/", getAllPost);
router.get("/detail/:id", detailPost);
router.post("/addPost", addPost);
router.post("/delete/:id", deletePost);
router.post("/addcomment/:id", addComment);
router.get("/edit/:id", detailPostEdit);
router.post("/editPost/:id", editPost);
module.exports = router;
