const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('../models/userModel');
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
    })

    console.log(`User created ${user}`);
    if (user) {
        res.status(201).json({ _id: user.id, phone: user.phone })
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
        res.status(400);
        throw new Error("All fields are mandatory !");
    }
    const user = await User.findOne({ phone });

    //Compare password with hashedPassword
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                phone: user.phone,
                id: user.id
            }
        }, process.env.ACCESS_TOKEN, { expiresIn: "1m" })

        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("Phone or Password is not valid !");
    }
});

// Current user using
// GET /api/users/current
const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Current the user infomation" });
});


module.exports = { registerUser, loginUser, currentUser }