const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    // user_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: "User",
    // },
    name: {
      type: String,
      // required: true,
    },
    phone: {
      type: String,
      // required: true
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

module.exports = mongoose.model("Contact", contactSchema);
