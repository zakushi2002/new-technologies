const e = require("express");
const { listpost } = require("../models/post");
function getAllPost(req, res) {
  // res.status(200).json(listpost);
  res.status(200).json({ posts: listpost });
  // res.render("index", { posts: listpost });
}
function addPost(req, res) {
  const id = listpost.length + 1;

  if (!req.body.content || !req.body.author) {
    return res.status(400).json({
      error: "must have content and author",
    });
  } else {
    const post = {
      id: id,
      content: req.body.content,
      author: req.body.author,
      listcomment: [],
    };
    listpost.push(post);
    res.status(200).json(post);
    // res.status(200).json(post);
    // res.redirect("/");
  }
}
function detailPost(req, res) {
  const id = req.params.id;
  const post = listpost.find((post) => post.id == id);
  if (!post) {
    return res.status(404).json({
      error: "post not found",
    });
  } else {
    // res.render("detail", { detailPost: post });
    res.status(200).json(post);
  }
}
function detailPostEdit(req, res) {
  const id = req.params.id;
  const post = listpost.find((post) => post.id == id);
  if (!post) {
    return res.status(404).json({
      error: "post not found",
    });
  } else {
    res.render("edit", { detailPost: post });
  }
}
function deletePost(req, res) {
  const id = req.params.id;
  const index = listpost.findIndex((post) => post.id == id);

  if (index === -1) {
    return res.status(404).json({
      error: "Post not found",
    });
  } else {
    listpost.splice(index, 1);
    res.status(200).json({ message: "Post deleted successfully" });
  }
}
function editPost(req, res) {
  const id = req.params.id;
  const index = listpost.findIndex((post) => post.id == id);

  if (index === -1) {
    return res.status(404).json({
      error: "Post not found",
    });
  } else {
    listpost[index].content = req.body.content;
    listpost[index].author = req.body.author;
    res.status(200).json(listpost[index]);
  }
}
module.exports = {
  getAllPost,
  addPost,
  detailPost,
  deletePost,
  editPost,
  detailPostEdit,
  editPost,
};
