const express = require('express');
const {registerUser, loginUser} = require('../controllers/authController');
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
    
router.post("/register",registerUser);

router.post("/login",loginUser);


//protected routes
router.get("/profile",protect, (req, res)=> {
    res.json({message: "Welcome to your profile", user: req.user });
});

router.put ("/profile", protect, /*updateUser*/);

module.exports = router;