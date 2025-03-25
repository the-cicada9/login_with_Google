const express = require("express");
const router = express.Router();
const {getUsersToConnect} = require("../../controllers/userController")
const verifyToken = require("../../utils/verifyToken");

// Fetch users to connect (protected route)
router.get("/users-to-connect", verifyToken, getUsersToConnect);

module.exports = router;
