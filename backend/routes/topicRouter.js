const express = require("express");
const topicRouter = express.Router();

const { save, getTopics } = require("../controllers/topicController");

topicRouter.post("/create", save);
topicRouter.get("/getAll", getTopics);

module.exports = topicRouter;
