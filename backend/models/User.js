const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String, // Optional, only for self-auth users
    },
    picture: {
      type: String, // Stores user's profile picture URL
    },
    authSource: {
      type: String,
      enum: ["self", "google"],
      default: "self",
    },
    pincode: {
      type: String,
      required: true, // Required for location-based filtering
    },
    connections: [
      {
        type: Schema.Types.ObjectId,
        ref: "User", // Stores connected users
        index: true,
      },
    ],
    connectionRequests: [
      {
        sender: { type: Schema.Types.ObjectId, ref: "User" }, // User who sent the request
        receiver: { type: Schema.Types.ObjectId, ref: "User" }, // User who received the request
        status: {
          type: String,
          enum: ["pending", "accepted", "rejected"],
          default: "pending",
        },
      },
    ],
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt fields
);

module.exports = mongoose.model("User", userSchema);
