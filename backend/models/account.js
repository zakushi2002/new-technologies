const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
      match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
    },
    address: String,
    phone: {
      type: String,
      match: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
    },
    avatar: {
      type: String,
      trim: true,
    },
    birthdate: Date,
    kind: {
      type: Number,
    },
    status: {
      type: Number,
      default: 1,
    },
    notificationIds: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Account", accountSchema);
