const postList = require("../models/post");

const main = (req, res) => {
  const list = postList;
  res.render("listArticle", { postList: list });
};

module.exports = { main };
