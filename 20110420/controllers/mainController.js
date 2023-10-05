const postList = require("../models/post");
const commentList = require("../models/comment");

const main = (req, res) => {
  res.render("home", { postList: postList, commentList: commentList });
};

module.exports = { main };
