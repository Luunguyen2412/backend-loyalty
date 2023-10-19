const asyncHandler = require("express-async-handler");
const BillHistory = require("../models/billHistoryModel");
const User = require("../models/userModel");

// Get all Bill History
// GET /api/bills
const getBills = asyncHandler(async (req, res) => {
  // correct
  const bills = await BillHistory.find();
  res.status(200).json(bills);
});

// Function to fetch bill history for a specific user
const getBillHistoryForUser = async (userId) => {
  try {
    // Use Mongoose to query the BillHistory collection
    const billHistory = await BillHistory.find({
      user: "64b1124f579b88d18dc244e1",
    }).exec();
    return billHistory;
  } catch (error) {
    // Handle any errors that occur during the query
    console.error("Error fetching bill history:", error);
    throw error;
  }
};

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

// Update User Point when Payment succesfully
// POST /api/updatePoints/:userId
const updatePointsForUser = async (userId) => {
  try {
    // Get the user and their associated bill histories
    const user = await User.findById(userId);
    const billHistories = await BillHistory.find({ user: userId });

    // Calculate total points earned based on the bill histories
    let totalPoints = 0;
    for (const billHistory of billHistories) {
      totalPoints += calculatePointsFromBillHistory(billHistory);
    }

    // Update the user's points
    user.point = totalPoints;
    await user.save();

    return user;
  } catch (error) {
    console.error("Error updating points:", error);
    throw error;
  }
};

const calculatePointsFromBillHistory = (billHistory) => {
  // Customize this function to calculate points based on totalBill
  const pointsPerDollar = 0.001; // 1 point for every 10000đ
  return billHistory.totalBill * pointsPerDollar;
};

module.exports = {
  getBills,
  createBill,
  updatePointsForUser,
  getBillHistoryForUser,
};
