const mongoose = require("mongoose");
// Notification Model
const notificationSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  file: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
  },
  status: Number,
});

module.exports = mongoose.model("Notification", notificationSchema);
