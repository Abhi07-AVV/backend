const express = require('express');
const router = express.Router();

// Import the controller object directly
const otpController = require('../controllers/otpController');

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'OTP service is running',
    timestamp: new Date().toISOString()
  });
});

// Set up the routes to match the controller functions
router.post('/request', otpController.requestLoginOTP);
router.post('/verify', otpController.verifyOTP);
router.post('/resend', otpController.resendOTP);

module.exports = router;