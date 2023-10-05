const { commentList } = require("../models/comment");
let { sequenceId } = require("../models/comment");

const findAllByPostId = (req, res) => {
  const apiMessage = { result: "true" };
  const postId = Number(req.params.postId);
  const comments = commentList.filter((comment) => comment.postId === postId);
  if (comments && postId) {
    apiMessage.data = comments;
    apiMessage.message = "List comments success!";
    res.status(200).json(apiMessage);
  } else {
    apiMessage.result = "false";
    apiMessage.message = "Comments not found!";
    res.status(404).json(apiMessage);
  }
};

const create = (req, res) => {
  const apiMessage = { result: "true" };
  const { postId, content, author } = req.body;
  if (!postId || !content || !author) {
    apiMessage.result = "false";
    apiMessage.message = "Bad request!";
    res.status(400).json(apiMessage);
  }
  const comment = {
    id: sequenceId,
    postId: postId,
    content: content,
    author: author,
  };
  commentList.push(comment);
  sequenceId++;
  apiMessage.message = "Create comment success!";
  res.status(201).json(apiMessage);
};

const update = (req, res) => {
  const apiMessage = { result: "true" };
  const { id, content } = req.body;
  const comment = commentList.find((comment) => comment.id === id);
  if (!comment) {
    apiMessage.result = "false";
    apiMessage.message = "Comment not found!";
    res.status(404).json(apiMessage);
  }
  if (!content) {
    apiMessage.result = "false";
    apiMessage.message = "Bad request!";
    res.status(400).json(apiMessage);
  }
  apiMessage.message = "Update comment success!";
  res.status(200).json(apiMessage);
};

const deleteById = (req, res) => {
  const apiMessage = { result: "true" };
  const id = Number(req.params.id);
  const comment = commentList.find((comment) => comment.id === id);
  if (!comment) {
    apiMessage.result = "false";
    apiMessage.message = "Comment not found!";
    res.status(404).json(apiMessage);
  }
  const index = commentList.indexOf(comment);
  commentList.splice(index, 1);
  apiMessage.data = comment;
  apiMessage.message = "Delete comment success!";
  res.status(200).json(apiMessage);
};

module.exports = { findAllByPostId, create, update, deleteById };
