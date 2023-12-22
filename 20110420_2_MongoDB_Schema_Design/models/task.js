const mongoose = require("mongoose");
// Task Model
const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic",
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  fileList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
    },
  ],
  startDate: Date,
  endDate: Date,
  isDone: {
    type: Boolean,
    default: false,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
});

module.exports = mongoose.model("Task", taskSchema);
