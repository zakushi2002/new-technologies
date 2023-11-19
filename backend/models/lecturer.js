const mongoose = require("mongoose");
const lecturerSchema = new mongoose.Schema({
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  lecturerId: {
    type: Number,
    required: true,
  },
  faculty: String,
  majorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Major",
  },
});
module.exports = mongoose.model("Lecturer", lecturerSchema);
