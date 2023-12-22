const mongoose = require("mongoose");
// Topic Model
const topicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    major: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Major",
    },
    schoolYear: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SchoolYear",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    advisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lecturer",
    },
    examiner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lecturer",
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    registerQueue: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    status: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Topic", topicSchema);
