const express = require("express");

const { sendNotify } = require("../controllers/pushNotifyController");

const router = express.Router();

router.route("/").post(sendNotify);

module.exports = router;
