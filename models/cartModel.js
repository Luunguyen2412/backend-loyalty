const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    idOrder: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    idFood: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantityFood: {
      type: Number,
      default: 1,
    },
    listChoose: {
      type: Array,
    },
    cost: Number,
    amount: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", cartSchema);
