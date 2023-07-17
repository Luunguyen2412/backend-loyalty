const mongoose = require("mongoose");

const customerSchema = mongoose.Schema(
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
    gender: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", customerSchema);
