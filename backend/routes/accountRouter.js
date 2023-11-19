const express = require("express");
const router = express.Router();
const {
  createAdmin,
  getAccount,
  updateAdmin,
  deleteById,
} = require("../controllers/accountController");

router.post("/create-admin", createAdmin);
router.get("/get/:id", getAccount);
router.put("/update-admin", updateAdmin);
router.delete("/delete/:id", deleteById);

module.exports = router;
