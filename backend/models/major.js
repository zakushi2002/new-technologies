const mongoose = require("mongoose");
const majorSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  majorName: {
    type: String,
    required: true,
    trim: true,
  },
  // headMajor
  lecturerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lecturer",
    required: false,
  },
});
module.exports = mongoose.model("Major", majorSchema);
