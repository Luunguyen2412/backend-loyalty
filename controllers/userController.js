const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { use } = require("../routes/contactRoutes");

// Resgiter a user
// POST /api/users/register
const registerUser = asyncHandler(async (req, res) => {
  const { username, phone, password } = req.body;
  if (!username || !phone || !password) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  const userAvailable = await User.findOne({ phone });

  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password", hashedPassword);
  const user = await User.create({
    username,
    phone,
    password: hashedPassword,
  });

  console.log(`User created ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, phone: user.phone });
  } else {
    res.status(400);
    throw new Error("User data is not valid!");
  }

  res.status(200).json({ message: "Register the user" });
});

// LOGIN user
// GET /api/users/login
const loginUser = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    res.status(200).json({
      isError: true,
      message: "Vui lòng nhập đầy đủ số điện thoại và mật khẩu",
    });
    // throw new Error("All fields are mandatory !");
  }
  const user = await User.findOne({ phone });

  //Compare password with hashedPassword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          phone: user.phone,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.status(200).json({
      accessToken,
      isError: false,
      message: "Đăng nhập thành công",
    });
  } else {
    res.status(200).json({
      isError: true,
      message: "Đăng nhập không thành công",
    });
    // throw new Error("Phone or Password is not valid !");
  }
  // res.json({ message: "login user successfull" })
});

// Current user using
// GET /api/users/current
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
  // res.status(200).json({ message: "Current the user infomation" });
});

module.exports = { registerUser, loginUser, currentUser };
