const mongoose = require("mongoose");
// Account Model
const accountSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
    },
    phone: {
      type: String,
      trim: true,
      match: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
    },
    avatarPath: String,
    birthDate: Date,
    address: String,
    kind: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Account", accountSchema);
