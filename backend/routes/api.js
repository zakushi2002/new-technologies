const express = require("express");
const router = express.Router();
const { save } = require("../controllers/accountController");

const initAPIRoutes = (app) => {
  router.post("/account/create", save);
  return app.use("/v1/", router);
};

module.exports = initAPIRoutes;
