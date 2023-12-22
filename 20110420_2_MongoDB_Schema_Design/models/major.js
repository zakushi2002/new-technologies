const mongoose = require("mongoose");
// Major Model
const majorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  header: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lecturer",
  },
});

module.exports = mongoose.model("Major", majorSchema);
