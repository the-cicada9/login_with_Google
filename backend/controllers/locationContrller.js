const User = require("../models/User");

// Update user pincode (JWT protected)
const updatePincode = async (req, res) => {
  try {
    const { pincode, locationEnabled } = req.body;
    
    const userId = req.user.userId; // Extracted from JWT
    
    if (!pincode || pincode.length !== 6) {
      return res.status(400).json({ success: false, message: "Invalid pincode" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { pincode, locationEnabled },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

module.exports = { updatePincode };
