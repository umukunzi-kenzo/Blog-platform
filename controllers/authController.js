const User = require("../models/Users");
const generateToken = require("../utils/generateToken");

// Register User Controller
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. Check if user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. Create new user (password will be hashed automatically in User.js)
    const user = await User.create({
      username,
      email,
      password,
    });          

    // 3. Send response if user created successfully
    if (user) {
      res.status(201).json({
        _id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser };
