const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  id: {
    type: BigInt,
    required: true,
    unique: true,
  },
  status: {
    type: Number,
    required: true,
  },
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic",
    required: true,
  },
  createBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lecturer",
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  comment: {
    type: String,
  },
});
module.exports = mongoose.model("Task", taskSchema);
