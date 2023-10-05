const { postList } = require("../models/post");
let { sequenceId } = require("../models/post");
const { commentList } = require("../models/comment");
const findAll = (req, res) => {
  const apiMessage = { result: "true" };
  apiMessage.data = postList;
  apiMessage.message = "List post success!";
  res.status(200).json(apiMessage);
};

const findById = (req, res) => {
  const apiMessage = { result: "true" };
  const id = Number(req.params.id);
  const post = postList.find((post) => post.id === id);
  if (post && id) {
    const viewPost = {
      id: post.id,
      title: post.title,
      content: post.content,
      author: post.author,
    };
    viewPost.comments = commentList.filter((comment) => comment.postId === id);
    apiMessage.data = viewPost;
    apiMessage.message = "Detail post success!";
    res.status(200).json(apiMessage);
  } else {
    apiMessage.result = "false";
    apiMessage.message = "Post not found!";
    res.status(404).json(apiMessage);
  }
};

const create = (req, res) => {
  const apiMessage = { result: "true" };
  const { title, content, author } = req.body;
  if (!title || !content || !author) {
    apiMessage.result = "false";
    apiMessage.message = "Bad request!";
    res.status(400).json(apiMessage);
  }
  const post = {
    id: sequenceId,
    title: title,
    content: content,
    author: author,
  };
  postList.push(post);
  sequenceId++;
  apiMessage.message = "Create post success!";
  res.status(201).json(apiMessage);
};

const update = (req, res) => {
  const apiMessage = { result: "true" };
  const { id, title, content } = req.body;
  const post = postList.find((post) => post.id === id);
  if (!post) {
    apiMessage.result = "false";
    apiMessage.message = "Post not found!";
    res.status(404).json(apiMessage);
  }
  if (!title && !content) {
    apiMessage.result = "false";
    apiMessage.message = "Bad request!";
    res.status(400).json(apiMessage);
  }
  if (title) {
    post.title = title;
  }
  if (content) {
    post.content = content;
  }
  apiMessage.message = "Update post success!";
  res.status(200).json(apiMessage);
};

const deleteById = (req, res) => {
  const apiMessage = { result: "true" };
  const id = Number(req.params.id);
  const post = postList.find((post) => post.id === id);
  if (!post) {
    apiMessage.result = "false";
    apiMessage.message = "Post not found!";
    res.status(404).json(apiMessage);
  }
  const comments = commentList.filter((comment) => comment.postId === id);
  if (comments.length > 0) {
    comments.forEach((comment) => {
      const index = commentList.indexOf(comment);
      commentList.splice(index, 1);
    });
  }

  const index = postList.indexOf(post);
  postList.splice(index, 1);
  apiMessage.message = "Delete post success!";
  res.status(200).json(apiMessage);
};

module.exports = { findAll, findById, create, update, deleteById };
