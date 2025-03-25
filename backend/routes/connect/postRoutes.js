const express = require("express");
const router = express.Router();
const verifyToken = require("../../utils/verifyToken");
const { savePost, getAllPosts, likeUnlikePost } = require("../../controllers/postControllers");

// Fetch users to connect (protected route)
router.post("/save-post", verifyToken, savePost);
router.get("/getAllPosts", verifyToken, getAllPosts);
router.post("/like-unlike-post", verifyToken, likeUnlikePost);

module.exports = router;
