const express = require('express');
const { googleAuth } = require('../controllers/authController');
const { updatePincode } = require('../controllers/locationContrller');
const verifyToken = require('../utils/verifyToken');

const router = express.Router();

router.post('/google-auth', googleAuth);
router.post('/update-pincode' , verifyToken , updatePincode )

module.exports = router;
