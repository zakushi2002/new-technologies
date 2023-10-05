const express = require("express");
const router = express.Router();
let { sequenceId } = require("../models/post");
const { postList } = require("../models/post");
const { commentList } = require("../models/comment");

router.get("/new", (req, res) => {
  res.render("newArticle");
});

router.post("/new", (req, res) => {
  const { title, content, author } = req.body;
  const post = {
    id: sequenceId,
    title: title,
    content: content,
    author: author,
    createdDate: new Date(),
  };
  postList.push(post);
  sequenceId++;
  res.redirect(`/articles/${post.id}`);
});
module.exports = router;

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const post = postList.find((post) => post.id === id);
  if (post && id) {
    const viewPost = {
      id: post.id,
      title: post.title,
      content: post.content,
      author: post.author,
      createdDate: post.createdDate,
    };
    viewPost.comments = commentList.filter((comment) => comment.postId === id);
    res.render("detail", { article: viewPost });
  }
});

router.get("/update/:id", (req, res) => {
  const id = Number(req.params.id);
  const post = postList.find((post) => post.id === id);
  if (post && id) {
    const viewPost = {
      id: post.id,
      title: post.title,
      content: post.content,
      author: post.author,
      createdDate: post.createdDate,
    };
    res.render("updateArticle", { article: viewPost });
  }
});

router.post("/update", (req, res) => {
  const { id, title, content } = req.body;
  const check = Number(id);
  const post = postList.find((post) => post.id === check);
  if (title) {
    post.title = title;
  }
  if (content) {
    post.content = content;
  }
  res.redirect(`/articles/${post.id}`);
});

router.get("/delete/:id", (req, res) => {
  const id = Number(req.params.id);
  const post = postList.find((post) => post.id === id);
  if (post && id) {
    const comments = commentList.filter((comment) => comment.postId === id);
    if (comments.length > 0) {
      comments.forEach((comment) => {
        const index = commentList.indexOf(comment);
        commentList.splice(index, 1);
      });
    }
    const index = postList.indexOf(post);
    postList.splice(index, 1);
    res.redirect(`/`);
  } else {
    res.redirect(`/`);
  }
});
