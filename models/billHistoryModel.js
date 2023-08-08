const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// const dataPayment = {
//   idPayment: 1,
//   staff: '',
//   totalBill: 0,
//   note: '',
//   address: '',
//   deliveryOption: 0,
//   paymentMethod: 0,
//   customerChoose: {},
//   listChoose: [],
// };

const billHistorySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    customerChoose: {
      type: Object,
    },
    listChoose: {
      type: Array,
    },
    deliveryOption: {
      type: Number,
    },
    paymentMethod: {
      type: Number,
    },
    address: String,
    note: String,
    totalBill: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("billHistory", billHistorySchema);
