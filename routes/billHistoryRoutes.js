const express = require("express");
const {
  getBills,
  createBill,
  updatePointsForUser,
  getBillHistoryForUser,
} = require("../controllers/billHistoryController");

const router = express.Router();

router.route("/").get(getBills).post(createBill);
// router.route("/:userId").get(getBillHistoryForUser);
// router.route("/updatePoints/:userId").post(updatePointsForUser);

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const billHistory = await getBillHistoryForUser(userId);
    res.json(billHistory);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bill history" });
  }
});

router.post("/updatePoints/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await updatePointsForUser(userId);
    res.json({ message: "Points updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Failed to update points" });
  }
});

module.exports = router;
