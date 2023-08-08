const asyncHandler = require("express-async-handler");
const BillHistory = require("../models/billHistoryModel");
// Get all Bill History
// GET /api/bills
const getBills = asyncHandler(async (req, res) => {
  // correct
  const bills = await BillHistory.find();
  res.status(200).json(bills);
});

// Create new bill
// POST /api/bills
const createBill = asyncHandler(async (req, res) => {
  console.log("request body: ", req.body);
  const {
    customerChoose,
    listChoose,
    deliveryOption,
    paymentMethod,
    address,
    note,
    totalBill,
  } = req.body;
  if (totalBill === 0) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  const bill = await BillHistory.create({
    customerChoose,
    listChoose,
    deliveryOption,
    paymentMethod,
    address,
    note,
    totalBill,
  });

  res.status(200).json(bill);
  console.log(`create bill successfull `);
});

module.exports = {
  getBills,
  createBill,
};
