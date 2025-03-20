const express = require('express');
const { googleAuth } = require('../controllers/authController');

const router = express.Router();

router.post('/google-auth', googleAuth);

module.exports = router;
