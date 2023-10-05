const path = require("path");
const express = require("express");
const mainPath = path.dirname(require.main.filename);
const hbs = require("express-handlebars");
const configViewEngine = (app) => {
  // config handlebars
  app.engine(
    "hbs",
    hbs.create({
      extname: ".hbs",
      defaultLayout: "home",
      layoutsDir: path.join(mainPath, "views", "layouts"),
      partialsDir: path.join(mainPath, "views", "partials"),
    }).engine
  );
  // config template engine
  app.set("views", path.join(mainPath, "views", "layouts"));
  app.set("view engine", ".hbs");
  // config static folder (public - css, js, img)
  app.use(express.static(path.join(mainPath, "public")));
};

module.exports = configViewEngine;
