const mongoose = require("mongoose");

const planetSchema = new mongoose.Schema({
  kepler_name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Planet", planetSchema);
