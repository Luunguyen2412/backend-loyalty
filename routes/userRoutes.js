const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
  getListUsers,
  getUser,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandle");

const router = express.Router();

router.route("/").get(getListUsers);

router.route("/:id").get(getUser);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateToken, currentUser);

module.exports = router;
