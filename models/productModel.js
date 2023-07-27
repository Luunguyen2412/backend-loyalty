const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    images: {
      type: String,
    },
    detail: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
