const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  studentId: {
    type: Number,
    required: true,
    unique: true,
  },
  schoolYear: {
    type: Number,
    required: true,
  },
  isLeader: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("Student", studentSchema, "Student");
