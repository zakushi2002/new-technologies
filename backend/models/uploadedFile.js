const mongoose = require("mongoose");
const uploadedFileSchema = new mongoose.Schema({
  id: {
    type: BigInt,
    required: true,
    unique: true,
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  uploadedTime: {
    type: Date,
    required: true,
  },
  filePath: {
    // need to be map to Cloud Storage
    type: String,
  },
});
module.exports = mongoose.model("UploadedFileSchema", uploadedFileSchema);
