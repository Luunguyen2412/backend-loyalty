const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    position: {
      type: Number, // 1 - Admin, 2 - Staff, 3 - Customer
      required: true,
    },
    avatar: {
      type: String,
    },
    address: {
      type: String,
    },
    gender: {
      type: Number, // 0 - Unselected, 1 - Male, 2 - Female
    },
    point: {
      type: Number,
    },
    membership: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
