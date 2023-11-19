const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
  {
    topicName: {
      type: String,
      required: true,
    },
    major: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Major",
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    manageLecturer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lecturer",
      required: false,
    },
    reviewLecturer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lecturer",
      required: false,
    },
    status: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: false,
    },
    endDate: {
      type: Date,
      required: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: false, // TODO: overwrite this after having Authentication
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Topic", topicSchema);
