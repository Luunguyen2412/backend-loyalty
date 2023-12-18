const asyncHandler = require("express-async-handler");
const BillHistory = require("../models/billHistoryModel");
const User = require("../models/userModel");
const axios = require("axios");

// Your code using Axios here

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
    // const billHistory = await BillHistory.find({
    //   user: userId,
    // }).exec();
    const billHistory = BillHistory.filter(
      (bill) => bill.customerChoose._id === userId
    );

    console.log("logggggg", billHistory);

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

  res.status(200).json(`create bill successfull`, bill);

  // Update user points after payment is completed
  const pointsToAdd = Math.floor(totalBill / 10000); // Example: 1 point per 10000 spent
  updatePoints(customerChoose._id, pointsToAdd);
});

// Function to update user points after payment
async function updatePoints(userId, pointsToAdd) {
  try {
    const user = await User.findById(userId);

    if (!user) {
      console.error("User not found");
      return;
    }

    // Update user points
    user.point += pointsToAdd;

    // Save the updated user
    await user.save();

    console.log(`Updated points for user ${user.username}: ${user.point}`);
  } catch (error) {
    console.error("Error updating user points:", error);
  }
}

const notifyLine = async (req, res) => {
  const url = "https://notify-api.line.me/api/notify";
  // const token = "Iyx1K3WOxAfgBRbktBJgdQltXYQzBlCN9gGgALV2KjM";
  const { message, token } = req.body;

  try {
    const response = await axios.post(
      url,
      `message=${encodeURIComponent(message)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("Notification sent successfully:", response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Failed to send notification:", error.message);
    res.status(200).json(error.message);
  }
};

module.exports = {
  getBills,
  createBill,
  getBillHistoryForUser,
  notifyLine,
};
