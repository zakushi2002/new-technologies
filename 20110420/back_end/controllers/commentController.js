const e = require("express");
const { listpost } = require("../models/post");

function addComment(req, res) {
  const id = req.params.id;
  const post = listpost.find((post) => post.id == id);

  if (!post) {
    return res.status(404).json({
      error: "post not found",
    });
  } else {
    const comment = {
      id: post.listcomment.length + 1,
      content: req.body.content,
    };
    post.listcomment.push(comment);
    res.status(200).json(comment);
  }
}
module.exports = { addComment };
