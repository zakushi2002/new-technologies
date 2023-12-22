const mongoose = require("mongoose");
// SchoolYear Model
const schoolYearSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  startYear: {
    type: Number,
    required: true,
  },
  endYear: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("SchoolYear", schoolYearSchema);
