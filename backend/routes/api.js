const accountRouter = require("../routes/accountRouter");
const majorRouter = require("../routes/majorRouter");
const lecturerRouter = require("../routes/lecturerRouter");
const topicRouter = require("../routes/topicRouter");

const initAPIRoutes = (app) => {
  app.use("/v1/account", accountRouter);
  app.use("/v1/major", majorRouter);
  app.use("/v1/lecturer", lecturerRouter);
  app.use("/v1/topic", topicRouter);
  return;
};

module.exports = initAPIRoutes;
