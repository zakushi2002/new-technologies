const express = require("express");
const majorRouter = express.Router();

const {
  save,
  findMajorById,
  editMajor,
} = require("../controllers/majorController");

majorRouter.post("/create", save);
majorRouter.get("/findById/:id", findMajorById);
majorRouter.put("/edit", editMajor);

module.exports = majorRouter;
