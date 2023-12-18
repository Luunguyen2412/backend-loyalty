const express = require("express");
const {
  getBills,
  createBill,
  getBillHistoryForUser,
  notifyLine,
} = require("../controllers/billHistoryController");

const router = express.Router();

router.route("/").get(getBills).post(createBill);
router.route("/notifyLine").post(notifyLine);
// router.route("/:userId").get(getBillHistoryForUser);

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const billHistory = await getBillHistoryForUser(userId);
    res.status(200).json(billHistory);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bill history" });
  }
});

module.exports = router;
