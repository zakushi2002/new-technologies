const majorRouter = require("./majorRouter");

const router = require("express").Router();

router.use("/major", majorRouter);

module.exports = router;
