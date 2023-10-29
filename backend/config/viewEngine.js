const path = require("path");
const express = require("express");
const mainPath = path.dirname(require.main.filename);
const configViewEngine = (app) => {
  // config template engine
  app.set("views", path.join(mainPath, "views"));
  app.set("view engine", "ejs");
  // config static folder (public - css, js, img)
  app.use(express.static(path.join(mainPath, "public")));
};

module.exports = configViewEngine;
