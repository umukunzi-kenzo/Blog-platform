const express = require('express');
const {registerUser, loginUser} = require('../controllers/authController');
const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
    
router.post("/register",registerUser);

router.post("/login",loginUser);

module.exports = router;