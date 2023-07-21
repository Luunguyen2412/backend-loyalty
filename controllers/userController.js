const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { use } = require("../routes/contactRoutes");

// Get all users
// GET /api/users
const getListUsers = asyncHandler(async (req, res) => {
  const listUsers = await User.find();
  res.status(200).json(listUsers);
});

// Get user
// GET /api/users/:id
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(200).json({
      message: "Không tìm thấy người dùng",
      data: {},
    });
  }

  res.status(200).json({
    message: "",
    data: user,
  });
});

// Resgiter a user
// POST /api/users/register
const registerUser = asyncHandler(async (req, res) => {
  const {
    username,
    phone,
    password,
    position = 3, // register for customer
    avatar = "https://www.w3schools.com/howto/img_avatar.png",
    address,
    gender = 1,
    point = 0,
    membership = 1,
  } = req.body;
  console.log("1111", req.body);
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
  const newUser = new User({
    username,
    phone,
    password: hashedPassword,
    position,
    avatar,
    address,
    gender,
    point,
    membership,
  });
  await newUser.save();

  console.log(`User created ${newUser}`);

  if (newUser) {
    res.status(201).json({
      _id: newUser.id,
      phone: newUser.phone,
      username: newUser.username,
      position: newUser.position,
      avatar: newUser.avatar,
      address: newUser.address,
      gender: newUser.gender,
      point: newUser.point,
      membership: newUser.membership,
    });
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

module.exports = {
  registerUser,
  loginUser,
  currentUser,
  getListUsers,
  getUser,
};
