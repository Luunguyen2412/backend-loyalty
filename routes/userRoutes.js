const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
  getListUsers,
  getUser,
  updateUser,
  deleteUser,
  searchUser,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandle");

const router = express.Router();

router.route("/").get(getListUsers).get(searchUser);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateToken, currentUser);

module.exports = router;
