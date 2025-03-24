const User = require("../models/User");

// Fetch users who are NOT connected & have NO pending requests
const getUsersToConnect = async (req, res) => {
  try {
    const userId = req.user?.userId; // Extract user ID from JWT
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: No user ID found in token" });
    }

    const user = await User.findById(userId).lean();
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Ensure `connections` & `connectionRequests` exist
    const connectedUsers = user.connections?.map((id) => id.toString()) || [];
    const sentRequests = user.connectionRequests
      ?.filter((req) => req.sender?.toString() === userId)
      .map((req) => req.receiver?.toString()) || [];

    const receivedRequests = user.connectionRequests
      ?.filter((req) => req.receiver?.toString() === userId)
      .map((req) => req.sender?.toString()) || [];

    // Find users who are:
    // - Not self
    // - Not already connected
    // - Not in sent/received requests
    const usersToConnect = await User.find({
      _id: { $nin: [...connectedUsers, ...sentRequests, ...receivedRequests, userId] },
    }).select("name email picture pincode"); // Fetch necessary fields only

    res.status(200).json({ success: true, users: usersToConnect });
  } catch (error) {
    console.error("Error in fetching users to connect:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

module.exports = { getUsersToConnect };
